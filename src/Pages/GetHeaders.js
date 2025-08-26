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


const GetHeaders = () => {

    const navigate = useNavigate();
    const [show,setShow] = useState(false);
        const [tVal,setTVal] = useState(null)


    const [selectedOption, setSelectedOption] = useState({ value: 'daily', label: 'Tous les jours/100 FCFA' })
    const [loading,setLoading] = useState(false)

    // const number = Cookies.get('number')
    

    const urlParams = new URLSearchParams(window.location.search);
    const msisdn = urlParams.get('msisdn');
    var ExtId = urlParams.get('extId');

    

    Cookies.set('number',msisdn);
    Cookies.set('extId',ExtId)

    console.log(msisdn)
   


    const options = [
        { value: 'daily', label: 'Tous les jours/100 FCFA' },
        { value: 'weekly', label: 'Hebdomadaire/300 FCFA' },
        { value: 'monthly', label: 'Mensuelle/500 FCFA' },
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
        e.preventDefault();
        setLoading(true)
    
        const data = {
          msisdn:msisdn,
          packType:selectedOption.value,
          extId:ExtId,
          t:tVal
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
            // else{
            //   setShow(true)
            // }
          }
        }

        getHeaders();

      }, []);





      const getScript=async()=> {
            setLoading(true);
      
            try {
              
              const getScript = await axios.get(`${base_url}/api/v1/script?serviceName=HighFive&ext_id=${ExtId}`)
              // const getScriptURL = `${ENDPOINT_URL}?applicationId=193&countryId=207&requestId=${evinaRequestId}`;
              console.log("script url--- ", JSON.parse(getScript.data.response).s);
              // const response = await axios.get(getScriptURL.data);
      
              // if (!response.ok) {
              //   throw new Error(
              //     `Failed to fetch script: ${response.status} ${response.statusText}`
              //   );
              // }
      
              const scriptContent = await JSON.parse(getScript.data.response).s;
              console.log("response----- " + scriptContent);
              // setAntiFrauduniqid(scriptContent["AntiFrauduniqid"]);
      
              console.log("response " + scriptContent[100]);

              setTVal(JSON.parse(getScript.data.response)?.t)

      
              ExtId =  await getScript.data.t;
      
              if (scriptContent) {
                let top_head = document.getElementsByTagName("head")[0];
                let anti_script = document.createElement("script");
      
                anti_script.innerHTML = scriptContent;
                top_head.insertBefore(anti_script, top_head.firstChild);
      
                var event = new Event("DCBProtectRun");
                // console.log(event);
                document.dispatchEvent(event);
                document.addEventListener("gateway-load", (event) => {
                  //Enable form submission
                  // setScriptLoaded(true);
                  console.log(event, "EVENT LOADED");
                });
              }
      
            } catch (error) {
              console.error("Error fetching script", error);
            } finally {
              setLoading(false);
            }
          }
      
      
          useEffect(()=>{
            getScript()
          },[])
      






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
            id="otp-send"
            type='submit'
            className="w-full bg-orange-600 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Soumission..." : "s'abonner"}
          </button>
        </div>
         <p
  onClick={() => navigate('/tnc')}
  className="text-blue-400 text-center mt-4 underline cursor-pointer"
>
  Conditions générales
</p>
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

export default GetHeaders
