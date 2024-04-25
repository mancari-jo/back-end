import express from 'express';
import { ModuleJobPreference } from '../model/job-preferences.js';

const RouterJobPreferences = express.Router();


/**
 * Mengambil daftar semua preferensi pekerjaan.
 * @returns {object} - Respon berisi status, pesan, dan data preferensi pekerjaan.
 */
RouterJobPreferences.get('/', async (req, res) => {
  try {
    const jobPreferences = await ModuleJobPreference.getJobPreference();

    res.status(200).json({
      status: true,
      message: 'Sukses mendapatkan data job preference',
      data: jobPreferences,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

/**
 * Menambahkan preferensi pekerjaan baru.
 * @param {string} nama - Nama preferensi pekerjaan yang akan ditambahkan.
 * @returns {object} - Respon berisi status, pesan, dan data preferensi pekerjaan baru.
 */
RouterJobPreferences.post('/', async (req, res) => {
  try {
    const { nama } = req.body;

    const newJobPreference = await ModuleJobPreference.addJobPreference(nama);

    res.status(201).json({
      status: true,
      message: 'Sukses menambahkan job preference',
      data: newJobPreference,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

export default RouterJobPreferences;
