from flask import jsonify, request, make_response
from flask_jwt_extended import create_access_token, jwt_required
import random
import string
import time
import os
from models import User 
from extensions import db

def generate_2fa_code():
    """Генерирует 6-значный код"""
    return ''.join(random.choices(string.digits, k=6))

def save_user_to_file(username, email, password):
    """Сохраняет данные пользователя в users.txt"""
    print(f"--- ВНУТРИ save_user_to_file: Пытаюсь сохранить {username} в users.txt ---")
    try:
        file_path = os.path.join(os.path.dirname(__file__), 'users.txt')
        with open(file_path, 'a', encoding='utf-8') as f:
            f.write(f"email:{email},password:{password},username:{username}\n")
        print(f"--- Успешно сохранено в {file_path} ---")
    except PermissionError as e:
        print(f"--- Ошибка: Нет прав для записи в {file_path}: {e} ---")
        return jsonify({"message": f"Permission error: {str(e)}"}), 500
    except OSError as e:
        print(f"--- Ошибка при записи в файл {file_path}: {e} ---")
        return jsonify({"message": f"File error: {str(e)}"}), 500

def find_user_in_file(email):
    """Ищет пользователя по email в файле users.txt"""
    try:
        file_path = os.path.join(os.path.dirname(__file__), 'users.txt')
        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f:
                parts = {}
                try:
                    for part in line.strip().split(','):
                        key, value = part.split(':', 1)
                        parts[key] = value
                except ValueError:
                    continue
                if parts.get('email') == email:
                    return parts
    except FileNotFoundError:
        print(f"--- Файл {file_path} не найден ---")
        return None
    return None

def init_routes(app, codes_storage):

    @app.route('/api/register', methods=['POST', 'OPTIONS'])
    def register():
        if request.method == 'OPTIONS':
            response = make_response('', 200)
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return response

        data = request.get_json()
        print(f"--- /api/register: Полученные данные: {data} ---")
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            print("--- /api/register: Отсутствуют username, email или password ---")
            return jsonify({'message': 'Username, email, and password are required'}), 400
        
        if find_user_in_file(email):
            print(f"--- /api/register: Email {email} уже существует ---")
            return jsonify({'message': 'Email already exists'}), 400

        code = generate_2fa_code()
        temp_user_id = f"{username}_{int(time.time())}"
        codes_storage[temp_user_id] = {
            "code": code,
            "expires": time.time() + 300,
            "username": username,
            "email": email,
            "password": password
        }
        print(f"--- /api/register: Сохранено в codes_storage: {temp_user_id} ---")
        print(f"--- /api/register: Сгенерированный код: {code} ---")

        response = jsonify({
            'message': 'Please verify with 2FA code',
            'temp_user_id': temp_user_id,
            'code': code  # Для отладки - уберите в продакшене
        })
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
        return response, 200

    @app.route('/api/verify-2fa', methods=['POST', 'OPTIONS'])
    def verify_2fa():
        print("--- ПОЛУЧЕН ЗАПРОС НА /api/verify-2fa ---")
        if request.method == 'OPTIONS':
            response = make_response('', 200)
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return response

        data = request.get_json()
        print(f"--- /api/verify-2fa: Полученные данные: {data} ---")
        temp_user_id = data.get('temp_user_id')
        code = data.get('code')

        if not temp_user_id or not code:
            print("--- /api/verify-2fa: Отсутствуют temp_user_id или code ---")
            response = jsonify({'message': 'Temp user ID and code are required'})
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            return response, 400

        print(f"--- /api/verify-2fa: Содержимое codes_storage: {codes_storage} ---")
        if temp_user_id not in codes_storage:
            print(f"--- /api/verify-2fa: temp_user_id {temp_user_id} не найден ---")
            response = jsonify({'message': 'Invalid or expired verification session'})
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            return response, 400

        stored = codes_storage[temp_user_id]
        print(f"--- /api/verify-2fa: Данные для {temp_user_id}: {stored} ---")
        if time.time() > stored['expires']:
            print("--- /api/verify-2fa: Код истек ---")
            del codes_storage[temp_user_id]
            response = jsonify({'message': 'Code expired'})
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            return response, 400

        if code != stored['code']:
            print(f"--- /api/verify-2fa: Неверный код. Введено: {code}, ожидалось: {stored['code']} ---")
            response = jsonify({'message': 'Invalid code'})
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            return response, 400
        
        print(f"--- /api/verify-2fa: Код верный! Вызываю save_user_to_file для {stored['username']} ---")
        save_result = save_user_to_file(stored['username'], stored['email'], stored['password'])
        if isinstance(save_result, tuple):
            response = save_result[0]
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            return response, save_result[1]

        print("--- /api/verify-2fa: Сохраняю пользователя в БД ---")
        new_user = User(
            username=stored['username'],
            email=stored['email'],
            password=stored['password']
        )
        try:
            db.session.add(new_user)
            db.session.commit()
            print("--- /api/verify-2fa: Пользователь успешно сохранен в БД ---")
        except Exception as e:
            print(f"--- /api/verify-2fa: Ошибка при сохранении в БД: {e} ---")
            db.session.rollback()
            response = jsonify({"message": f"Database error: {str(e)}"})
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            return response, 500

        del codes_storage[temp_user_id]
        print("--- /api/verify-2fa: Удален temp_user_id из codes_storage ---")

        response = jsonify({'message': 'User registered successfully'})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
        return response, 201

    @app.route('/api/login', methods=['POST', 'OPTIONS'])
    def login():
        if request.method == 'OPTIONS':
            response = make_response('', 200)
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return response

        data = request.get_json()
        print(f"--- /api/login: Полученные данные: {data} ---")
        email = data.get('email')
        password = data.get('password')

        user_data_from_file = find_user_in_file(email)
        if not user_data_from_file or user_data_from_file.get('password') != password:
            print(f"--- /api/login: Неверные учетные данные для {email} ---")
            response = jsonify({'message': 'Invalid credentials'})
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            return response, 401

        code = generate_2fa_code()
        temp_user_id = f"{email}_{int(time.time())}"
        codes_storage[temp_user_id] = {
            "code": code,
            "expires": time.time() + 300,
            "email": email,
            "username": user_data_from_file.get('username')
        }
        print(f"--- /api/login: Сохранено в codes_storage: {temp_user_id} ---")
        print(f"--- /api/login: Сгенерированный код: {code} ---")

        response = jsonify({
            'message': 'Please verify with 2FA code',
            'temp_user_id': temp_user_id,
            'code': code  # Для отладки - уберите в продакшене
        })
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
        return response, 200

    @app.route('/api/verify-login-2fa', methods=['POST', 'OPTIONS'])
    def verify_login_2fa():
        print("--- ПОЛУЧЕН ЗАПРОС НА /api/verify-login-2fa ---")
        if request.method == 'OPTIONS':
            response = make_response('', 200)
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return response

        data = request.get_json()
        print(f"--- /api/verify-login-2fa: Полученные данные: {data} ---")
        temp_user_id = data.get('temp_user_id')
        code = data.get('code')

        if not temp_user_id or not code:
            print("--- /api/verify-login-2fa: Отсутствуют temp_user_id или code ---")
            response = jsonify({'message': 'Temp user ID and code are required'})
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            return response, 400

        print(f"--- /api/verify-login-2fa: Содержимое codes_storage: {codes_storage} ---")
        if temp_user_id not in codes_storage:
            print(f"--- /api/verify-login-2fa: temp_user_id {temp_user_id} не найден ---")
            response = jsonify({'message': 'Invalid or expired verification session'})
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            return response, 400

        stored = codes_storage[temp_user_id]
        print(f"--- /api/verify-login-2fa: Данные для {temp_user_id}: {stored} ---")
        if time.time() > stored['expires']:
            print("--- /api/verify-login-2fa: Код истек ---")
            del codes_storage[temp_user_id]
            response = jsonify({'message': 'Code expired'})
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            return response, 400

        if code != stored['code']:
            print(f"--- /api/verify-login-2fa: Неверный код. Введено: {code}, ожидалось: {stored['code']} ---")
            response = jsonify({'message': 'Invalid code'})
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            return response, 400
        
        access_token = create_access_token(identity=stored['email'])
        print(f"--- /api/verify-login-2fa: Токен создан для {stored['email']} ---")

        del codes_storage[temp_user_id]
        print("--- /api/verify-login-2fa: Удален temp_user_id из codes_storage ---")

        response = jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'username': stored['username']
        })
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
        return response, 200

    @app.route('/api/logout', methods=['POST', 'OPTIONS'])
    @jwt_required()
    def logout():
        if request.method == 'OPTIONS':
            response = make_response('', 200)
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
            return response

        print("--- ПОЛУЧЕН ЗАПРОС НА /api/logout ---")
        response = jsonify({'message': 'Logout successful'})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
        return response, 200