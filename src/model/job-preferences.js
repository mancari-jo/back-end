import mongoose, { Schema, SchemaType } from 'mongoose';

const jobPreferenceSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
});

const ModelJobPreference = mongoose.model('jobPreference', jobPreferenceSchema);

export default ModelJobPreference;

//---------------Module Job Preference----------------

/**
 * Mendapatkan semua preferensi pekerjaan.
 * @returns {Promise<Array>} Daftar semua preferensi pekerjaan yang ada.
 */
async function getJobPreference() {
  return await ModelJobPreference.find();
}


/**
 * Mendapatkan preferensi pekerjaan berdasarkan ID.
 * @param {string} id - ID preferensi pekerjaan yang akan dicari.
 * @returns {Promise<object|null>} Objek preferensi pekerjaan yang ditemukan atau null jika tidak ditemukan.
 */
async function getJobPreferenceById(id) {
  return await ModelJobPreference.findById(id);
}

/**
 * Menambahkan preferensi pekerjaan baru.
 * @param {string} nama - Nama preferensi pekerjaan yang akan ditambahkan.
 * @returns {Promise<object>} Objek preferensi pekerjaan yang baru ditambahkan.
 * @throws {Error} Jika preferensi pekerjaan dengan nama yang sama sudah ada.
 */
async function addJobPreference(nama) {
  const cekData = await ModelJobPreference.findOne({ nama: nama });
  if (cekData) {
    throw new Error('Data sudah ada');
  }
  return await ModelJobPreference.create({
    nama: nama,
  });
}

/**
 * Memperbarui informasi preferensi pekerjaan.
 * @param {string} id - ID preferensi pekerjaan yang akan diperbarui.
 * @param {string} nama - Nama preferensi pekerjaan yang baru.
 * @returns {Promise<object|null>} Objek preferensi pekerjaan yang sudah diperbarui atau null jika gagal.
 */
async function updateJobPreference(id, nama) {
  return await ModelJobPreference.findByIdAndUpdate(
    id,
    {
      nama: nama,
    },
    { new: true }
  );
}


/**
 * Menghapus preferensi pekerjaan berdasarkan ID.
 * @param {string} id - ID preferensi pekerjaan yang akan dihapus.
 * @returns {Promise<object|null>} Objek preferensi pekerjaan yang sudah dihapus atau null jika gagal.
 */
async function deleteJobPreference(id) {
  return await ModelJobPreference.findByIdAndDelete(id);
}

export const ModuleJobPreference = {
  getJobPreference,
  getJobPreferenceById,
  addJobPreference,
  updateJobPreference,
  deleteJobPreference,
};
