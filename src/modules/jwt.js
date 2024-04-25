import jwt from 'jsonwebtoken';
import Config from '../config/config';

class ModuleJWT {
  /**
   * Membuat token JWT.
   * @param {object} body - Data yang akan dimasukkan ke dalam token.
   * @returns {string} Token JWT yang dihasilkan.
   */
  static sign(body) {
    try {
      return jwt.sign(body, Config.SERVER_TOKEN_SECRET, { expiresIn: '1h' });
    } catch (ignore) {
      return '';
    }
  }

  /**
   * Memverifikasi token JWT.
   * @param {string} token - Token JWT yang akan diverifikasi.
   * @returns {object} Objek hasil verifikasi token.
   * - valid: boolean yang menunjukkan apakah token valid atau tidak.
   * - data: data yang terkandung dalam token jika valid, atau undefined jika tidak valid.
   */
  static verify(token) {
    try {
      const parsedToken = jwt.verify(token, Config.SERVER_TOKEN_SECRET);

      // delete unused information
      delete parsedToken['iat'];
      delete parsedToken['exp'];
      delete parsedToken['iss'];

      return {
        valid: true,
        data: parsedToken,
      };
    } catch (ignore) {
      return {
        valid: false,
        data: undefined,
      };
    }
  }
}

export default ModuleJWT;
