const { User } = require('../../models');
const router = require('express').Router();

// Signup for new users
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    req.session.isLoggedIn = true;
    req.session.userId = user.id;
    req.session.save(() => {
      res.json({ id: user.id, success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Login existing user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found.');
    }
    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }
    req.session.isLoggedIn = true;
    req.session.userId = user.id;
    req.session.save(() => {
      res.json({ id: user.id, success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid username or password.' });
  }
});

// Logout current user
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.end();
  });
});

module.exports = router;
