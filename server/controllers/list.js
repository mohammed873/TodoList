const List = require('../models/list');

//adding new List
exports.addList = async (req, res) => {
    const list = new List({
      listName: req.body.listName,
      isActive: false ,
    });
    try {
      const newlist = await list.save();
      res.status(200).json({
        message: "list successfully created",
        newlist,
      });
    } catch (error) {
      res.status(500).json({
         error: error
      });
    }
};

//Getting all lists
exports.getAllLists = async (req, res) => {
    try {
      const Lists = await List.find();
        res.status(200).json(Lists);
    } catch (error) {
      res.status(500).json({ error: error });
    }
};

//Getting all completed Lists
exports.getAllCompletedLists = async (req, res) => {
    try {
      const Lists = await List.find({isActive : true});
        res.status(200).json(Lists);
    } catch (error) {
      res.status(500).json({ error: error });
    }
};

//update list Value
exports.editListValue = async (req, res) => {
    try {
        const listDetails  = await List.findById(req.params.id);
        listDetails.listName = req.body.listName;
        const updatedList = await listDetails.save();
        res.status(200).json({ 
            message: "List is updated successfully",
            updatedList
         });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//set list as completed
exports.setListCompleted = async (req, res) => {
    try {
      const listDetails = await List.findById(req.params.id);
      listDetails.isActive = req.body.isActive;
        const updatedListStatus = await listDetails.save();
        res.status(200).json({ 
            message: "list is completed successfully",
            updatedListStatus
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//Deleting list
exports.deleteList = async (req, res) => {
    try{
        await   List.findOneAndDelete({_id :req.params.id});
        res.status(200).json({
            message: "List successfully deleted",
          });
    }catch(error){
        res.status(500).send(error);
    }
}   