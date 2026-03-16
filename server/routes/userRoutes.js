import { Router } from 'express';
import { register, login } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', protect, (req, res) => {
  res.json({ user: req.user });
});

router.put('/profile', protect, (req, res) => {
  res.json({ message: 'Profile updated' });
});

export default router;

