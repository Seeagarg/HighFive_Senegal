import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookies from 'js-cookie'
import classes from './Subscribe.module.css'
import img_logo from '../Assets/high_logo.png'
import { base_url } from '../Services/api';
import Cookies from "js-cookie";


// mcfunny.madfunny.co.za
// https://madfunny.co.za/DoiRedirect?subscription_id=2123446562&msisdn=27680633950&ext_ref=testing_ref
const Otp = ({serviceName}) => {

    const ani = cookies.get('number')

    const [input1,setInput1] = useState('');
    const [input2,setInput2] = useState('');
    const [input3,setInput3] = useState('');
    const [input4,setInput4] = useState('');
    const [loading,setLoading] = useState(false);

    const urlParams = new URLSearchParams(window.location.search);
    const otpId = urlParams.get('id');
    const [number,setNumber] = useState();

    const navigate = useNavigate()
    const [time,setTime] = useState(60);
    const pack = Cookies.get('pack');
          const extId = Cookies.get('extId')

    

    const handleSubmit=async(e)=>{
      e.preventDefault()
      const otp = input1+input2+input3+input4;
        console.log(otp.length)
        if(otp.length <4){
          toast.warn("Entrez d'abord OTP!!");
          return;
        }

      try{

        // if(otp=='1234'){
        //    window.location.href='https://highfivesgames.com/#/home'
        // }
       
        const res = await axios.post(`${base_url}/matched-otp?pack=${pack}&extId=${extId}&otpId=${otpId}&otp=${otp}`);
        console.log(res.data)
       
        if(res?.status == 200){
          // navigate(`/redirect`)
           window.location.href='https://highfivesgames.com/#/?op=orange'
        }
        else if(res?.status == 402){
          toast.error(res?.data)
        }
        else if(res?.status == 403){
          toast.error(res?.data)
        }
        else{
          toast.error(res?.data)
        }

      }
      catch(err){
        console.log(err)
        toast.error(err?.response?.data)
      }

      handleClear()
    }

    useEffect(() => {
      if (time > 0) {
          const timer = setTimeout(() => setTime(time - 1), 1000);
          return () => clearTimeout(timer);
      }
      else{
        Cookies.remove('extId')
        Cookies.remove('number')
        Cookies.remove('pack')
        navigate(`/subscribe`)
      }

  }, [time]);


    const handleClear=()=>{
        setInput1('');
        setInput2('');
        setInput3('');
        setInput4('');
        
    }

    const handleInputChange = (e, setInput, nextFieldId, prevFieldId) => {
        const { value } = e.target;
        if (/^\d$/.test(value) || value === '') {
          setInput(value);
          if (value && nextFieldId) {
            document.getElementById(nextFieldId).focus();
          }
        }
      };

      const handleKeyDown = (e, prevFieldId) => {
        if (e.key === 'Backspace' && !e.target.value && prevFieldId) {
          document.getElementById(prevFieldId).focus();
        }
      };

      



  return (
    <div className={classes.container}>

    <div className={classes.sub_container}>
    <form onSubmit={handleSubmit} className={classes.form} >
    <img src={img_logo} alt="" />

          <h1 className='text-white text-center  text-2xl font-bold  md:text-4xl  mt-5'>Validation OTP

         
          </h1>
          <p className='text-white text-xl font-semibold mt-1 font-medium '>
          Saisissez l'OTP envoyé à votre numéro de mobile :
          </p>
         <br />
          <div className='flex justify-center  gap-2'>
    <input id="input1" className=' h-10 w-10 outline-none text-center font-sans text-xl text-black rounded-md border border-black bg-white' placeholder="" type="tel" maxlength="1" value={input1} onChange={(e) => handleInputChange(e, setInput1, 'input2', null)}
              onKeyDown={(e) => handleKeyDown(e, null)}/>
    <input id="input2" className='h-10 w-10 outline-none text-center font-sans text-xl text-black rounded-md border border-black bg-white' placeholder="" type="tel" maxlength="1" value={input2} onChange={(e) => handleInputChange(e, setInput2, 'input3', 'input1')}
              onKeyDown={(e) => handleKeyDown(e, 'input1')} />
    <input id="input3" className=' h-10 w-10 outline-none text-center font-sans text-xl text-black rounded-md border border-black bg-white' placeholder="" type="tel" maxlength="1" value={input3} onChange={(e) => handleInputChange(e, setInput3, 'input4', 'input2')}
              onKeyDown={(e) => handleKeyDown(e, 'input2')} />
    <input id="input4" className=' h-10 w-10 outline-none text-center font-sans text-xl text-black rounded-md border border-black bg-white' placeholder="" type="tel" maxlength="1" value={input4} onChange={(e) => handleInputChange(e, setInput4, null, 'input3')}
              onKeyDown={(e) => handleKeyDown(e, 'input3')} />
  </div>
          
<br />
          <button
            disabled={loading}
            type="submit"
            className=" text-white mt-2 w-48 bg-[#0D6EFD] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            {loading ? "Chargement..." : "Valider OTP"}
          </button>
 <p className='text-black font-bold text-xl' >OTP expirera dans {time}</p>
        </form>
      </div>
      <ToastContainer />
     
    </div>

  );
};

export default Otp;
