const express = require('express');
const router = express.Router();
const { Profile } = require('./models'); 

router.post('/profiles', async (req, res) => {
  try {
    const { name, location, about, bio } = req.body;
    const newProfile = await Profile.create({ name, location, about, bio });
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;