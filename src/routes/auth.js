import express from 'express';
import bcrypt from 'bcrypt';
import { ModuleUserJobSeeker } from '../model/user-job-seeker.js';
import { ModuleUserJobProvider } from '../model/user -job-provider.js';

const RouterAuth = express.Router();

/**
 * Registrasi pengguna baru.
 * @param {object} req - Request body berisi data pengguna yang akan diregistrasi.
 * @param {object} res - Response berisi status, pesan, dan data pengguna baru.
 * @returns {object} - Respon berisi status, pesan, dan data pengguna baru.
 */
RouterAuth.post('/register', async (req, res) => {
  try {
    const data = req.body;

    if (data.role !== 'jobSeeker' && data.role !== 'jobProvider') {
      throw new Error('Peran yang dipilih tidak valid');
    }

    if (
      data.role === 'jobSeeker' &&
      (!data.tempatLahir ||
        !data.tanggalLahir ||
        !data.alamat ||
        !data.pendidikanTerakhir)
    ) {
      throw new Error(
        'Data yang diperlukan untuk jobSeeker belum diisi lengkap'
      );
    }

    let existingUser;

    if (data.role === 'jobSeeker') {
      existingUser = await ModuleUserJobSeeker.getUserByUsername(
        data.namaPengguna
      );
    } else if (data.role === 'jobProvider') {
      existingUser = await ModuleUserJobProvider.getUserByUsername(
        data.namaPengguna
      );
    } else {
      throw new Error('Peran yang dipilih tidak valid');
    }

    if (existingUser) {
      throw new Error('Nama pengguna sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(data.kataSandi, 10);

    let newUser;

    if (data.role === 'jobSeeker') {
      newUser = await ModuleUserJobSeeker.addUser({
        namaPengguna: data.namaPengguna,
        kataSandi: hashedPassword,
        nama: data.nama,
        tempatLahir: data.tempatLahir,
        tanggalLahir: data.tanggalLahir,
        alamat: data.alamat,
        pendidikanTerakhir: data.pendidikanTerakhir,
        preferensiPekerjaan: data.preferensiPekerjaan || [],
        lamaran: data.lamaran || [],
        pengalamanKerja: data.pengalamanKerja || [],
      });
    } else if (data.role === 'jobProvider') {
      newUser = await ModuleUserJobProvider.addUser({
        namaPengguna: data.namaPengguna,
        kataSandi: hashedPassword,
        nama: data.nama,
        pekerjaan: data.pekerjaan || [],
      });
    }

    res.status(201).json({
      status: true,
      message: 'Pendaftaran berhasil',
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

/**
 * Autentikasi pengguna berdasarkan nama pengguna dan kata sandi.
 * @param {object} req - Request body berisi data autentikasi pengguna.
 * @param {object} res - Response berisi status, pesan, dan data pengguna yang berhasil login.
 * @returns {object} - Respon berisi status, pesan, dan data pengguna yang berhasil login.
 */
RouterAuth.post('/login', async (req, res) => {
  try {
    const { namaPengguna, kataSandi, role } = req.body;

    let user;

    if (role === 'jobSeeker') {
      user = await ModuleUserJobSeeker.getUserByUsername(namaPengguna);
    } else if (role === 'jobProvider') {
      user = await ModuleUserJobProvider.getUserByUsername(namaPengguna);
    } else {
      throw new Error('Peran yang dipilih tidak valid');
    }

    if (!user) {
      throw new Error('Nama pengguna tidak ditemukan');
    }

    const passwordMatch = await bcrypt.compare(kataSandi, user.kataSandi);

    if (!passwordMatch) {
      throw new Error('Kata sandi salah');
    }

    res.status(200).json({
      status: true,
      message: 'Berhasil login',
      user: {
        id: user._id,
        namaPengguna: user.namaPengguna,
        role: role,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

/**
 * Memeriksa ketersediaan nama pengguna.
 * @param {object} req - Request query berisi nama pengguna yang akan diperiksa.
 * @param {object} res - Response berisi status, pesan, dan informasi ketersediaan nama pengguna.
 * @returns {object} - Respon berisi status, pesan, dan informasi ketersediaan nama pengguna.
 */
RouterAuth.get('/check-username', async (req, res) => {
  try {
    const { namaPengguna, role } = req.query;

    let user;

    if (role === 'jobSeeker') {
      user = await ModuleUserJobSeeker.getUserByUsername(namaPengguna);
    } else if (role === 'jobProvider') {
      user = await ModuleUserJobProvider.getUserByUsername(namaPengguna);
    } else {
      throw new Error('Peran yang dipilih tidak valid');
    }

    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'Nama pengguna tidak ditemukan',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Nama pengguna tersedia',
      data: user._id,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

/**
 * Mengubah kata sandi pengguna.
 * @param {object} req - Request body berisi id pengguna dan kata sandi baru.
 * @param {object} res - Response berisi status, pesan, dan data pengguna dengan kata sandi baru.
 * @returns {object} - Respon berisi status, pesan, dan data pengguna dengan kata sandi baru.
 */
RouterAuth.patch('/change-password', async (req, res) => {
  try {
    const { password, id, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let updatedUser;

    if (role === 'jobSeeker') {
      updatedUser = await ModuleUserJobSeeker.updateUser(id, {
        kataSandi: hashedPassword,
      });
    } else if (role === 'jobProvider') {
      updatedUser = await ModuleUserJobProvider.updateUser(id, {
        kataSandi: hashedPassword,
      });
    } else {
      throw new Error('Peran yang dipilih tidak valid');
    }

    return res.status(200).json({
      status: true,
      message: 'Kata sandi berhasil diperbarui',
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

export default RouterAuth;
