import mongoose, { Schema, SchemaType } from 'mongoose';

const jobSchema = new mongoose.Schema({
  penerbit: {
    type: String,
    required: true,
  },
  tanggalTerbit: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  pelamar: {
    type: Schema.Types.Mixed,
  },
  preferensi: {
    type: [String],
    required: false,
  },
  syarat: {
    type: String,
    required: false,
  },
  lokasi: {
    type: Schema.Types.Mixed,
  },
  adaPelamarBaru: {
    type: Boolean,
    required: true,
    default: false,
  },
  diterima: {
    type: Schema.Types.Mixed,
  },
  ditolak: {
    type: Schema.Types.Mixed,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
  gaji: {
    type: Number,
    required: true,
  },
  jamKerja: {
    type: Schema.Types.Mixed,
  },
  hariKerja: {
    type: Schema.Types.Mixed,
  },
});

const ModelJob = mongoose.model('job', jobSchema);

export default ModelJob;

//---------------Module Job----------------

/**
 * Mendapatkan semua pekerjaan.
 * @returns {Promise<Array>} Daftar semua pekerjaan yang ada.
 */
async function getJob() {
  return await ModelJob.find();
}

/**
 * Mendapatkan pekerjaan berdasarkan ID.
 * @param {string} id - ID pekerjaan yang akan dicari.
 * @returns {Promise<object|null>} Objek pekerjaan yang ditemukan atau null jika tidak ditemukan.
 */
async function getJobById(id) {
  return await ModelJob.findById(id);
}

/**
 * Menambahkan pekerjaan baru.
 * @param {object} data - Data pekerjaan baru yang akan ditambahkan.
 * @returns {Promise<object>} Objek pekerjaan yang baru ditambahkan.
 */
async function addJob(data) {
  return await ModelJob.create(data);
}

/**
 * Memperbarui informasi pekerjaan.
 * @param {string} id - ID pekerjaan yang akan diperbarui.
 * @param {object} data - Data baru untuk pekerjaan.
 * @returns {Promise<object|null>} Objek pekerjaan yang sudah diperbarui atau null jika gagal.
 */
async function updateJob(id, data) {
  return await ModelJob.findByIdAndUpdate(id, data, { new: true });
}

/**
 * Menghapus pekerjaan berdasarkan ID.
 * @param {string} id - ID pekerjaan yang akan dihapus.
 * @returns {Promise<object|null>} Objek pekerjaan yang sudah dihapus atau null jika gagal.
 */
async function deleteJob(id) {
  return await ModelJob.findByIdAndDelete(id);
}

export const ModuleJob = {
  getJob,
  getJobById,
  addJob,
  updateJob,
  deleteJob,
};
