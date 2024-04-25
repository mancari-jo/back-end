import express from 'express';

const Router404 = express.Router();

/**
 * Menangani permintaan GET ke sumber daya yang tidak ditemukan.
 * @param {object} req - Permintaan yang diterima.
 * @param {object} res - Respon yang akan dikirim.
 */
Router404.get('/', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'The resource you are looking for can not be found.',
  });
});

export default Router404;
