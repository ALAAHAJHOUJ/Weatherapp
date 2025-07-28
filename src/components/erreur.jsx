import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { TbFaceIdError } from 'react-icons/tb';
function Erreur(props) {
const divpere=useRef();
const divfils=useRef();

  return (
    <>
    {
            props.error=="erreur"?<div ref={divpere} onClick={(e)=>{if(e.target==divpere.current){ props.nettoyer2();console.log(e.target==divpere.current)}}} className="absolute left-0 top-0 bg-[#00000078] flex justify-center items-center w-[100vw] h-[100vh]">
                <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:0.7,type:"spring"}} ref={divfils} className="bg-white h-[300px] z-[10000] min-[0px]:w-[90%] min-[500px]:w-[300px] rounded-[14px] flex justify-center flex-wrap content-center gap-4">
                  <div className=" w-full h-[50px] font-bold text-center italic">Une Erreur S'est Produite</div>
                  <TbFaceIdError size={60}></TbFaceIdError>
                  <div className=" w-full h-[100px] flex justify-center font-bold text-[20px] italic">
                    <div onClick={()=>{props.nettoyer2();}} className="w-[110px] hover:bg-[#80a2dd] cursor-pointer  h-[60px] bg-[#4682ea] rounded-[12px] text-white font-medium flex justify-center items-center">Réssayer</div>
                  </div>
                </motion.div>
             </div>:<></>

    }
    </>
  )
}

export default Erreur