const router = require('express').Router();
const User = require('../models/User');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user');

// POST - Create New User
router.post('/create-user', validateUserSignUp, userValidation, async (req, res) => {
    const { fullName, email, password } = req.body;

    const isNewUser = await User.isThisEmailInUse(email);

    if (!isNewUser) {
        return res.json({ success: false, message: 'Email is already in use.' })
    }

    const user = await User({ fullName: fullName, email: email, password: password });

    await user.save();

    res.json(user);
})

// POST - User Sign-In

router.post('/sign-in', validateUserSignIn, userValidation, async (req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if(!user){
        return res.json({success: false, message: 'User not found with the given email!'})
    }

    const isMatchPassword = await user.comparePassword(password);

    if(!isMatchPassword){
        return res.json({success: false, message: 'Email/Password does not match!'});
    }

    res.json({success: true, user: user});
})

module.exports = router;