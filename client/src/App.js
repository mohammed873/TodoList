import React, { useState , useEffect} from "react";
import Button from '@material-ui/core/Button';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ToDoList from "./components/todoList"

function App() {
 const [inputValue, setinputValue] = useState("");

  //getting input data (task)
  const changeTitle = (e) =>{
    setinputValue(e.target.value);
  }
  
  //clearing data after adding an admin
   const clearInputs = () => {
    document.querySelector("#task").value = "";
  }
  async function addTask() {
    await axios
      .post("http://localhost:3002/task/addTask", {
        task: inputValue,
      })
      .then((res) => {
        toast.configure();
        toast.success(res.data.message);
        clearInputs()
        window.location.reload()
      })
      .catch((err) => {
        toast.configure();
        toast.error("task must not be empty");
      });
  }

  async function addList() {
    await axios
      .post("http://localhost:3002/list/addList", {
        listName: inputValue,
      })
      .then((res) => {
        toast.configure();
        toast.success(res.data.message);
        clearInputs()
        window.location.reload()
      })
      .catch((err) => {
        toast.configure();
        toast.error("list must not be empty");
      });
  }

  return (
    <div className="App">
      <div style={{width: '50%', margin: 'auto' , display: 'flex'}}>
        <input style={{textAlign: 'center' , width: '55%', border:'2px solid blue'}} id="task"  type="text" placeholder="Enter a Task" onChange={changeTitle} />
        <Button  onClick={addTask} variant="contained" color="primary" style={{marginLeft:'12px'}}>
          Add Task
        </Button>
        <Button  onClick={addList} variant="contained" color="secondary" style={{marginLeft:'12px'}}>
          Add List
        </Button>
      </div>
      <br/>
      <div style={{width: '50%', margin: 'auto'}}>
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
