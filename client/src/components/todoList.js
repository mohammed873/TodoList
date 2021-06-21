import React, { useState , useEffect} from "react";
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArchiveIcon from '@material-ui/icons/Archive';
import EditIcon from '@material-ui/icons/Edit';




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 640,
    position: 'relative',
    minHeight: 200,
  },
}));

export default function FloatingActionButtonZoom() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = useState(false);
  const [tasks , setTasks] = useState([])
  const [completedTasks , setCompletedTasks] = useState([])
  const [archievedTasks , setArchievedTasks] = useState([])
  const [editMode , setEditMode] = useState(false)
  const [taskEditedValue, setTaskEditedValue] = useState("");
  const [listEditedValue, setListEditedValue] = useState("");

  const [lists , setLists] = useState([])

  //getting input data (edited  task value)
  const changeTitle = (e) =>{
    setTaskEditedValue(e.target.value);
  }

  //getting input data (edited  task value)
  const changeTitleList = (e) =>{
    setListEditedValue(e.target.value);
  }

 //switch btween completed and uncompleted tasks or lists
  const handleChicked = (e) => {
    setChecked(e.target.checked);
   console.log(checked);
  };
  
  //change a task status to be completed
  async function setTaskCompleted(id) {
    await axios
      .patch(`http://localhost:3002/task/setTaskCompleted/${id}`,{
        isActive : checked
      })
      .then((res) => {
        toast.configure();
        if(checked === true){
          toast.success("task is completed successfully");
        }else{
          toast.info("task still not completed");
        }
        
        getAllTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //switch between panels
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

   //switch between panels
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  //get all tasks no matter what their status is
  async function getAllTasks() {
    await axios
      .get("http://localhost:3002/task/getAllTasks")
      .then((res) => {
        setTasks(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //get only completed tasks
  async function getCompletedTasks() {
    await axios
      .get("http://localhost:3002/task/getAllCompltedTasks")
      .then((res) => {
        setCompletedTasks(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //get all tasks that are archieved
  async function getAllArchievedTasks() {
    await axios
      .get("http://localhost:3002/task/getAllArchievedTasks")
      .then((res) => {
        setArchievedTasks(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
 
  //delete a task 
  async function deleteTask(id) {
    await axios
      .delete(`http://localhost:3002/task/deleteTask/${id}`)
      .then((res) => {
        toast.configure();
        toast.error("task is deleted successfully");
        getAllTasks();
        getCompletedTasks();
        getAllArchievedTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // change a task status to be archieved
  async function setTaskArchieved(id) {
    await axios
      .patch(`http://localhost:3002/task/setTaskArchieved/${id}`)
      .then((res) => {
        toast.configure();
        toast.success("task is Archieved successfully");
        getAllTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //update the value of an old task
  async function editTask(id){
    await axios
    .patch(`http://localhost:3002/task/updateTask/${id}`,{
        task : taskEditedValue
    })
    .then((res) => {
      toast.configure();
      toast.success("task is updated successfully");
      getAllTasks();
      getCompletedTasks();
      getAllArchievedTasks();
      setEditMode(false)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //get all lists
  async function getAllLists(){
    await axios
    .get("http://localhost:3002/list/getAlllists")
    .then((res) => {
      setLists(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //change a task list to be completed
  async function setListCompleted(id) {
    await axios
      .patch(`http://localhost:3002/list/setListCompleted/${id}`,{
        isActive : checked
      })
      .then((res) => {
        toast.configure();
        if(checked === true){
          toast.success("List is completed successfully");
        }else{
          toast.info("List still not completed");
        }
        
        getAllLists();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //delete a list 
  async function deleteList(id) {
    await axios
      .delete(`http://localhost:3002/list/deleteList/${id}`)
      .then((res) => {
        toast.configure();
        toast.error("list is deleted successfully");
        getAllLists();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //update the value of an old list
  async function editList(id){
    await axios
    .patch(`http://localhost:3002/list/updateList/${id}`,{
        listName : listEditedValue
    })
    .then((res) => {
      toast.configure();
      toast.success("List is updated successfully");
      getAllLists();
      setEditMode(false)
    })
    .catch((err) => {
        toast.configure();
        toast.error("something went wrong");
    });
  }

  useEffect(() => {
    getAllTasks();
    getCompletedTasks();
    getAllArchievedTasks();
    getAllLists();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="ALL" {...a11yProps(0)} onClick={ getAllTasks} />
          <Tab label="Completed" {...a11yProps(1)} onClick={ getCompletedTasks } />
          <Tab label="Archieve" {...a11yProps(2)}  onClick={ getAllArchievedTasks} />
          <Tab label="List" {...a11yProps(3)}  onClick={ getAllLists} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            {tasks.map((task) => (
                <div style={{display: 'flex'}} key={task._id}>
                 <Checkbox
                    checked={task.isActive}
                    onChange={handleChicked}
                    onClick={() => {setTaskCompleted(task._id)}}
                />
                <IconButton onClick={() => deleteTask(task._id)} aria-label="delete">
                    <DeleteIcon  />
                </IconButton>
                <IconButton onClick={() => setTaskArchieved(task._id)} aria-label="Archieve">
                    <ArchiveIcon  />
                </IconButton>
                  {editMode ? 
                    <div>
                        <input type="text" defaultValue={task.task} onChange={changeTitle} />
                        <IconButton onClick={() => editTask(task._id)} aria-label="Edit" >
                            <EditIcon />
                        </IconButton>
                    </div> : 
                    <div onDoubleClick={() => setEditMode(true)}>
                        <p style={{ textDecoration: task.isActive && 'line-through' , cursor:"pointer"}}>{task.task}</p>
                    </div>   
                  }
                  
                </div>
            ))}
        </TabPanel>


        <TabPanel value={value} index={1} dir={theme.direction}>
            {completedTasks.map((task) => (
                <div style={{display: 'flex'}} key={task._id}>
                 <Checkbox
                    checked={task.isActive}
                    onChange={handleChicked}
                    onClick={() => {setTaskCompleted(task._id)}}
                />
                <IconButton onClick={() => deleteTask(task._id)} aria-label="delete">
                    <DeleteIcon  />
                </IconButton>
                <IconButton onClick={() => setTaskArchieved(task._id)} aria-label="Archieve">
                    <ArchiveIcon  />
                </IconButton>
                {editMode ? 
                    <div>
                        <input type="text" defaultValue={task.task} onChange={changeTitle} />
                        <IconButton onClick={() => editTask(task._id)} aria-label="Edit" >
                            <EditIcon />
                        </IconButton>
                    </div> : 
                    <div onDoubleClick={() => setEditMode(true)}>
                        <p style={{ textDecoration: task.isActive && 'line-through' , cursor:"pointer"}}>{task.task}</p>
                    </div>   
                  }
                </div>
            ))}
        </TabPanel>


        <TabPanel value={value} index={2} dir={theme.direction}>
            {archievedTasks.map((task) => (
                <div style={{display: 'flex'}} key={task._id}>
                 <Checkbox
                    checked={task.isActive}
                    onChange={handleChicked}
                    onClick={() => {setTaskCompleted(task._id)}}
                />
                <IconButton onClick={() => deleteTask(task._id)} aria-label="delete">
                    <DeleteIcon  />
                </IconButton>
                <IconButton onClick={() => setTaskArchieved(task._id)} aria-label="Archieve">
                    <ArchiveIcon  />
                </IconButton>
                 {editMode ? 
                    <div>
                        <input type="text" defaultValue={task.task} onChange={changeTitle} />
                        <IconButton onClick={() => editTask(task._id)} aria-label="Edit" >
                            <EditIcon />
                        </IconButton>
                    </div> : 
                    <div onDoubleClick={() => setEditMode(true)}>
                        <p style={{ textDecoration: task.isActive && 'line-through' , cursor:"pointer"}}>{task.task}</p>
                    </div>   
                  }
                </div>
            ))}
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
            {lists.map((list) => (
                <div style={{display: 'flex'}} key={list._id}>
                 <Checkbox
                    checked={list.isActive}
                    onChange={handleChicked}
                    onClick={() => {setListCompleted(list._id)}}
                />
                <IconButton onClick={() => deleteList(list._id)} aria-label="delete">
                    <DeleteIcon  />
                </IconButton>
                  {editMode ? 
                    <div>
                        <input type="text" defaultValue={list.listName} onChange={changeTitleList} />
                        <IconButton onClick={() => editList(list._id)} aria-label="Edit" >
                            <EditIcon />
                        </IconButton>
                    </div> : 
                    <div onDoubleClick={() => setEditMode(true)}>
                        <p style={{ textDecoration: list.isActive && 'line-through' , cursor:"pointer"}}>{list.listName}</p>
                    </div>   
                  }
                  
                </div>
            ))}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
