import express from 'express';

const RouterPublic = express.Router();

/**
 * Menyambut permintaan pada route root.
 * @returns {object} - Respon berisi pesan sambutan.
 */
RouterPublic.get('/', (req, res) =>
  res.json({
    status: true,
    message: 'Welcome to public router',
  })
);

export default RouterPublic;
