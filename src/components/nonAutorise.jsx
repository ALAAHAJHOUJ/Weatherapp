import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { IoIosAlert } from 'react-icons/io';
function NonAutorise(props) {
const divpere1=useRef();
const divfils1=useRef();

  return (
          <>
           {props.nonautoriser==true?<div ref={divpere1} onClick={(e)=>{if(e.target==divpere1.current) props.nettoyer2();}} className="absolute left-0 top-0 bg-[#00000078] flex justify-center items-center w-[100vw] h-[100vh]">
               <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:0.7,type:"spring"}} ref={divfils1} className="bg-white h-[300px] z-[10000] min-[0px]:w-[90%] min-[500px]:w-[300px] rounded-[14px] flex justify-center flex-wrap content-center gap-4">
                <IoIosAlert size={50}></IoIosAlert>
                <div className="w-full font-bold italic text-center box-border pl-4 pr-4">Veuillez Autoriser l'acces a la position</div>
                <div className="w-full h-[100px] flex justify-center font-bold text-[20px] italic">
                  <div onClick={()=>{props.nettoyer2();}} className="w-[110px] hover:bg-[#80a2dd] cursor-pointer  h-[60px] mt-7 bg-[#4682ea] rounded-[12px] text-white font-medium flex justify-center items-center">Réssayer</div>
                </div>
               </motion.div>
            </div>:
            <></>
           }
           </>
  )
}

export default NonAutorise