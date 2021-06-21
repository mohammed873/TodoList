const Task = require('../models/task');

//adding new Task
exports.addTask = async (req, res) => {
  const task = new Task({
    task: req.body.task,
    isArchieved: false,
    isActive: false ,
  });
  try {
    const newTask = await task.save();
    res.status(200).json({
      message: "Task successfully created",
      newTask,
    });
  } catch (error) {
    res.status(500).json({
       error: error
    });
  }
};


//Getting all Tasks
exports.getAllTasks = async (req, res) => {
    try {
      const Tasks = await Task.find();
        res.status(200).json(Tasks);
    } catch (error) {
      res.status(500).json({ error: error });
    }
};

//Getting all completed tasks
exports.getAllCompletedTasks = async (req, res) => {
    try {
      const Tasks = await Task.find({isActive : true});
        res.status(200).json(Tasks);
    } catch (error) {
      res.status(500).json({ error: error });
    }
};

//Getting all archived tasks
exports.getAllArchievedTasks = async (req, res) => {
  try {
    const Tasks = await Task.find({isArchieved : true});
      res.status(200).json(Tasks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//update task Value
exports.editTaskValue = async (req, res) => {
    try {
        const taskDetails  = await Task.findById(req.params.id);
        taskDetails.task = req.body.task;
        const updatedTask = await taskDetails.save();
        res.status(200).json({ 
            message: "task is updated successfully",
            updatedTask
         });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//set task as completed
exports.setTaskCompleted = async (req, res) => {
    try {
      const taskDetails = await Task.findById(req.params.id);
        taskDetails.isActive = req.body.isActive;
        const updatedTaskStatus = await taskDetails.save();
        res.status(200).json({ 
            message: "task is completed successfully",
            updatedTaskStatus
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//set task as archieved
exports.setTaskArchieved = async (req, res) => {
  try {
      const taskDetails = await Task.findById(req.params.id);
      taskDetails.isArchieved = true;
      const updatedTaskStatus = await taskDetails.save();
      res.status(200).json({ 
          message: "task is archieved successfully",
          updatedTaskStatus
      });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

//Deleting a task
exports.deleteTask = async (req, res) => {
    try{
        await Task.findOneAndDelete({_id :req.params.id});
        res.status(200).json({
            message: "Task successfully deleted",
          });
    }catch(error){
        res.status(500).send(error);
    }
}   