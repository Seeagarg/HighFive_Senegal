import React,{useEffect} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { base_url } from '../Services/api';

const Home = () => {

    const number = Cookies.get('number')
  const ExtId = Cookies.get('extId')

  const navigate = useNavigate()

  useEffect(() => {
    const getHeaders=async()=>{
      try{
        const res = await axios.get(`${base_url}/get-header?alias=${number}&extId=${ExtId}`);
        console.log(res?.status,'rspojse')
        if(res?.status == 200 || res?.status == 201 ){
            // navigate('/home')
            window.location.href = 'https://highfivesgames.com/#/?op=orange'
        }
      }
      catch(err){
        if(err.response?.status == 403 || err.response?.status == 402 ){
          console.log(err,'error')
          toast.error('Charging Failed Due to Insufficient Balance!!')
          setTimeout(()=>{
            navigate('/subscribe');
          },1000)
        }
        else if(err.response?.status == 404){
          navigate(`/header?msisdn=${number}&extId=${ExtId}`)
        }
       
      }
    }

    getHeaders();

  }, []);




  return (
    <div>
    Home  
    <ToastContainer/>
    </div>
  )
}

export default Home
