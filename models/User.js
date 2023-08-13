const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

UserSchema.pre('save', function (next){
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8, (err, hash)=>{
            if(err){
                return next(err);
            }

            this.password = hash;
            next();
        })
    }
})

UserSchema.methods.comparePassword = async function (password){
    if(!password){
        throw new Error('Password is missing, can not compare!');
    }

    try{
        const result = await bcrypt.compare(password, this.password);
        return result;
    }catch(err){
        console.log("Error while comparing password!",err.message);
    }
}

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