import express from 'express';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { filter } = req.query;
    const where = filter === 'completed' 
      ? { completed: true }
      : filter === 'pending'
      ? { completed: false }
      : {};

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required' });
    }

    const task = await prisma.task.create({
      data: { title: title.trim() }
    });
    res.status(201).json(task);
  } catch (error) {
    console.error('Create error:', error);
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const data = {};
    if (title !== undefined) data.title = title.trim();
    if (completed !== undefined) data.completed = completed;

    const task = await prisma.task.update({
      where: { id },
      data
    });
    res.json(task);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update task', details: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({ where: { id } });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete task', details: error.message });
  }
});

export default router;
