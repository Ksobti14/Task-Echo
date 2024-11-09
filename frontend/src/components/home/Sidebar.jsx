import React, { useEffect, useState } from 'react';
import { FaTasks } from "react-icons/fa";
import { MdOutlineNotificationImportant, MdIncompleteCircle } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Data, setData] = useState();
  const menuItems = [
    { title: "All Tasks", icon: <FaTasks />, link: '/' },
    { title: "Important Tasks", icon: <MdOutlineNotificationImportant />, link: '/importantTasks' },
    { title: "Completed Tasks", icon: <IoMdDoneAll />, link: '/completedTasks' },
    { title: "Incompleted Tasks", icon: <MdIncompleteCircle />, link: '/incompletedTasks' }
  ];

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    navigate('/signup');
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://taskecho-app.onrender.com/api/v2/getalltasks', { headers });
        setData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    if (localStorage.getItem('id') && localStorage.getItem('token')) {
      fetchData();
    }
  }, []);

  return (
    <div className='p-4 h-screen shadow-lg flex flex-col justify-between'
         style={{ background: 'linear-gradient(135deg, #1E3A8A, #9333EA)' }}>
      {Data && (
        <div className='mb-6 text-white'>
          <h2 className='text-2xl font-bold mb-1'>{Data.username}</h2>
          <h4 className='text-indigo-300 mb-2'>{Data.email}</h4>
          <hr className='border-gray-600'/>
        </div>
      )}
      <div className='space-y-3 mb-6'>
        {menuItems.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className='flex items-center text-lg p-3 rounded-lg transition duration-300 
                       bg-gray-800/50 hover:bg-indigo-600 hover:text-white shadow-md'
          >
            <span className='mr-3 text-xl text-indigo-300'>{item.icon}</span>
            <span className='text-indigo-200'>{item.title}</span>
          </Link>
        ))}
      </div>
      <button
        className='bg-red-600 hover:bg-red-700 transition duration-300 text-lg font-semibold py-2 
                   rounded-lg w-full mt-4 shadow-lg text-white'
        onClick={logout}
      >
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
