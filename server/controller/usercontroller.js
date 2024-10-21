 const usercollection = require('../models/users');
 const trainercollection = require ('../models/trainer')


const jwt = require('jsonwebtoken');
exports.createuser = async (req , res) =>{
    try {
        const user = await usercollection.create(req.body);
        res.status(201).send(user);
        console.log("user created ",user)

    }
    catch(error){
        res.status(400).send(error.message);
        console.log("creation error")
    }
};

exports.deleteuser= async(req ,res)=>{
    try {
        const user =await usercollection.findByIdAndDelete(req.params.id);
        if (!user){
            return res.status(400).send("user not found ")
        }
        res.status(204).send()

    } catch(error){
        res.status(500).send("error.message")
    }
    
};
// UserController.js




exports.getUserEmailsByIds = async (req, res) => {
    try {
      const { userIds } = req.body;
  
     
      const users = await usercollection.find({ _id: { $in: userIds } });
  
      
      const userEmails = users.reduce((acc, user) => {
        acc[user._id] = user.email;
        return acc;
      }, {});
  
      res.json(userEmails);
    } catch (error) {
      console.error('Error fetching user emails:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };




exports.updateUser = async (req, res) => {
    try {
        const user = await usercollection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
        console.log(user)
    } catch (error) {
        res.status(400).send(error.message);
    }
};


exports.getuser = async (req, res) => {
    try {
        const user = await usercollection.findById(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


 exports.getallusers =async (req, res ) =>{
    try {
        const user = await usercollection.find({});
        if (!user) {
            return res.status("No user found ")
        }
        res.status(200).send(user)
    } catch(error){
        res.status(400).send(error.message)
    }

    
 };







exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await  usercollection.findOne({ email });
    const trainer = await  trainercollection.findOne({ email });
    if (!user && ! trainer) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    let authenticatedUser;
    if (user) {
      authenticatedUser = user;
      console.log("this is a user",user)
    } else {
      authenticatedUser = trainer;
      console.log("this is a trainer",trainer)
    }
    const passwordMatch = await authenticatedUser.comparePassword(password);
    if (!passwordMatch ) {
      return res.status(401).json({ message: 'Incorrect password' });   
    }
    
    const token = jwt.sign({ userId: authenticatedUser._id }, process.env.SECRET_KEY, {
      expiresIn: '30s'
    });
    res.json({
        token: token,
        user: { _id: authenticatedUser._id } ,
        role: trainer ? 'trainer' : 'user'
      });
   
    
    
  } catch (error) {
    next(error);
  }


};




