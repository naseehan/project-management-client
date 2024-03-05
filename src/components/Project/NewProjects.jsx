import axios from "axios";
import React, { useEffect, useState } from "react";

const NewProjects = ({ data, setRetrievedProjects }) => {
  // const handleRemoveProject = (_id) => {
  //     setRetrievedProjects((prevRetrievedProjects) =>
  //     prevRetrievedProjects.filter((project) => project._id !== _id)
  //     )
  // }


  const [editProject, setEditProject] = useState(false);
  const [name, setName] = useState("")
  const [members, setMembers] = useState("");
  const [date, setDate] = useState("");
  const [currentId, setCurrentId] = useState("")
  const [success, setSuccess] = useState(false);

  const handleEditProject = (id) => {
    setEditProject(!editProject);
    console.log(id);
    setCurrentId(id._id);
    setName(id.name);
    setMembers(id.members);
    setDate(id.date);
    };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleMembers = (e) => {
    setMembers(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };

  
// delete project
  const handleRemoveProject = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/projects/${_id}`, {
        data: {
          _id: _id,
        },
      });
      setRetrievedProjects((prevRetrievedProjects) =>
        prevRetrievedProjects.filter((project) => project._id !== _id)
      );
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // edit project
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/projects/${currentId}`, {
        name,
        members,
        date,
      });
      console.log(currentId);
      // Update the frontend state to reflect the changes
      setRetrievedProjects((prevRetrievedProjects) =>
        prevRetrievedProjects.map((project) => {
          if (project._id === data._id) {
            return { ...project, name };
          }
          return project;
        })
      );
      setName("");
      setMembers("");
      setDate("");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad with '0'
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;
// {data.map((data) => {
//   // Call the handleDaysLeft function to calculate the days left
//   const daysLeft = handleDaysLeft(data.date);

  return (
    <>
      <div
        onClick={() => handleEditProject(data)}
        className={`task-overlay ${editProject ? "active-task" : ""}`}
      ></div>

      
{data.map((data) => (

// const daysLeft = handleDaysLeft(data.date);

        <div className="projects-box" key={data._id}>
          <div className="heading">
            <h3>{data.name}</h3>
            <div className="del-create">
              <button
                className="fa-solid fa-pen-to-square"
                onClick={() => handleEditProject(data)}
              ></button>
              <button
                className="fa-solid fa-trash"
                onClick={() => handleRemoveProject(data._id)}
              ></button>
            </div>
          </div>

          <div className="project-details">
            <div className="each-details">
              <i className="fa-solid fa-paperclip"></i>
              <p>5 Attach</p>
            </div>
            <div className="each-details">
              <i class="fa-solid fa-hourglass-start"></i>
              <p>3 Months</p>
            </div>
            <div className="each-details">
              <i class="fa-solid fa-user-group"></i>
              <p>{data.members} Members</p>
            </div>
            <div className="each-details">
              <i className="fa-solid fa-message"></i>
              <p>7 </p>
            </div>
          </div>

          <div className="progress">
            <span>Progress</span>
            {/* <p>{data.date - formattedDate} days left</p> */}
            <p>{Math.ceil((new Date(data.date) - new Date(formattedDate)) / (1000 * 60 * 60 * 24)) <0 ? "Completed" : Math.ceil((new Date(data.date) - new Date(formattedDate)) / (1000 * 60 * 60 * 24)) + " days left"} </p>

          </div>
        </div>
     
    ))}
      {/* edit project window */}
      <div className={`task-window ${editProject ? "active-task" : ""}`}>
        <div className="active-task-heading">
          <h3>Edit Project</h3>
          <i
            class="fa-solid fa-x"
            onClick={() => handleEditProject(data._id)}
          ></i>
        </div>
        <div className="active-task-details">
          <form action="" onSubmit={handleSubmit}>

          <div className={`success-message ${success ? "active-success" : ""}`}>
            <p>Project edited successfully</p>
          </div>

            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleName}
            />
            {/* <label htmlFor="attatch">Attatchments</label>
            <input type="number" name="attatch" id="attatch"/> */}
            <label htmlFor="Period">Project Period</label>
            <input
              type="date"
              name="Period"
              id="Period"
              value={date}
              onChange={handleDate}
            />
            <label htmlFor="desc">Members Needed</label>
            <input
              type="number"
              name="members"
              id="members"
              value={members}
              onChange={handleMembers}
            />
            <button type="submit">Submit</button>
            
          </form>
       
        </div>
        </div>
        
        
    </>
  
  );
}

export default NewProjects;
