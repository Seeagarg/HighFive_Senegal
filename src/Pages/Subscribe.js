import React,{useState} from 'react'
import classes from './Subscribe.module.css'
import img_logo from '../Assets/high_logo.png'
import Select from 'react-select';
import Cookies from 'js-cookie'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { base_url } from '../Services/api';

const Subscribe = () => {


  function generateUniqueAlphabetId(length = 22) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}


    const [number,setNumber] = useState('');
    const [headersNumber,setHeadersNumber] = useState('');
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState({ value: 'daily', label: 'Tous les jours' })

    const urlParams = new URLSearchParams(window.location.search);
  const msisdn = urlParams.get('msisdn');
  const ExtId = urlParams.get('extId') || generateUniqueAlphabetId();

    Cookies.set('extId',ExtId);



    const options = [
      { value: 'daily', label: 'Tous les jours' },
      { value: 'weekly', label: 'Hebdomadaire' },
      { value: 'monthly', label: 'Mensuelle' },
    ];

    // const handle = async (e) => {
    //     e.preventDefault();
    //     setLoading(true)
    
    //     const data = {
    //       msisdn:number,
    //       packType:selectedOption.value,
    //       extId:ExtId
    //     }
    
    //     try{
    //       const res = await axios.post(`${base_url}/subwithmsisdn`,data);
    //       console.log(res.data);
    
    //       if(res.status == 201 || res.status == 208 || res.status == 200){
    //         toast.success(res.data)
    //         setTimeout(()=>{
    //           // navigate('/home')
    //           window.location.href='https://highfivesgames.com/#/home'
    //         },1000)
            
    //       }
    //       else{
    //         toast.error(res.data)
    //       }
    
    
    //     }
    //     catch(err){
    //       console.log(err,'error------in subscribing')
    //     }
    
    //     Cookies.set('number',number);
    //     setLoading(false)
    
    //     // navigate('/otp-validation')
    //   };


    const handle=async(e)=>{
      e.preventDefault();
      setLoading(true)
      // console.log('handleClicked')
      try{
        // const data = {
        //       msisdn:number,
        //       packType:selectedOption.value,
        //       extId:ExtId
        //     }
  
            Cookies.set('number',number)
            Cookies.set('pack',selectedOption.value)
  
            if(!number){
              toast.warn("Veuillez d'abord entrer le numéro!!")
            }
  
            const res = await axios.post(`${base_url}/send-otp?msisdn=${number}`);
            console.log(res.data);
  
            if(res.status == 200){
              toast.success('OTP envoyé avec succès!!')
              setTimeout(()=>{
                navigate(`/otp-validation?id=${res.data}`)
              },1000)
            }  
      }
      catch(err){
        console.log(err)
        toast.error(err?.response?.data)
      }
      setLoading(false)
    }



  return (
    <div className={classes.container}>
    <ToastContainer/>
    <div className={classes.sub_container}>
    <form onSubmit={handle} className={classes.form} >
    <img src={img_logo} alt="" />
    <div className={classes.welcome}>
    <p className={classes.welcome_text}>Bienvenue à HighFive Games</p>
    <p className={classes.desc}>Jouez à des jeux illimités, profitez-en !!</p>
    </div>
   <div className={classes.inputs}>
   <div className={classes.input}>
    <h1 className='mt-4 text-white text-xl font-bold'>{headersNumber == ''?'Entrez votre numéro':'Votre numéro'}</h1>
          <input type="text" class="bg-gray-50 focus:outline-none text-gray-900 mt-2 text-sm py-3 block w-full p-2.5  dark:border-gray-600  dark:gray-900"

            placeholder='Entrez votre numéro de téléphone : eg 812xxxxxx'
            id="phoneInput"
            name="ani"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required />
            </div>
            <div className={classes.input}>
            <p className='text-white pt-2 text-lg font-semibold'>Type de paquet</p>
          <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        className='w-full'
      />
            </div>

            <button
            disabled={loading}
            type="submit"
            class=" w-full text-white mt-2 bg-[#0D6EFD] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            {loading ? "Chargement..." : "Envoyer OTP"}
          </button>
   </div>
    </form>
    </div>
    </div>
  )
}

export default Subscribe
