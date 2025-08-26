import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from '../Assets/high_logo.png'
import Select from 'react-select';
import { base_url } from '../Services/api';
import Cookies from 'js-cookie'
import Lottie from 'lottie-react'
import loader from '../Animations/loader.json'


const DailySub = () => {

    const navigate = useNavigate();
    const [show,setShow] = useState(false);

    const [selectedOption, setSelectedOption] = useState({ value: 'daily', label: 'Tous les jours' })
    const [loading,setLoading] = useState(false)

    // const number = Cookies.get('number')
    

    const urlParams = new URLSearchParams(window.location.search);
    const msisdn = urlParams.get('msisdn');
    const ExtId = urlParams.get('extId');

    Cookies.set('number',msisdn);
    Cookies.set('extId',ExtId)

    console.log(msisdn)
   


    const options = [
        { value: 'daily', label: 'Tous les jours' },
        // { value: 'weekly', label: 'Hebdomadaire' },
        // { value: 'monthly', label: 'Mensuelle' },
      ];

      const customStyles = {
        control: (provided, state) => ({
          ...provided,
          borderColor: state.isFocused ? 'rgb(234 88 12)' : 'gray', // Change border color here
          boxShadow: state.isFocused ? '0 0 0 1px rgb(234 88 12)' : 'none', // Optional: Add box shadow
          '&:hover': {
            borderColor: state.isFocused ? 'rgb(234 88 12)' : 'gray', // Change border color on hover
          },
        
        }),
        // You can customize other parts of the select component as well
      };


      const handle = async (e) => {
         if (e) e.preventDefault(); 
        setLoading(true)
    
        const data = {
          msisdn:msisdn,
          packType:selectedOption.value,
          extId:ExtId
        }
    
        try{
          const res = await axios.post(`${base_url}/subwithmsisdn`,data);
          console.log(res.data);
    
          if(res.status == 201 || res.status == 208 || res.status == 200){
            toast.success(res.data)
            setTimeout(()=>{
              // navigate('/home')
              window.location.href='https://highfivesgames.com/#/?op=orange'
            },1000)
            
          }
          else{
            toast.error(res.data)
          }
    
    
        }
        catch(err){
          console.log(err,'error------in subscribing')
        }
    
        Cookies.set('number',msisdn);
        setLoading(false)
    
        // navigate('/otp-validation')
      };

      

    

    Cookies.set('number',msisdn);
  Cookies.set('extId',ExtId)

    useEffect(() => {
        const getHeaders=async()=>{
          try{
            const res = await axios.get(`${base_url}/get-header?alias=${msisdn}&extId=${ExtId}`);
            console.log(res?.status,'rspojse')
            if(res?.status == 200 || res?.status == 201 || res?.status == 202 ){
                // navigate('/home')
                window.location.href='https://highfivesgames.com/#/?op=orange'
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
              setShow(true);
            }
            else{
                toast.error(err.response.data)
              navigate('/subscribe')
            }
          }
        }

        getHeaders();

      }, []);


      useEffect(()=>{
        setTimeout(() => {
            if(msisdn) handle();
        }, 8000);
      })



  return (
    <div className="fixed inset-0 overflow-y-auto bg-black/90 flex justify-center items-center z-10">
    {
      show ? 
      <>
      <div className="container mx-auto max-w-screen-sm bg-white rounded-md p-4 md:p-8 flex flex-col items-center shadow-lg relative">
      <img
        src={img}
        alt="/"
        className="w-24 h-auto mb-4 md:mb-0 md:w-[200px]"
      />
      <form className="flex flex-col w-full md:w-2/3 px-4 py-4 md:py-8">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
           
              
          Sélectionnez le
 
           
            <span className="text-orange-600 font-bold text-2xl md:text-3xl px-2">
            Type de paquet
            </span>
          </h1>
        </div>
        {/* <br /> */}
        <p className='py-2 pt-4 text-lg font-semibold'>Type de paquet</p>
        <Select
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={options}
      styles={customStyles}
    />
        {/* {error && <p className="text-red-600 text-center mt-2">{error}</p>} */}
        <div className="flex mt-4 md:mt-6">
          <button
            onClick={handle}
            type='submit'
            className="w-full bg-orange-600 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Soumission..." : "Soumettre"}
          </button>
        </div>
      </form>
    </div>
    <ToastContainer/>
      </>
      :
      <>
        <Lottie
          animationData={loader}
        />
      </>
      

    }
  </div>
  )
}

export default DailySub
