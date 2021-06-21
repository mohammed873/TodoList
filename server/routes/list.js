const express = require("express");
const router = express.Router();
const {
    getAllLists,
    getAllCompletedLists,
    deleteList ,
    editListValue , 
    setListCompleted , 
    addList,
} = require("../controllers/list");

router.get("/getAllLists", getAllLists);
router.get("/getAllCompletedLists", getAllCompletedLists);
router.post("/addList", addList);
router.delete("/deleteList/:id", deleteList);
router.patch("/updateList/:id" , editListValue);
router.patch("/setListCompleted/:id", setListCompleted);

module.exports = router;
