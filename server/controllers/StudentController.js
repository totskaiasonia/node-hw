import StudentModel from '../models/Student.js';


export const getAll = async (req, res) => {
    try {
        const limit = req.query.limit ? Number.parseInt(req.query.limit) : 0;
        const skip = req.query.offset ? Number.parseInt(req.query.offset) : 0;
        
        const sort = {};
        if (req.query.sortBy == "group" || req.query.sortBy == "rate")
            sort[req.query.sortBy] = 1;

        console.log(skip, limit, sort);
        const result = await StudentModel.find({}, null, {sort, skip, limit}).exec();

        console.log(result);
        res.status(200).json({students: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error"});
    }
};

export const create = async (req, res) => {
    try {
        const newStudent = new StudentModel({
            firstname: req.query.firstname,
            lastname: req.query.lastname,
            group: req.query.group,
            rate: req.query.rate
        });
        await newStudent.save();
        res.status(200).json({student: newStudent});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to add student"});
    }
};

export const getById = async (req, res) => {
    try {
        const result = await StudentModel.findById(req.params.id);
        res.status(200).json({student: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to find student"});
    }
};

export const changeDataById = async (req, res) => {
    try {
        const student = await StudentModel.findById(req.params.id);
        const updatedStudent = await StudentModel.findByIdAndUpdate(req.params.id, {
            firstname: req.query.firstname,
            lastname: req.query.lastname,
            group: req.query.group ? req.query.group : student.group,
            rate: req.query.rate ? req.query.rate : student.rate
        }, {new: true});
        res.status(200).json({student: updatedStudent});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to edit data"});
    }
};

export const deleteById = async (req, res) => {
    try {
        const deletedStudent = await StudentModel.findByIdAndDelete(req.params.id);
        res.status(200).json({student: deletedStudent});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to delete student"});
    }
};