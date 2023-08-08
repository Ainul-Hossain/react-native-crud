const router = require('express').Router();

const User = require('../models/User');

// POST - Create New User
router.post('/create-user', async (req, res) => {
    const user = await User({ fullName: 'Ainul Sakib', email: 'ainulsakibs2@gmail.com', password: '123' });

    await user.save();

    res.send(user);
})

module.exports = router;