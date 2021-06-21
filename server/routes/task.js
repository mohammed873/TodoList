const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    addTask,
    getAllCompletedTasks ,
    deleteTask , 
    editTaskValue , 
    setTaskCompleted,
    getAllArchievedTasks,
    setTaskArchieved
} = require("../controllers/Task");

router.get("/getALLTasks", getAllTasks);
router.get("/getAllCompltedTasks", getAllCompletedTasks);
router.get("/getAllArchievedTasks", getAllArchievedTasks);
router.post("/addTask", addTask);
router.delete("/deleteTask/:id", deleteTask);
router.patch("/updateTask/:id" , editTaskValue);
router.patch("/setTaskCompleted/:id", setTaskCompleted);
router.patch("/setTaskArchieved/:id", setTaskArchieved);

module.exports = router;
