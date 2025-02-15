import React,{useEffect,useState} from 'react'
import Cards from '../components/home/Cards'
import axios from 'axios';
const Completed = () => {
  const [Data,setData]=useState();
  const headers={id:localStorage.getItem("id"),authorization: `Bearer ${localStorage.getItem("token")}`}
  useEffect(()=>{
    const fetch=async()=>{
      const response=await axios.get('https://taskecho-app.onrender.com/api/v2/getcomptasks',{headers});
      setData(response.data.data);
    };
    fetch();
  },);
  return (
    <div>
      <Cards home={"false"} data={Data}/>
    </div>
  )
}

export default Completed
