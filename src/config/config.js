import dotenv from 'dotenv';

dotenv.config();

export default class Config {
  static HTTP_PORT = process.env.HTTP_PORT || 3001;
  static DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/mancari-jo';
}
