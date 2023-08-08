const router = require('express').Router();

const User = require('../models/User');

// POST - Create New User
router.post('/create-user', async (req, res) => {
    const isNewUser = await User.isThisEmailInUse('ainulsakibs3@gmail.com');

    if(!isNewUser){
        return res.json({success: false, message: 'Email is already in use.'})
    } 

    const user = await User({ fullName: 'Ainul Arif', email: 'ainulsakibs3@gmail.com', password: '123' });

    await user.save();

    res.json(user);
})

module.exports = router;