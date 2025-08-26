import React,{useState,useEffect} from 'react'
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

    const [selectedOption, setSelectedOption] = useState({ value: 'daily', label: 'Tous les jours/100 FCFA' })

    const urlParams = new URLSearchParams(window.location.search);
  const msisdn = urlParams.get('msisdn');
  let ExtId = urlParams.get('extId') || generateUniqueAlphabetId();

    Cookies.set('extId',ExtId);

    const Ext_params = urlParams.get('extId')



    const options = [
      { value: 'daily', label: 'Tous les jours/100 FCFA' },
      { value: 'weekly', label: 'Hebdomadaire/300 FCFA' },
      { value: 'monthly', label: 'Mensuelle/500 FCFA' },
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


    const checkUser=async()=>{
      try{
        const num = Cookies.get('number')
        if(num.length > 0){
        const res = await axios.post(`${base_url}/checkStatus?msisdn=${num}`)
        if(res.status == 200 || res.status == 201 || res.status == 202 ){
          window.location.href='https://highfivesgames.com/#/?op=orange'

        }
      }
      }
      catch(err){
        console.log(err)
      }
    }
  
    useEffect(()=>{
      checkUser()
    },[])


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





    //  const getScript=async()=> {
    //         setLoading(true);
      
    //         try {
              
    //           const getScript = await axios.get(`${base_url}/api/v1/script?serviceName=HighFive&ext_id=${Ext_params}`)
    //           // const getScriptURL = `${ENDPOINT_URL}?applicationId=193&countryId=207&requestId=${evinaRequestId}`;
    //           console.log("script url--- ", JSON.parse(getScript.data.response).s);
    //           // const response = await axios.get(getScriptURL.data);
      
    //           // if (!response.ok) {
    //           //   throw new Error(
    //           //     `Failed to fetch script: ${response.status} ${response.statusText}`
    //           //   );
    //           // }
      
    //           const scriptContent = await JSON.parse(getScript.data.response).s;
    //           console.log("response----- " + scriptContent);
    //           // setAntiFrauduniqid(scriptContent["AntiFrauduniqid"]);
      
    //           console.log("response " + scriptContent[100]);
      
    //           ExtId =  await getScript.data.t;
      
    //           if (scriptContent) {
    //             let top_head = document.getElementsByTagName("head")[0];
    //             let anti_script = document.createElement("script");
      
    //             anti_script.innerHTML = scriptContent;
    //             top_head.insertBefore(anti_script, top_head.firstChild);
      
    //             var event = new Event("DCBProtectRun");
    //             // console.log(event);
    //             document.dispatchEvent(event);
    //             document.addEventListener("gateway-load", (event) => {
    //               //Enable form submission
    //               // setScriptLoaded(true);
    //               console.log(event, "EVENT LOADED");
    //             });
    //           }
      
    //         } catch (error) {
    //           console.error("Error fetching script", error);
    //         } finally {
    //           setLoading(false);
    //         }
    //       }
      
      
    //       useEffect(()=>{
    //         getScript()
    //       },[])





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
          <p
  onClick={() => navigate('/tnc')}
  className="text-black font-bold text-center mt-4 underline cursor-pointer"
>
  Conditions générales
</p>
   </div>
    </form>
    </div>
    </div>
  )
}

export default Subscribe
