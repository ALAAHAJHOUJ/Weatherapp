import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";


function App() {
  const [hauteur,setHauteur]=useState("130px")
  return (
    <div className="App border-[1px] w-full h-full bg-[#182252] flex justify-center items-center overflow-hidden">
      <div className={"w-[30%]  bg-white rounded-[13px] flex items-start flex-wrap transition-[height] duration-[2s] "} style={{boxShadow:"-1px 1px 47px -6px rgba(255,255,255,0.75)",height:`${hauteur}`}}>
        <div className=" h-[130px] w-[16%] flex justify-center items-center">
          <FaLocationDot className="scale-[2.5] hover:text-gray-400 cursor-pointer" title="Votre position"></FaLocationDot>
        </div>
        <div className=" h-[130px] w-[70%] flex justify-center items-center">
          <input type="text" autoComplete="off" className="border-[1px] border-black w-[94%] h-[60px] rounded-[10px] pl-4 placeholder:text-center placeholder:translate-x-[-12px] placeholder:text-[20px] text-[20px]" placeholder="saisir le pays" />
        </div>
        <div className=" h-[130px] w-[14%] flex justify-center items-center">
          <IoSearchCircle className="scale-[3.4] hover:text-gray-400 cursor-pointer" title="chercher" onClick={  ()=>{setHauteur((prev)=>{if(prev=="130px") return "580px";else return "130px";})}  }></IoSearchCircle>
        </div>
        {hauteur=="580px"? 
        <div className="w-full flex flex-wrap content-start h-[400px] border-black border-[1px]">
           <div className="w-full flex justify-center mb-5 bg-red-400">
              <div className="degre border-[1px] border-black w-[150px] h-[150px]"></div>
           </div>
           <div className="w-full h-[100px] border-[1px] border-black flex justify-center bg-green-500 mb-5">
             <div className="border-[1px] border-black w-[200px] h-full"></div>
           </div>

           <div className="w-full h-[90px] border-black border-[1px] bg-yellow-400 flex justify-between">
            <div className="border-[1px] border-black">humidite</div>
            <div className="border-[1px] border-black">vitesse air</div>
           </div>
        </div>:<></>}

      </div>
    </div>
  );
}

export default App;
