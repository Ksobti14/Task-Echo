import React, { useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { FaEdit, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';

const Cards = ({ home, setinputdiv, data, setupdateddata }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  const handlecomptask = async (id) => {
    try {
      await axios.put(`https://taskecho-app.onrender.com/api/v2/updatecomptasks/${id}`, {}, { headers });
    } catch (error) {
      console.log(error);
    }
  };

  const handleimp = async (id) => {
    try {
      await axios.put(`https://taskecho-app.onrender.com/api/v2/updateimptasks/${id}`, {}, { headers });
    } catch (error) {
      console.log(error);
    }
  };

  const deletetask = async (id) => {
    try {
      await axios.delete(`https://taskecho-app.onrender.com/api/v2/deletetasks/${id}`, { headers });
    } catch (error) {
      console.log(error);
    }
  };

  const handleupdate = (id, title, desc) => {
    setinputdiv("fixed");
    setupdateddata({ id, title, desc });
  };

  return (
    <div className='grid grid-cols-4 gap-6 p-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900'>
      {data && data.map((items, i) => (
        <div 
          key={i} 
          className='flex flex-col justify-between border bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl p-4 shadow-lg transition-transform transform hover:scale-105'>
          <div>
            <h3 className='text-xl font-semibold text-white mb-2'>{items.title}</h3>
            <p className='text-gray-300 mb-3'>{items.desc}</p>
          </div>
          <div className='flex items-center mt-4'>
            <button 
              className={`${items.complete ? "bg-green-600" : "bg-red-500"} p-2 rounded-lg text-white w-1/2 text-center transition duration-300 hover:bg-opacity-90`}
              onClick={() => handlecomptask(items._id)}
            >
              {items.complete ? "Completed" : "Incompleted"}
            </button>
            <div className='flex justify-around w-1/2 text-2xl text-white'>
              <button onClick={() => handleimp(items._id)}>
                {items.important ? <FaHeart className='text-red-500' /> : <CiHeart />}
              </button>
              {home !== "false" && (
                <button onClick={() => handleupdate(items._id, items.title, items.desc)}>
                  <FaEdit className='text-indigo-300 hover:text-indigo-400 transition duration-300' />
                </button>
              )}
              <button onClick={() => deletetask(items._id)}>
                <MdDelete className='text-red-400 hover:text-red-500 transition duration-300' />
              </button>
            </div>
          </div>
        </div>
      ))}
      {home === "true" && (
        <button 
          className='flex flex-col justify-center items-center border bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 transition-all duration-300'
          onClick={() => setinputdiv("fixed")}
        >
          <IoIosAddCircle className='text-5xl text-gray-200 mb-2' />
          <h2 className='text-2xl text-gray-200'>Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
