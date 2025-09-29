import express from 'express';
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/tasksController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// 🔹 Tất cả route đều yêu cầu đăng nhập
router.use(protect);

router.get('/', getAllTasks);

router.post('/', createTask);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

export default router;
