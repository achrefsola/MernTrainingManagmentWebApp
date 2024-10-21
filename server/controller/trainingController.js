const trainingcollection = require('../models/training')



exports.createtraining = async (req,res)=> {
    const { trainingname, trainername, info } = req.body;
    
    try {
        const existingtrainingname=await trainingcollection.findOne({trainername})
        if (existingtrainingname){
            res.status(400).json({message: "training already exists"})
        }
        const training = await trainingcollection.create (req.body)
        return res.status(201).send(training);
        

    } catch (error){
        res.status(400).send(error.message);
    }


};
exports.gettraining = async (req, res) => {
    try {
        const training = await trainingcollection.findById(req.params.id, req.body, { new: true, runValidators: true });
        if (!training) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(training);
        console.log(training)
    } catch (error) {
        res.status(400).send(error.message);
    }
};


exports.deletetraining = async (req,res)=> {

    try {
        const training = await trainingcollection.findByIdAndDelete (req.params.id)
        if (!training){
            res.status(400).send("training not found ")
        }
        res.status(200).json({success:true,message:"training deleted successfully"})

    } catch (error){
        res.status(500).send(error.message);
    }


};


exports.updatetraining = async (req, res) => {
    try {
        const training = await trainingcollection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!training) {
            return res.status(404).send('training not found');
        }
        res.status(200).send(training);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


 exports.getalltrainings =async (req, res ) =>{
    try {
        const training = await trainingcollection.find({});
        if (!training) {
            return res.status("No training found ")
        }
        res.status(200).send(training)
    } catch(error){
        res.status(400).send(error.message)
    }

    
 };
 exports.assignuser = async (req, res) => {
    const { userId, trainingId } = req.body;
    if (!userId){
        console.log('user is null ')
        return
    }

    try {
      
        const training = await trainingcollection.findByIdAndUpdate(
            trainingId,
            { $addToSet: { users: userId } },
            { new: true }
        );

        console.log('Training document updated:', training);
        res.status(200).json({ message: 'User assigned to training successfully', training });
    } catch (error) {
        console.error('Error updating training document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
