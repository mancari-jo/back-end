import mongoose from 'mongoose';
import Config from '../config/config.js';

class ModuleDatabase {
  /**
   * Membuat koneksi dengan database MongoDB.
   * @returns {Promise} - Promise yang akan terpenuhi jika koneksi berhasil atau ditolak jika gagal.
   */
  static async connect() {
    return new Promise((res, rej) => {
      mongoose.set('strictQuery', false);
      mongoose
        .connect(Config.DATABASE_URL)
        .then(() => res())
        .catch((err) =>
          rej(` [server_error] Failed to connect to database: ${err}`)
        );
    });
  }
}

export default ModuleDatabase;
