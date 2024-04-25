import mongoose from 'mongoose';

const userJobProviderSchema = new mongoose.Schema({
  namaPengguna: {
    type: String,
    required: true,
    unique: true,
  },
  kataSandi: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  fotoProfil: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: 'jobProvider',
  },
  pekerjaan: {
    type: [String],
    required: false,
  },
});

const ModelUserJobProvider = mongoose.model(
  'userJobProvider',
  userJobProviderSchema
);

export default ModelUserJobProvider;

//---------------Module User----------------

/**
 * Mendapatkan pengguna berdasarkan nama pengguna.
 * @param {string} username - Nama pengguna yang akan dicari.
 * @returns {Promise<object|null>} Objek pengguna yang ditemukan atau null jika tidak ditemukan.
 */
async function getUserByUsername(username) {
  return await ModelUserJobProvider.findOne({ namaPengguna: username });
}

/**
 * Mendapatkan pengguna berdasarkan ID.
 * @param {string} id - ID pengguna yang akan dicari.
 * @returns {Promise<object|null>} Objek pengguna yang ditemukan atau null jika tidak ditemukan.
 */
async function getUSerById(id) {
  return await ModelUserJobProvider.findById(id);
}

/**
 * Menambahkan pengguna baru.
 * @param {object} data - Data pengguna baru yang akan ditambahkan.
 * @returns {Promise<object>} Objek pengguna yang baru ditambahkan.
 */
async function addUser(data) {
  return await ModelUserJobProvider.create(data);
}

/**
 * Memperbarui informasi pengguna.
 * @param {string} id - ID pengguna yang akan diperbarui.
 * @param {object} data - Data baru untuk pengguna.
 * @returns {Promise<object|null>} Objek pengguna yang sudah diperbarui atau null jika gagal.
 */
async function updateUser(id, data) {
  return await ModelUserJobProvider.findByIdAndUpdate(id, data, { new: true });
}

/**
 * Menghapus pengguna berdasarkan ID.
 * @param {string} id - ID pengguna yang akan dihapus.
 * @returns {Promise<object|null>} Objek pengguna yang sudah dihapus atau null jika gagal.
 */
async function deleteUser(id) {
  return await ModelUserJobProvider.findByIdAndDelete(id);
}

export const ModuleUserJobProvider = {
  getUserByUsername,
  getUSerById,
  addUser,
  updateUser,
  deleteUser,
};
