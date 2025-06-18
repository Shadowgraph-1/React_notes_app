from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os

from extensions import db, jwt
from routes import init_routes

codes_storage = {}

env_path = os.path.join(os.path.dirname(__file__), '.env')
print(f"Проверяем наличие .env по пути: {env_path}")
if os.path.exists(env_path):
    print("Файл .env найден, загружаем...")
    load_dotenv(env_path)
else:
    print("Файл .env НЕ найден!")

app = Flask(__name__)

database_url = os.getenv('DATABASE_URL', 'postgresql://postgres:25021998@localhost:5432/notes_app')
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_random_secret_key_1234567890abcdef')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your_random_jwt_key_1234567890abcdef')

print(f"SQLALCHEMY_DATABASE_URI: {app.config['SQLALCHEMY_DATABASE_URI']}")
print(f"SECRET_KEY: {app.config['SECRET_KEY']}")
print(f"JWT_SECRET_KEY: {app.config['JWT_SECRET_KEY']}")

db.init_app(app)
jwt.init_app(app)

CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

@app.before_request
def log_request():
    print(f"--- Входящий запрос: {request.method} {request.path} ---")
    print(f"--- Заголовки: {request.headers} ---")
    print(f"--- Данные: {request.get_json(silent=True)} ---")

@app.after_request
def log_response(response):
    print(f"--- Ответ на {request.method} {request.path}: Status {response.status} ---")
    print(f"--- Заголовки ответа: {response.headers} ---")
    return response

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

@app.errorhandler(500)
def handle_500_error(e):
    if hasattr(db, 'session'):
        db.session.rollback()
    response = jsonify({"message": f"Internal server error: {str(e)}"})
    return add_cors_headers(response), 500

@jwt.unauthorized_loader
def unauthorized_response(callback):
    response = jsonify({"message": "Missing or invalid token"})
    return add_cors_headers(response), 401

@jwt.invalid_token_loader
def invalid_token_response(callback):
    response = jsonify({"message": "Invalid token"})
    return add_cors_headers(response), 401

init_routes(app, codes_storage)
print("Маршруты импортированы успешно")

if __name__ == '__main__':
    with app.app_context():
        try:
            db.create_all()
            print("Таблицы созданы успешно")
        except Exception as e:
            print(f"Ошибка создания таблиц: {str(e)}")
            raise e
    app.run(debug=True)