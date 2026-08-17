import { Language } from '../types';
import { commandsCategory } from './commands';

export const redisLanguage: Language = {
  id: 'redis',
  name: 'Redis',
  type: 'tool',
  icon: '🔴',
  image: '/picture/redis.png',
  color: 'red',
  description: 'In-memory Data Store ประสิทธิภาพสูงสำหรับการทำ Caching',
  categories: [commandsCategory],
};
