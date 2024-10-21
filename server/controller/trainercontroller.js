const trainercollection = require('../models/trainer')


exports.createtrainer = async (req,res)=> {

    try {
        const trainer = await trainercollection.create (req.body)
        return res.status(201).send(trainer);
        

    } catch (error){
        res.status(400).send(error.message);
    }


};
exports.gettrainer = async (req, res) => {
    try {
        const trainer = await trainercollection.findById(req.params.id, req.body, { new: true, runValidators: true });
        if (!trainer) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(trainer);
        console.log(trainer)
    } catch (error) {
        res.status(400).send(error.message);
    }
};


exports.deletetrainer = async (req,res)=> {

    try {
        const trainer = await trainercollection.findByIdAndDelete (req.params.id)
        if (!trainer){
            res.status(400).send("Trainer not found ")
        }
        res.status(204).send()

    } catch (error){
        res.status(500).send(error.message);
    }


};


exports.updatetrainer = async (req, res) => {
    try {

        const trainer = await trainercollection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!trainer) {
            return res.status(404).send('trainer not found');
        }
        res.status(200).send(trainer);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


 exports.getalltrainers =async (req, res ) =>{
    try {
        const trainer = await trainercollection.find({});
        if (!trainer) {
            return res.status("No trainer found ")
        }
        res.status(200).send(trainer)
    } catch(error){
        res.status(400).send(error.message)
    }

    
 };