const mongoose= require("mongoose")
const schema = mongoose.Schema
const bcrypt = require('bcrypt');


const trainerSchema= new schema({
    _id: { 
        type: mongoose.Schema.Types.ObjectId,
        auto: true 
        
        
    },
    firstname: {
        type: String,
        required: true
        
      },
      lastname: {
        type: String,
        required: true
       
      },
      email: {
        type: String,
        required: true,
        unique :true
        
       
      
      },
      phone: {
        type: Number,
        required: true
        
      },
      password: {
        type: String,
        required: true
      },
     
    
      



})
trainerSchema.pre('save' , async function(next){
    const trainer = this;
    if (!trainer.isModified('password')) 
    return next();

    try{
        const salt = await bcrypt.genSalt();
        trainer.password=await bcrypt.hash(trainer.password,salt);
        next();
    } catch (error) {
        return next(error);
      }

    }
);
// Compare the given password with the hashed password in the database
trainerSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const trainer = mongoose.model("trainer", trainerSchema)
module.exports=trainer