import React,{useEffect} from 'react'
import classes from './Welcome.module.css'
import img from '../Assets/high_logo.png'

const Welcome = () => {


  const urlParams = new URLSearchParams(window.location.search);
  const ExtId = urlParams.get('extId');

    useEffect(()=>{
        setTimeout(()=>{
          window.location.href = `https://waaat.orange.sn/panz_osn/?serviceName=HighFiveGames&${ExtId && `extId=${ExtId}`}`;
        },2000)
    },[])

   

   


  return (
    <div className={classes.container}>
      <div className='w-full h-screen flex justify-center items-center flex-col' style={{ backdropFilter: 'blur(6px)',}}>
        <div className='flex flex-col max-w-lg bg-black rounded-md text-white p-6 text-center items-center' style={{
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Set a transparent white background
          backdropFilter: 'blur(10px)',
        }}>

        <p className="text-6xl font-bold font-serif">Bienvenue à</p>
        <img src={img} alt="" className='h-[7rem]' />
        <p className="text-5xl font-semibold font-serif">Regardez des vidéos amusantes en illimité !</p>
        </div>
      </div>
    </div>
  )
}

export default Welcome
