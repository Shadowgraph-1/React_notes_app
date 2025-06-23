import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateNote.module.css';

// 🚀 Расширенные интерфейсы для 2025
interface NoteData {
  id?: string;
  title: string;
  content: string;
  color: string;
  tags: string[];
  priority: 'Низкий' | 'Средний' | 'Высокий' | 'Срочный';
  dueDate?: string;
  attachments: FileAttachment[];
  collaborators: string[];
  aiSummary?: string;
  voiceNotes: VoiceNote[];
  location?: GeoLocation;
  encrypted: boolean;
  version: number;
  lastModified: string;
  wordCount: number;
  readingTime: number;
  mood?: 'positive' | 'neutral' | 'negative';
  category: string;
}

interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnail?: string;
}

interface VoiceNote {
  id: string;
  url: string;
  duration: number;
  transcript?: string;
  waveform: number[];
}

interface GeoLocation {
  lat: number;
  lng: number;
  address: string;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
  type: 'text' | 'voice' | 'image' | 'file' | 'ai_response';
  reactions: MessageReactions;
  isAI?: boolean;
  language?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  mentions?: string[];
  replyTo?: string;
  edited?: boolean;
  readBy: string[];
}

interface MessageReactions {
  thumbsup: number;
  heart: number;
  laugh: number;
  fire: number;
  mind_blown: number;
  party: number;
}

interface DashboardData {
  activityData: number[];
  newNotesToday: number;
  avgNoteTime: number;
  totalUsers: number;
  popularNote: string;
  syncStatus: 'working' | 'error' | 'syncing' | 'offline';
  serverLoad: number;
  notifications: number;
  aiInsights: AIInsight[];
  productivityScore: number;
  streakDays: number;
  trendingTags: TrendingTag[];
  realtimeCollaborators: number;
  storageUsed: { used: number; total: number };
  securityStatus: 'secure' | 'warning' | 'critical';
  aiQuota: { used: number; total: number };
}

interface AIInsight {
  type: 'productivity' | 'pattern' | 'recommendation' | 'warning';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
}

interface TrendingTag {
  name: string;
  trend: number;
  usage: number;
  aiRecommended?: boolean;
}

// 🎨 Расширенные константы
const NOTE_COLORS = [
  "#FFFFFF", "#FFEBEE", "#E8F5E9", "#E3F2FD", "#F3E5F5",
  "#FFF3E0", "#E0F2F1", "#F1F8E9", "#FCE4EC", "#E8EAF6",
  "#1A1A1A", "#2D1B69", "#1B5E20", "#0D47A1", "#4A148C"
];

const PRIORITY_COLORS = {
  Низкий: '#4CAF50',
  Средний: '#FF9800',
  Высокий: '#F44336',
  Срочный: '#D81B60'
};

const PRIORITY_OPTIONS = [
  { value: 'Низкий', label: 'Низкий' },
  { value: 'Средний', label: 'Средний' },
  { value: 'Высокий', label: 'Высокий' },
  { value: 'Срочный', label: 'Срочный' }
];

const CATEGORIES = [
  'Работа', 'Личное', 'Проекты', 'Идеи', 'Учеба',
  'Здоровье', 'Путешествия', 'Финансы', 'Творчество', 'Другое'
];

const AVATAR_COLORS: { [key: string]: string } = {
  "Вы": "#8b5cf6",
  "AI Assistant": "#00ff88",
  "Анна": "#ec4899",
  "Петр": "#3b82f6",
  "Маша": "#facc15",
  "Бот": "#10b981",
  "Коллега": "#f97316",
  "Алексей": "#a78bfa",
  "Елена": "#f472b6",
  "Дмитрий": "#60a5fa",
  "Ирина": "#fbbf24",
  "Сергей": "#34d399",
  "Наталья": "#e879f9",
  "Андрей": "#818cf8",
  "Ольга": "#fbcfe8"
};

const CHAT_USERS = [
  "Вы", "Анна", "Петр", "Маша", "Алексей", "Елена", "Дмитрий", "Ирина", "Сергей", "Наталья", "Андрей", "Ольга"
];

const RANDOM_MESSAGES = [
  "Привет всем! Как дела?",
  "Отличный день для кодинга.",
  "Надо бы закончить отчет до пятницы.",
  "Кто-нибудь видел мой блокнот?",
  "Интересная идея, стоит обдумать.",
  "Сегодня пробки жуткие были.",
  "Предлагаю встретиться завтра.",
  "Просто мысль...",
  "Не забыть купить молоко.",
  "Это гениально!",
  "У меня вопрос по проекту X.",
  "Кто за кофе?",
  "Всем хорошего вечера!",
  "Работа кипит!",
  "Нужна помощь с задачей."
];

const AI_RESPONSES = [
  "Анализирую... Готово! Чем могу помочь?",
  "Идея отличная! Хотите, чтобы я предложил теги?",
  "Понял, сейчас подумаю над решением.",
  "Интересно! Давайте разберём подробнее.",
  "Ого, это стоит записать! 😄"
];

// 🤖 AI-помощник для заметок
class AIAssistant {
  static async generateSummary(content: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const words = content.split(' ').length;
    if (words < 10) return "Короткая заметка";
    if (words < 50) return `Заметка из ${words} слов о ${content.split(' ')[0].toLowerCase()}`;
    return `Подробная заметка (${words} слов) охватывающая основные темы и идеи`;
  }

  static async suggestTags(title: string, content: string): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const text = (title + ' ' + content).toLowerCase();
    const suggestions: string[] = [];

    if (text.includes('работ') || text.includes('проект')) suggestions.push('Работа');
    if (text.includes('идея') || text.includes('план')) suggestions.push('Идеи');
    if (text.includes('встреча') || text.includes('звонок')) suggestions.push('Встречи');
    if (text.includes('код') || text.includes('программ')) suggestions.push('Программирование');
    if (text.includes('дизайн') || text.includes('ui')) suggestions.push('Дизайн');

    return suggestions.slice(0, 3);
  }

  static analyzeMood(content: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['отлично', 'хорошо', 'успех', 'радость', 'счастье'];
    const negativeWords = ['плохо', 'проблема', 'ошибка', 'грустно', 'сложно'];

    const text = content.toLowerCase();
    const positiveCount = positiveWords.filter(word => text.includes(word)).length;
    const negativeCount = negativeWords.filter(word => text.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  static calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
}

// 🎵 Голосовые заметки
class VoiceRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error('Ошибка доступа к микрофону:', error);
      throw new Error('Не удалось получить доступ к микрофону');
    }
  }

  async stopRecording(): Promise<VoiceNote> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('Запись не начата'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);

        resolve({
          id: Date.now().toString(),
          url,
          duration: 0,
          transcript: "Имитация транскрипции голосовой заметки",
          waveform: Array.from({ length: 50 }, () => Math.random() * 2 - 1)
        });
      };

      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    });
  }
}

// 🔒 Система шифрования
class EncryptionService {
  static async encrypt(data: string, password: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return btoa(data + '::encrypted::' + password);
  }

  static async decrypt(encryptedData: string, password: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const decoded = atob(encryptedData);
    const parts = decoded.split('::encrypted::');
    if (parts.length === 2 && parts[1] === password) {
      return parts[0];
    }
    throw new Error('Неверный пароль или поврежденные данные');
  }
}

// 📍 Геолокация
const useGeolocation = () => {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = useCallback(async () => {
    setLoading(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
      });

      const mockAddresses = [
        "Москва, Красная площадь, 1",
        "Санкт-Петербург, Дворцовая пл., 2",
        "Нью-Йорк, Таймс-сквер",
        "Лондон, Биг-Бен"
      ];
      const mockAddress = mockAddresses[Math.floor(Math.random() * mockAddresses.length)];

      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        address: mockAddress
      });
    } catch (error) {
      console.error('Ошибка получения геолокации:', error);
      alert('Не удалось получить текущую геолокацию. Пожалуйста, разрешите доступ.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { location, loading, getCurrentLocation };
};

// 📊 SVG иконки
const AIIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6"/>
    <path d="m1 12 6 0m6 0 6 0"/>
    <path d="m2 2 4 4m8 8 4 4"/>
    <path d="m2 22 4-4m8-8 4-4"/>
  </svg>
);

const VoiceIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const LocationIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const SecurityIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

const CollaborationIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const AnalyticsIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18"/>
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
  </svg>
);

const AttachmentIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);

const PlusIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const NoteIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
    <polyline points="13 2 13 9 20 9"/>
  </svg>
);

const SendIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

const HomeIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

// 🎯 Улучшенный компонент дашборда
const EnhancedDashboardPanel: React.FC<{
  dashboardData: DashboardData;
}> = ({ dashboardData }) => {
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);

  const securityStatusColor = useMemo(() => {
    switch (dashboardData.securityStatus) {
      case 'secure': return 'var(--accent-green)';
      case 'warning': return 'var(--accent-yellow)';
      case 'critical': return '#ef4444';
      default: return 'var(--text-muted)';
    }
  }, [dashboardData.securityStatus]);

  return (
    <div className={`${styles.columnPanel} ${styles.dashboardPanel}`}>
      <div className={styles.panelHeader}>
        <AnalyticsIcon />
        <h2>Умная аналитика</h2>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <div className={styles.productivityScore}>
            Продуктивность: {dashboardData.productivityScore}%
          </div>
        </div>
      </div>

      <div className={styles.dashboardContent}>
        {/* AI Инсайты */}
        <div className={styles.dashboardSection}>
          <h3>🤖 AI Инсайты</h3>
          <div className={styles.aiInsightsGrid}>
            {dashboardData.aiInsights.map((insight, index) => (
              <div
                key={index}
                className={`${styles.aiInsightWidget} ${insight.type === 'warning' ? styles.warning : ''}`}
                onClick={() => setSelectedInsight(insight)}
              >
                <div>
                  <AIIcon />
                  <span>{insight.title}</span>
                  <div className={styles.confidenceBadge}>
                    {Math.round(insight.confidence * 100)}%
                  </div>
                </div>
                <p>{insight.description}</p>
                {insight.actionable && (
                  <div className={styles.actionable}>
                    ⚡ Действие доступно
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Расширенная статистика */}
        <div className={styles.dashboardSection}>
          <h3>📊 Статистика</h3>
          <div className={styles.enhancedStatsGrid}>
            <div className={styles.statWidget}>
              <div className={styles.statHeader}>
                <span>🔥 Серия дней</span>
              </div>
              <div className={styles.statValue}>{dashboardData.streakDays}</div>
              <div className={styles.statExtra}>дней подряд активности</div>
            </div>

            <div className={styles.statWidget}>
              <div className={styles.statHeader}>
                <CollaborationIcon />
                <span>Коллаборация</span>
              </div>
              <div className={styles.statValue}>{dashboardData.realtimeCollaborators}</div>
              <div className={styles.statExtra}>активных соавторов</div>
            </div>

            <div className={styles.statWidget}>
              <div className={styles.statHeader}>
                <SecurityIcon />
                <span>Безопасность</span>
              </div>
              <div className={styles.securityStatus} style={{ color: securityStatusColor }}>
                {dashboardData.securityStatus}
              </div>
            </div>

            <div className={styles.statWidget}>
              <div className={styles.statHeader}>
                <span>💾 Хранилище</span>
              </div>
              <div className={styles.storageBar}>
                <div style={{ width: `${(dashboardData.storageUsed.used / dashboardData.storageUsed.total) * 100}%` }} />
              </div>
              <div className={styles.statExtra}>
                {(dashboardData.storageUsed.used / 1024).toFixed(1)}GB / {(dashboardData.storageUsed.total / 1024).toFixed(1)}GB
              </div>
            </div>

            <div className={styles.statWidget}>
              <div className={styles.statHeader}>
                <AIIcon />
                <span>AI Квота</span>
              </div>
              <div className={styles.aiQuotaBar}>
                <div style={{ width: `${(dashboardData.aiQuota.used / dashboardData.aiQuota.total) * 100}%` }} />
              </div>
              <div className={styles.statExtra}>
                {dashboardData.aiQuota.used} / {dashboardData.aiQuota.total} запросов
              </div>
            </div>
          </div>
        </div>

        <div className={styles.dashboardSection}>
          <h3>🏷️ Популярные теги</h3>
          <div className={styles.smartTagsGrid}>
            {dashboardData.trendingTags.map((tag, index) => (
              <div key={index} className={`${styles.enhancedTagWidget} ${tag.aiRecommended ? styles.aiRecommended : ''}`}>
                {tag.aiRecommended && (
                  <div className={styles.aiBadge}>
                    AI
                  </div>
                )}
                <div>
                  <div className={styles.tagName}>{tag.name}</div>
                  <div className={styles.tagUsage}>
                    {tag.usage} использований
                  </div>
                </div>
                <span className={`${styles.tagTrend} ${tag.trend > 0 ? styles.positive : styles.negative}`}>
                  {tag.trend > 0 ? '+' : ''}{tag.trend}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedInsight && (
        <div className={styles.aiInsightModalOverlay} onClick={() => setSelectedInsight(null)}>
          <div className={styles.aiInsightModalContent} onClick={e => e.stopPropagation()}>
            <h3>{selectedInsight.title}</h3>
            <p>{selectedInsight.description}</p>
            <div className={styles.aiInsightModalActions}>
              <button
                onClick={() => setSelectedInsight(null)}
                className={styles.closeButton}
              >
                Закрыть
              </button>
              {selectedInsight.actionable && (
                <button className={styles.applyButton}>
                  Применить
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 🚀 Супер-прокаченный редактор заметок
const SuperNoteEditor: React.FC<{
  onNoteSaved: () => void;
}> = ({ onNoteSaved }) => {
  const [noteData, setNoteData] = useState<NoteData>({
    title: '',
    content: '',
    color: NOTE_COLORS[0],
    tags: [],
    priority: 'Средний',
    attachments: [],
    collaborators: [],
    voiceNotes: [],
    encrypted: false,
    version: 1,
    lastModified: new Date().toISOString(),
    wordCount: 0,
    readingTime: 0,
    category: 'Личное'
  });

  const [newTag, setNewTag] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [encryptionPassword, setEncryptionPassword] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const voiceRecorder = useRef(new VoiceRecorder());
  const { location, loading: locationLoading, getCurrentLocation } = useGeolocation();

  const analyzeContent = useCallback(async () => {
    if (!noteData.content.trim()) return;

    setAiLoading(true);
    try {
      const [summary, tags, mood] = await Promise.all([
        AIAssistant.generateSummary(noteData.content),
        AIAssistant.suggestTags(noteData.title, noteData.content),
        Promise.resolve(AIAssistant.analyzeMood(noteData.content))
      ]);

      setNoteData(prev => ({
        ...prev,
        aiSummary: summary,
        mood,
        wordCount: prev.content.split(/\s+/).length,
        readingTime: AIAssistant.calculateReadingTime(prev.content)
      }));

      setSuggestedTags(tags);
    } catch (error) {
      console.error('Ошибка AI анализа:', error);
    } finally {
      setAiLoading(false);
    }
  }, [noteData.content, noteData.title]);

  useEffect(() => {
    const handler = setTimeout(() => {
      analyzeContent();
    }, 1000);
    return () => clearTimeout(handler);
  }, [noteData.title, noteData.content, analyzeContent]);

  const handleVoiceRecording = useCallback(async () => {
    try {
      if (!isRecording) {
        await voiceRecorder.current.startRecording();
        setIsRecording(true);
      } else {
        const voiceNote = await voiceRecorder.current.stopRecording();
        setNoteData(prev => ({
          ...prev,
          voiceNotes: [...prev.voiceNotes, voiceNote]
        }));
        setIsRecording(false);
      }
    } catch (error) {
      console.error('Ошибка записи голоса:', error);
      alert('Не удалось записать голосовую заметку');
    }
  }, [isRecording]);

  const handlePlayVoiceNote = useCallback((url: string) => {
    const audio = new Audio(url);
    audio.play().catch(e => console.error('Ошибка воспроизведения аудио:', e));
  }, []);

  const toggleEncryption = useCallback(async () => {
    if (!noteData.encrypted) {
      const password = prompt('Введите пароль для шифрования:');
      if (!password) return;
      setEncryptionPassword(password);
      setNoteData(prev => ({ ...prev, encrypted: true }));
    } else {
      const confirmDecrypt = prompt('Введите пароль для дешифрования:');
      if (confirmDecrypt === encryptionPassword) {
        try {
          const decryptedContent = await EncryptionService.decrypt(noteData.content, encryptionPassword);
          setNoteData(prev => ({ ...prev, encrypted: false, content: decryptedContent }));
          setEncryptionPassword('');
        } catch (error) {
          alert('Неверный пароль для дешифрования!');
          console.error(error);
        }
      } else {
        alert('Неверный пароль для дешифрования!');
      }
    }
  }, [noteData.encrypted, encryptionPassword, noteData.content]);

  const addLocation = useCallback(async () => {
    await getCurrentLocation();
  }, [getCurrentLocation]);

  useEffect(() => {
    if (location && !noteData.location) {
      setNoteData(prev => ({
        ...prev,
        location
      }));
    }
  }, [location, noteData.location]);

  const handleAttachmentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newAttachments: FileAttachment[] = files.map(file => ({
        id: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        thumbnail: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
      }));
      setNoteData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newAttachments]
      }));
    }
  }, []);

  const handleRemoveAttachment = useCallback((id: string) => {
    setNoteData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== id)
    }));
  }, []);

  const handleSaveNote = useCallback(async () => {
    if (!noteData.title.trim() && !noteData.content.trim()) {
      alert('Заметка пуста!');
      return;
    }

    try {
      let finalNoteData = { ...noteData };

      if (noteData.encrypted && encryptionPassword) {
        finalNoteData.content = await EncryptionService.encrypt(noteData.content, encryptionPassword);
      }

      finalNoteData.lastModified = new Date().toISOString();
      finalNoteData.version += 1;

      console.log('Сохранение супер-заметки:', finalNoteData);
      alert('Заметка сохранена с AI-анализом!');
      onNoteSaved();
      setNoteData({
        title: '',
        content: '',
        color: NOTE_COLORS[0],
        tags: [],
        priority: 'Средний',
        attachments: [],
        collaborators: [],
        voiceNotes: [],
        encrypted: false,
        version: 1,
        lastModified: new Date().toISOString(),
        wordCount: 0,
        readingTime: 0,
        category: 'Личное'
      });
      setEncryptionPassword('');
      setSuggestedTags([]);
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка при сохранении заметки');
    }
  }, [noteData, encryptionPassword, onNoteSaved]);

  const addTag = useCallback(() => {
    const tagToAdd = newTag.trim();
    if (tagToAdd && !noteData.tags.includes(tagToAdd)) {
      setNoteData(prev => ({
        ...prev,
        tags: [...prev.tags, tagToAdd]
      }));
      setNewTag('');
    }
  }, [newTag, noteData.tags]);

  const removeTag = useCallback((tagToRemove: string) => {
    setNoteData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  }, []);

  const addSuggestedTag = useCallback((tag: string) => {
    if (!noteData.tags.includes(tag)) {
      setNoteData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
    setSuggestedTags(prev => prev.filter(t => t !== tag));
  }, [noteData.tags]);

  return (
    <div className={`${styles.columnPanel} ${styles.noteEditorPanel}`}>
      <div className={styles.panelHeader}>
        <NoteIcon />
        <h2>Создать вашу заметку</h2>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          {aiLoading && <div style={{ color: 'var(--accent-purple)' }}>🤖 Анализ...</div>}
          {noteData.encrypted && <SecurityIcon title="Заметка зашифрована" style={{ color: 'var(--accent-green)' }} />}
          {location && <LocationIcon title={`Геолокация: ${location.address}`} style={{ color: 'var(--accent-blue)' }} />}
        </div>
      </div>

      <div className={styles.noteEditorContent}>
        <input
          type="text"
          placeholder="Заголовок заметки..."
          value={noteData.title}
          onChange={(e) => setNoteData(prev => ({ ...prev, title: e.target.value }))}
          className={styles.noteTitleInput}
        />
        <textarea
          placeholder="Напишите вашу заметку здесь..."
          value={noteData.content}
          onChange={(e) => setNoteData(prev => ({ ...prev, content: e.target.value }))}
          className={styles.noteContentTextarea}
        />

        {noteData.aiSummary && (
          <div className={styles.aiSummary}>
            <AIIcon />
            <p>
              **AI-резюме:** {noteData.aiSummary}
              <span style={{ marginLeft: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
                ({noteData.wordCount} слов, {noteData.readingTime} мин чтения, настроение: {noteData.mood})
              </span>
            </p>
          </div>
        )}

        <div className={styles.noteSettingsGrid}>
          <div className={styles.settingItem}>
            <label>Цвет заметки:</label>
            <div className={styles.colorPalette}>
              {NOTE_COLORS.map(color => (
                <div
                  key={color}
                  className={`${styles.colorBox} ${noteData.color === color ? styles.selected : ''}`}
                  style={{ background: color }}
                  onClick={() => setNoteData(prev => ({ ...prev, color }))}
                />
              ))}
            </div>
          </div>

          <div className={styles.settingItem}>
            <label>Приоритет:</label>
            <select
              value={noteData.priority}
              onChange={(e) => setNoteData(prev => ({ ...prev, priority: e.target.value as NoteData['priority'] }))}
              style={{ background: PRIORITY_COLORS[noteData.priority], color: noteData.priority === 'Низкий' || noteData.priority === 'Средний' ? 'var(--text-primary)' : 'white' }}
            >
              {PRIORITY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.settingItem}>
            <label>Категория:</label>
            <select
              value={noteData.category}
              onChange={(e) => setNoteData(prev => ({ ...prev, category: e.target.value }))}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className={styles.settingItem}>
            <label>Срок выполнения:</label>
            <input
              type="date"
              value={noteData.dueDate || ''}
              onChange={(e) => setNoteData(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </div>
        </div>

        <div className={styles.tagsSection}>
          <label>Теги:</label>
          <div className={styles.tagsInputContainer}>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTag()}
              placeholder="Добавить тег..."
            />
            <button
              onClick={addTag}
              className={styles.actionButton}
            >
              <PlusIcon style={{ width: '16px', height: '16px' }} /> Добавить
            </button>
          </div>
          <div className={styles.currentTags}>
            {noteData.tags.map(tag => (
              <span key={tag} className={styles.tagPill}>
                {tag}
                <button onClick={() => removeTag(tag)}>×</button>
              </span>
            ))}
          </div>
          {suggestedTags.length > 0 && (
            <div className={styles.suggestedTags}>
              <label>AI предлагает:</label>
              <div>
                {suggestedTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => addSuggestedTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.attachmentsSection}>
          <label>Вложения:</label>
          <input
            type="file"
            multiple
            onChange={handleAttachmentChange}
          />
          <div className={styles.attachmentList}>
            {noteData.attachments.map(attachment => (
              <div key={attachment.id} className={styles.attachmentItem}>
                {attachment.thumbnail ? (
                  <img src={attachment.thumbnail} alt="thumbnail" />
                ) : (
                  <AttachmentIcon />
                )}
                <span>{attachment.name}</span>
                <button onClick={() => handleRemoveAttachment(attachment.id)}>×</button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.voiceNotesSection}>
          <label>Голосовые заметки:</label>
          <button
            onClick={handleVoiceRecording}
            className={`${styles.actionButton} ${isRecording ? styles.recording : ''}`}
          >
            <VoiceIcon />
            {isRecording ? 'Остановить запись' : 'Начать запись'}
          </button>
          <div className={styles.voiceNoteList}>
            {noteData.voiceNotes.map(vn => (
              <div key={vn.id} className={styles.voiceNoteItem}>
                <button onClick={() => handlePlayVoiceNote(vn.url)}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <div>
                  <span>Голосовая заметка {vn.id.substring(vn.id.length - 4)}</span>
                  {vn.transcript && (
                    <p>
                      " {vn.transcript.length > 50 ? vn.transcript.substring(0, 50) + '...' : vn.transcript} "
                    </p>
                  )}
                  <div className={styles.waveform}>
                    {vn.waveform.map((amp, idx) => (
                      <div key={idx} style={{
                        height: `${Math.abs(amp) * 100}%`,
                        transform: `scaleY(${amp > 0 ? 1 : -1})`
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.collaboratorsSection}>
          <label>Коллабораторы:</label>
          <input
            type="text"
            placeholder="Добавить email коллаборатора..."
            value={noteData.collaborators.join(', ')}
            disabled
          />
          <div className={styles.collaboratorAvatars}>
            {noteData.collaborators.length === 0 ? (
              <span>Никто не сотрудничает</span>
            ) : (
              noteData.collaborators.map(collab => (
                <div key={collab} style={{
                  background: AVATAR_COLORS[collab as keyof typeof AVATAR_COLORS] || '#ccc',
                }} title={collab}>
                  {collab[0].toUpperCase()}
                </div>
              ))
            )}
            <button
              onClick={() => setNoteData(prev => ({ ...prev, collaborators: [...prev.collaborators, "Анна", "Петр"] }))}
              className={styles.actionButton}
            >
              Добавить коллаборатора (Пример)
            </button>
          </div>
        </div>

        <div className={styles.encryptionSection}>
          <SecurityIcon style={{ color: noteData.encrypted ? 'var(--accent-green)' : 'var(--text-muted)' }} />
          <label htmlFor="encryption-toggle">Зашифровать заметку:</label>
          <input
            type="checkbox"
            id="encryption-toggle"
            checked={noteData.encrypted}
            onChange={toggleEncryption}
          />
          {noteData.encrypted && <span style={{ fontSize: '12px', color: 'var(--accent-green)' }}> (Зашифровано)</span>}
        </div>

        <div className={styles.locationSection}>
          <LocationIcon style={{ color: noteData.location ? 'var(--accent-blue)' : 'var(--text-muted)' }} />
          <label>Геолокация:</label>
          <button
            onClick={addLocation}
            disabled={locationLoading || !!noteData.location}
            className={styles.actionButton}
            style={{
              background: noteData.location ? 'var(--bg-tertiary)' : undefined,
              color: noteData.location ? 'var(--text-muted)' : undefined,
            }}
          >
            {locationLoading ? 'Определяем...' : (noteData.location ? 'Местоположение добавлено' : 'Добавить текущее местоположение')}
          </button>
          {noteData.location && (
            <span>
              {noteData.location.address}
            </span>
          )}
        </div>

        <div className={styles.editorFooter}>
          <button
            onClick={() => {
              setNoteData({
                title: '',
                content: '',
                color: NOTE_COLORS[0],
                tags: [],
                priority: 'Средний',
                attachments: [],
                collaborators: [],
                voiceNotes: [],
                encrypted: false,
                version: 1,
                lastModified: new Date().toISOString(),
                wordCount: 0,
                readingTime: 0,
                category: 'Личное'
              });
              setEncryptionPassword('');
              setSuggestedTags([]);
            }}
            className={styles.secondaryButton}
          >
            Очистить
          </button>
          <button
            onClick={handleSaveNote}
            className={styles.primaryButton}
          >
            Сохранить заметку
          </button>
        </div>
      </div>
    </div>
  );
};

// 💬 Компонент демо-чата
const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isAIToggleOn, setIsAIToggleOn] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const getRandomUser = useCallback(() => {
    const availableUsers = CHAT_USERS.filter(user => user !== "Вы");
    return availableUsers[Math.floor(Math.random() * availableUsers.length)];
  }, []);

  const getRandomMessageContent = useCallback(() => {
    return RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];
  }, []);

  const getRandomAIResponse = useCallback(() => {
    return AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
  }, []);

  const generateRandomReaction = (): MessageReactions => {
    const reactions: MessageReactions = {
      thumbsup: 0,
      heart: 0,
      laugh: 0,
      fire: 0,
      mind_blown: 0,
      party: 0,
    };
    const reactionTypes = Object.keys(reactions) as Array<keyof MessageReactions>;
    const numReactions = Math.floor(Math.random() * 3);
    for (let i = 0; i < numReactions; i++) {
      const randomReactionType = reactionTypes[Math.floor(Math.random() * reactionTypes.length)];
      reactions[randomReactionType] += Math.floor(Math.random() * 3) + 1;
    }
    return reactions;
  };

  const addRandomMessage = useCallback(() => {
    const user = getRandomUser();
    const messageContent = getRandomMessageContent();
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        user,
        message: messageContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        reactions: generateRandomReaction(),
        readBy: [],
      }
    ]);
  }, [getRandomUser, getRandomMessageContent]);

  useEffect(() => {
    const interval = setInterval(() => {
      addRandomMessage();
    }, 5000);
    return () => clearInterval(interval);
  }, [addRandomMessage]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      user: "Вы",
      message: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      reactions: { thumbsup: 0, heart: 0, laugh: 0, fire: 0, mind_blown: 0, party: 0 },
      readBy: [],
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');

    if (isAIToggleOn) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            user: "AI Assistant",
            message: getRandomAIResponse(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'ai_response',
            reactions: generateRandomReaction(),
            isAI: true,
            readBy: [],
          }
        ]);
      }, 1000);
    }
  }, [newMessage, isAIToggleOn, getRandomAIResponse]);

  const handleReaction = useCallback((messageId: string, reactionType: keyof MessageReactions) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: {
                ...msg.reactions,
                [reactionType]: msg.reactions[reactionType] + 1
              }
            }
          : msg
      )
    );
  }, []);

  return (
    <div className={`${styles.columnPanel} ${styles.chatPanel}`}>
      <div className={styles.panelHeader}>
        <CollaborationIcon />
        <h2>Чат команды (Демо)</h2>
      </div>
      <div className={styles.chatMessages} ref={chatMessagesRef}>
        {messages.map(msg => (
          <div key={msg.id} className={styles.chatMessage}>
            <div
              className={styles.chatAvatar}
              style={{ background: AVATAR_COLORS[msg.user as keyof typeof AVATAR_COLORS] || '#ccc' }}
              title={msg.user}
            >
              {msg.user[0].toUpperCase()}
            </div>
            <div className={styles.chatMessageContent}>
              <strong>{msg.user}</strong>
              <p>{msg.message}</p>
              <span className={styles.chatMessageTimestamp}>{msg.timestamp}</span>
              <div className={styles.messageReactions}>
                {Object.entries(msg.reactions).map(([reaction, count]) =>
                  count > 0 ? (
                    <span
                      key={reaction}
                      onClick={() => handleReaction(msg.id, reaction as keyof MessageReactions)}
                    >
                      {
                        reaction === 'thumbsup' ? '👍' :
                        reaction === 'heart' ? '❤️' :
                        reaction === 'laugh' ? '😂' :
                        reaction === 'fire' ? '🔥' :
                        reaction === 'mind_blown' ? '🤯' :
                        reaction === 'party' ? '🎉' : ''
                      } {count}
                    </span>
                  ) : null
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chatInputContainer}>
        <div className={styles.aiToggleContainer}>
          <span className={styles.aiToggleLabel}>AI Ассистент</span>
          <label className={styles.aiToggleSwitch}>
            <input
              type="checkbox"
              checked={isAIToggleOn}
              onChange={() => setIsAIToggleOn(prev => !prev)}
            />
            <span className={styles.aiToggleSlider}></span>
          </label>
        </div>
        <div className={styles.chatInputWrapper}>
          <input
            type="text"
            placeholder="Напишите сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const CreateNote: React.FC = () => {
  const navigate = useNavigate();

  const generateRandomDashboardData = useCallback((): DashboardData => ({
    activityData: Array.from({ length: 7 }, () => Math.floor(Math.random() * 50)),
    newNotesToday: Math.floor(Math.random() * 10),
    avgNoteTime: Number((Math.random() * 5).toFixed(1)),
    totalUsers: Math.floor(Math.random() * 2000) + 1000,
    popularNote: ["Ежедневный отчет", "План проекта", "Идеи для стартапа", "Личные заметки"][Math.floor(Math.random() * 4)],
    syncStatus: ['working', 'syncing', 'offline'][Math.floor(Math.random() * 3)] as 'working' | 'error' | 'syncing' | 'offline',
    serverLoad: Number((Math.random() * 1).toFixed(2)),
    notifications: Math.floor(Math.random() * 10),
    aiInsights: [
      {
        type: 'productivity',
        title: 'Улучшите фокус',
        description: `Отвлечений: ${Math.floor(Math.random() * 30)}% во время работы.`,
        confidence: Number((Math.random() * 0.3 + 0.7).toFixed(2)),
        actionable: true
      },
      {
        type: 'pattern',
        title: 'Вечерняя активность',
        description: `Заметки создаются в ${Math.floor(Math.random() * 6 + 18)}:00.`,
        confidence: Number((Math.random() * 0.2 + 0.8).toFixed(2)),
        actionable: false
      },
      {
        type: 'recommendation',
        title: 'Новые теги',
        description: 'Попробуйте теги: ' + ['Продуктивность', 'Идеи', 'Работа'][Math.floor(Math.random() * 3)],
        confidence: Number((Math.random() * 0.3 + 0.6).toFixed(2)),
        actionable: true
      },
      {
        type: 'warning',
        title: 'Снижение активности',
        description: `Активность упала на ${Math.floor(Math.random() * 20)}%.`,
        confidence: Number((Math.random() * 0.4 + 0.5).toFixed(2)),
        actionable: true
      }
    ],
    productivityScore: Math.floor(Math.random() * 20 + 80),
    streakDays: Math.floor(Math.random() * 50),
    trendingTags: [
      { name: 'AI', trend: Math.floor(Math.random() * 20), usage: Math.floor(Math.random() * 150), aiRecommended: true },
      { name: 'Проекты', trend: Math.floor(Math.random() * 10), usage: Math.floor(Math.random() * 100), aiRecommended: false },
      { name: 'Идеи', trend: Math.floor(Math.random() * 15), usage: Math.floor(Math.random() * 80), aiRecommended: true },
      { name: 'Личное', trend: Math.floor(Math.random() * 5) * -1, usage: Math.floor(Math.random() * 70), aiRecommended: false }
    ],
    realtimeCollaborators: Math.floor(Math.random() * 5),
    storageUsed: { used: Math.floor(Math.random() * 1000), total: 2048 },
    securityStatus: ['secure', 'warning', 'critical'][Math.floor(Math.random() * 3)] as 'secure' | 'warning' | 'critical',
    aiQuota: { used: Math.floor(Math.random() * 300), total: 500 }
  }), []);

  const [dashboardData, setDashboardData] = useState<DashboardData>(generateRandomDashboardData());

  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(generateRandomDashboardData());
    }, 10000);
    return () => clearInterval(interval);
  }, [generateRandomDashboardData]);

  const handleNoteSaved = useCallback(() => {
    console.log("Note saved successfully!");
  }, []);

  return (
    <>
      <button className={styles.homeButton} onClick={() => navigate('/')} title="На главную">
        <HomeIcon />
      </button>
      <div className={styles.createNotePage}>
        <EnhancedDashboardPanel dashboardData={dashboardData} />
        <SuperNoteEditor onNoteSaved={handleNoteSaved} />
        <ChatPanel />
      </div>
    </>
  );
};

export default CreateNote;