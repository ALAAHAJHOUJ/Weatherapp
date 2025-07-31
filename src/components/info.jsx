import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import image1 from '../assets/Pression.png';
import image2 from '../assets/humidite.png';
import image3 from '../assets/Airspeed.png';


function Info({hauteur,current,temp,humidite,pression,vitesse,actuelle,pro,changer1}) {

  
  useEffect(()=>{
  changer1();
  },[])


  return (
    <>
         { hauteur=="580px" && current==true ? 
            <div className="w-full flex flex-wrap content-start h-[400px] ">
              <motion.div animate={{scale:1}} initial={{scale:0}} transition={{duration:1,delay:1.5,type:"spring"}} className="w-full flex justify-center mb-5 flex-wrap  h-[160px]">
                  {actuelle==true?<motion.div initial={pro==true?{scale:0}:{scale:1}} animate={{scale:1}} transition={{duration:1,type:"spring",delay:1}} className='w-full text-center font-bold text-[23px] opacity-[0.7] italic'>Votre Position</motion.div>:<></>}
                  <motion.div animate={{scale:1}} initial={{scale:0}} transition={{duration:1,delay:1,type:"spring"}} className="degre opacity-[0.7] w-[150px] rounded-[14px] relative overflow-hidden">
                    <div className="absolute w-full h-full flex justify-center items-center font-bold text-[32px]">{temp}°C</div>
                  </motion.div>
              </motion.div>
              <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:1,delay:1.5,type:"spring"}} className="w-full h-[100px] flex justify-center mb-5">
                <div className=" w-[200px] h-full flex justify-center items-center text-[20px] font-medium flex-wrap "><div className="w-full text-center flex justify-center items-center"><img src={image1} alt="pression" className="w-[45px] h-[45px]"></img></div><div className="w-full font-medium italic text-center mt-2">Pression</div><div className="w-full text-center font-bold">{pression+" hPa"}</div></div>
              </motion.div>
             
              <div className="w-full   flex justify-between mt-8">
                <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:1,delay:1.5,type:"spring"}}  className=" w-[150px] flex justify-center items-center flex-col gap-1">
                  <img src={image2} alt="humidite" className="w-[40px] h-[40px]"></img>
                  <div className="font-medium italic">humidité</div>
                  <span className="text-[15px] font-bold" >{humidite+"%"}</span>
                </motion.div>
                <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:1,delay:1.5,type:"spring"}}  className=" w-[150px] flex justify-center items-center flex-col gap-1">
                   <img src={image3} alt="humidite" className="w-[40px] h-[40px]"></img>
                   <div className="font-medium italic">Vitesse Air</div>
                   <span className="text-[15px] font-bold">{vitesse+"m/s"}</span>
                </motion.div>
              </div>
        </div>:<></>
        }</>
  )
}

export default Info