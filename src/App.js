import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import './fichier.css';

function App() {
  const [hauteur,setHauteur]=useState("130px");
  const [selectedFramework, setSelectedFramework] =useState(null);
  const pays = [

];

  const RoundedTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '15px',
  },
  });


  return (
    <div className="element App border-[1px] w-full h-full flex justify-center">
      <div className={"element2 min-[0px]:shrink-0 min-[360px]:shrink-[1] min-[0px]:w-[100%] min-[360px]:w-[430px] min-w-[353px]  bg-white rounded-[13px] flex items-start flex-wrap transition-[height] duration-[2s] "} style={{boxShadow:"-1px 1px 47px -6px rgba(255,255,255,0.75)",height:`${hauteur}`}}>
        <div className=" h-[130px] w-[16%] flex justify-center items-center">
          <FaLocationDot className="scale-[2.5] translate-x-[-5px] hover:text-gray-400 cursor-pointer" title="Votre position"></FaLocationDot>
        </div>
        <div className=" h-[130px] w-[70%] flex justify-center items-center">
                <Autocomplete
                  options={pays}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, newValue) => setSelectedFramework(newValue)}
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
        <div className="w-full flex flex-wrap content-start h-[400px] border-black border-[1px]">
           <div className="w-full flex justify-center mb-5 bg-red-400">
              <div className="degre border-[1px] border-black w-[150px] h-[150px]"></div>
           </div>
           <div className="w-full h-[100px] border-[1px] border-black flex justify-center bg-green-500 mb-5">
             <div className="border-[1px] border-black w-[200px] h-full"></div>
           </div>

           <div className="w-full h-[90px] border-black border-[1px] bg-yellow-400 flex justify-between">
            <div className="border-[1px] border-black">humidite plus logo</div>
            <div className="border-[1px] border-black">vitesse air plus logo</div>
           </div>
        </div>:<></>}

      </div>
    </div>
  );
}

export default App;
