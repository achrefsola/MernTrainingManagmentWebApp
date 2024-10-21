const mongoose= require("mongoose");

const schema = mongoose.Schema


const userSchema= new schema({

    _id: { 
        type: mongoose.Schema.Types.ObjectId,
        auto: true 
        
        
    },
    trainingname: {
        type: String,
        required: true,
        unique : true
        
      },
     trainername: {
        type: String,
        required: true
       
      },
      info: {
        type: String,
       
        
      },
      users: [{
        type: schema.Types.ObjectId,
        ref: 'user'
    }]
      
    

});

  
const trainig = mongoose.model("training", userSchema)
module.exports=trainig