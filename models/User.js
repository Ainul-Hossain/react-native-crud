const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: Buffer
    }
})

UserSchema.statics.isThisEmailInUse = async function (email){

    if(!email){
        throw new Error('Invalid Email!');
    }

    try{
        const user = await this.findOne({email: email});

        if(user){
            return false;
        }
    
        return true;
    }catch(err){
        console.log(err.message);
        return false;
    }
}

module.exports = mongoose.model('User', UserSchema);