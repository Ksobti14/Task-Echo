import React, { useState ,useEffect} from 'react'
import Cards from '../components/home/Cards'
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';
import Inputdata from '../components/home/Inputdata';
const Alltasks = () => {
  const [inputdiv,setinputdiv]=useState('hidden');
  const [Data,setData]=useState();
  const [updateddata,setupdateddata]=useState({id:"",title:"",desc:""})
  const headers={id:localStorage.getItem("id"),authorization: `Bearer ${localStorage.getItem("token")}`}
  useEffect(()=>{
    const fetch=async()=>{
      const response=await axios.get('https://taskecho-app.onrender.com/api/v2/getalltasks',{headers});
      setData(response.data.data);
    };
    if(localStorage.getItem('id')&& localStorage.getItem('token')){
    fetch();
    }
  },);

  return (
    <>
    <div>
      <div className='w-full flex justify-end px-4 py-2 text-4xl'>
       <button onClick={()=>setinputdiv("fixed")}><IoIosAddCircle className='text-gray-300 hover:text-gray-100 transition-all duration-300'/></button>
      </div>
      {Data &&(<Cards home={"true"} setinputdiv={setinputdiv} data={Data.tasks} setupdateddata={setupdateddata}/>)}
    </div>
    <Inputdata inputdiv={inputdiv} setinputdiv={setinputdiv} updateddata={updateddata} setupdateddata={setupdateddata}/>
    </>
  )
}

export default Alltasks
