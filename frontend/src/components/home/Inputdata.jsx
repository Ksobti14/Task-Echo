import React, { useEffect, useState } from 'react';
import { ImCross } from "react-icons/im";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inputdata = ({ inputdiv, setinputdiv, updateddata, setupdateddata }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    setData({ title: updateddata.title || "", desc: updateddata.desc || "" });
  }, [updateddata]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const clearForm = () => {
    setData({ title: "", desc: "" });
    setinputdiv("hidden");
    setupdateddata({ id: "", title: "", desc: "" });
  };

  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      toast.error("All fields are required!");
      return;
    }

    try {
      await axios.post("https://taskecho-app.onrender.com/api/v2/createtask", Data, { headers });
      clearForm();
      toast.success("Task created successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task. Please try again.");
    }
  };

  const updateTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      toast.error("All fields are required!");
      return;
    }

    try {
      await axios.put(`https://taskecho-app.onrender.com/api/v2/updatetasks/${updateddata.id}`, Data, { headers });
      clearForm();
      toast.success("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  };

  return (
    <>
      <div className={`${inputdiv} fixed top-0 left-0 bg-gray-700 opacity-50 h-screen w-full`}></div>
      <div className={`${inputdiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className='w-3/6 bg-gray-900 p-4 rounded'>
          <div className='text-2xl flex justify-end'>
            <button onClick={clearForm}>
              <ImCross />
            </button>
          </div>
          <input
            type="text"
            placeholder='Title'
            name="title"
            className='p-2 rounded w-full bg-gray-700 my-3'
            value={Data.title}
            onChange={handleChange}
          />
          <textarea
            name="desc"
            cols="30"
            rows="10"
            className='p-2 rounded w-full bg-gray-700 my-3'
            placeholder='Description'
            value={Data.desc}
            onChange={handleChange}
          />
          {updateddata.id === "" ? (
            <button className='px-3 py-2 bg-blue-400 rounded font-bold' onClick={submitData}>
              Submit
            </button>
          ) : (
            <button className='px-3 py-2 bg-blue-400 rounded font-bold' onClick={updateTask}>
              Update
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Inputdata;
