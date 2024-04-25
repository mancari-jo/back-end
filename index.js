import express, { Router } from 'express';
import http from 'http';
import Config from './src/config/config.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import ModuleDatabase from './src/modules/database.js';

import RouterAuth from './src/routes/auth.js';
import RouterUser from './src/routes/user.js';
import RouterJob from './src/routes/job.js';
import RouterJobPreferences from './src/routes/job-preferences.js';
import Router404 from './src/routes/404.js';

const app = express();
const httpServer = http.createServer(app);
const RouterApi = express.Router();

app.use(cors());

app.use(express.urlencoded({ limit: '30000kb', extended: true }));
app.use(express.json({ limit: '30000kb' }));

app.use(fileUpload());

app.use('/api', [], RouterApi);

(async () => {
  try {
    /**
     * Terhubung ke database.
     * - Mencatat pesan keberhasilan atau kegagalan berdasarkan status koneksi.
     */
    await ModuleDatabase.connect()
      .then(() => {
        console.log('[server_ok] Connected to database');
      })
      .catch((err) => {
        console.log('[server_error] Failed to connect to database: ', err);
      });
    
    /**
     * Rute API
     */
    
    // Pesan selamat datang untuk router API
    RouterApi.use('/', (req, res, next) => {
      if (req.url !== '/') {
        return next();
      }
      res.status(200).json({
        status: true,
        message: 'Welcome to API router',
      });
    });

    // Rute terkait otentikasi
    RouterApi.use('/auth', RouterAuth);

    // Rute terkait operasi pengguna
    RouterApi.use('/user', RouterUser);

    // Rute terkait operasi pekerjaan
    RouterApi.use('/job', RouterJob);

    // Rute terkait preferensi pekerjaan
    RouterApi.use('/job-preferences', RouterJobPreferences);

    // Rute tangkapan untuk menangani kesalahan 404
    RouterApi.use('/*', Router404);

    /**
     * Memulai server HTTP.
     * - Mendengarkan permintaan masuk pada port yang ditentukan.
     */
    httpServer.listen(Config.HTTP_PORT, () => {
      console.log(
        `[server_ok] ⚡ Running HTTP Server at port ${Config.HTTP_PORT}`
      );
    });
  } catch (err) {
    console.error(err);
  }
})();
