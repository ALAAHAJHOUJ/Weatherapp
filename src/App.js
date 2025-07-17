import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { motion } from "framer-motion";
import './fichier.css';

function App() {
  const pays = [
  {label:"maroc"},
  {label:"magfgfc"},
  {label:"matarec"},
  {label:"mahfyteferoc"},
  {label:"mgdtdfsoc"},
  {label:"mgdfvcoc"},
  {label:"margdfdoc"},
];

  const [hauteur,setHauteur]=useState("130px");
  const [selectedFramework, setSelectedFramework] =useState(pays);
  const [loading,setLoading]=useState(true);


  const RoundedTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '15px',
  },
  });


  useEffect(()=>{
  setTimeout(() => {
      setLoading(false);
  }, 3000);

  },[])



  return (
    <div className="element App border-[1px] w-full min-h-[100vh] bg-[#2d2d69] flex justify-center items-center">
      
      {loading==true?<motion.div className="w-full h-[100px] flex justify-center text-white" animate={{opacity:[1,0,1]}} transition={{duration:1,repeat:Infinity}}><FaLocationDot className="scale-[3] text-white"></FaLocationDot></motion.div>:
      <div className={"element2 min-[0px]:shrink-0 min-[360px]:shrink-[1] min-[0px]:w-[100%] min-[360px]:w-[430px] min-w-[353px]   bg-white rounded-[13px] flex  flex-wrap transition-[height] duration-[2s] content-start "} style={{boxShadow:"-1px 1px 47px -6px rgba(255,255,255,0.75)",height:`${hauteur}`}}>
            <div className=" h-[130px] w-[16%] flex justify-center items-center">
              <FaLocationDot className="scale-[2.5] translate-x-[-5px] hover:text-gray-400 cursor-pointer" title="Votre position"></FaLocationDot>
            </div>
            <div className=" h-[130px] w-[70%] flex justify-center items-center ">
                    <Autocomplete
                      options={selectedFramework}
                      getOptionLabel={(option) => option?.label ? option.label : ''}
                      onChange={(event, newValue) =>{ console.log(newValue);setSelectedFramework(newValue)}}
                      sx={{ width: '100%'}}
                      renderInput={(params) => (
                        <RoundedTextField {...params} label="Choisissez un pays" variant="outlined"  />
                      )}
                    />
            </div>
            <div className=" h-[130px] w-[14%] flex justify-center items-center">
              <IoSearchCircle className="scale-[3.4] hover:text-gray-400 cursor-pointer" title="chercher" onClick={  ()=>{setHauteur((prev)=>{if(prev=="130px") return "580px";else return "130px";})}  }></IoSearchCircle>
            </div>
            {hauteur=="580px"? 
            <div className="w-full flex flex-wrap content-start h-[400px] border-black border-[1px] ">
              <div className="w-full flex justify-center mb-5 bg-red-400">
                  <div className="degre border-[1px] border-black w-[150px] h-[150px]">image erreur ou resultat degre</div>
              </div>
              <div className="w-full h-[100px] border-[1px] border-black flex justify-center bg-green-500 mb-5">
                <div className="border-[1px] border-black w-[200px] h-full">message err ou pression</div>
              </div>

              <div className="w-full h-[90px] border-black border-[1px] bg-yellow-400 flex justify-between">
                <div className="border-[1px] border-black">humidite plus logo</div>
                <div className="border-[1px] border-black">vitesse air plus logo</div>
              </div>
        </div>:<></>}

      </div>
      
      
      }

    </div>
  );
}

export default App;
