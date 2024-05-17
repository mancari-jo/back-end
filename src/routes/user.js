import express, { Router } from 'express';
import { ModuleUserJobSeeker } from '../model/user-job-seeker.js';
import { ModuleUserJobProvider } from '../model/user -job-provider.js';

const RouterUser = express.Router();

RouterUser.get('/', async (req, res) => {
  try {
    const userJobProvider = await ModuleUserJobProvider.getAllUsers();
    const userJobSeeker = await ModuleUserJobSeeker.getAllUsers();

    const users = [...userJobProvider, ...userJobSeeker];

    res.status(200).json({
      status: true,
      message: 'Sukses mendapatkan semua user',
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

/**
 * Mendapatkan informasi pengguna berdasarkan ID.
 * @param {string} id - ID pengguna.
 * @returns {object} - Objek informasi pengguna.
 */
RouterUser.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const user = await CheckUserById(id);

    if (!user) {
      res.status(404).json({
        status: false,
        message: 'User tidak ditemukan',
      });
    }

    res.status(200).json({
      status: true,
      message: 'Sukses mendapatkan user',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

/**
 * Memperbarui informasi pengguna berdasarkan ID.
 * @param {string} id - ID pengguna.
 * @param {object} data - Data yang akan diperbarui pada pengguna.
 * @returns {object} - Objek informasi pengguna yang telah diperbarui.
 */
RouterUser.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const user = await CheckUserById(id);

    if (!user) {
      res.status(404).json({
        status: false,
        message: 'User tidak ditemukan',
      });
    }

    let updatedUser;

    if (user.role === 'jobSeeker') {
      updatedUser = await ModuleUserJobSeeker.updateUser(id, data);
    } else if (user.role === 'jobProvider') {
      updatedUser = await ModuleUserJobProvider.updateUser(id, data);
    }

    res.status(200).json({
      status: true,
      message: 'Sukses mengupdate user',
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

export default RouterUser;

/**
 * Memeriksa keberadaan pengguna berdasarkan ID.
 * @param {string} id - ID pengguna.
 * @returns {object} - Objek informasi pengguna.
 */
async function CheckUserById(id) {
  let user;
  user =
    (await ModuleUserJobSeeker.getUSerById(id)) ||
    (await ModuleUserJobProvider.getUSerById(id));
  return user;
}
