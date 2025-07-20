import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { motion } from "framer-motion";
import './fichier.css';
import error2 from './assets/error2.jpg';
import { TiWeatherStormy } from "react-icons/ti";



function App() {

  const [hauteur,setHauteur]=useState("130px");
  const [selectedpays, setpays] =useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("bien");
  const [notfound,setNotFound]=useState(false);
  const [temp,setTemp]=useState("");
  const [humidite,setHumidite]=useState("");
  const [pression,setPression]=useState("");
  const [vitesse,setVitesse]=useState("");
  const [sugg,setsugg]=useState(true);




  useEffect(()=>{
  setTimeout(() => {
      setLoading(false);
  }, 3000);

  },[])

  const verifier=(tab,objet)=>{
  for(let i=0;i<tab.length;i++)
  {
    if(tab[i].country==objet.country) return true;
  }

  return false;
  }

  const unique=(tab)=>{
  let tab1=[];
  let j=0;

      for(let i=0;i<tab.length;i++)
      {
      if(verifier(tab1,tab[i])==false){tab1[j]=tab[i];j++;}
      }

      return tab1;
  }



  const suggestions=(value)=>{
  let liste;
  let j=0;
  if(value.split()!="")
  fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&format=json&apiKey=cle1`)
  .then(response => response.json())
  .then(result =>{let a=result.results.map((ele,key)=>{return {"key":key,"country":ele.country,"coordonnes":ele.bbox}});console.log("tab5");console.log(unique(a));setpays(unique(a))})
  .catch(error =>{console.log('error', error);})
  }




  const resultat=()=>{
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=1.541&lon=1.514&appid=cle2`)
  .then(res=>{console.log(res);if(res.ok==true)return res.json();else throw new Error("une erreur s'est produit")})
  .then(res=>{console.log(res)})
  .catch(error=>{console.log("error",error)})
  }


  const resultat2=()=>{

  }


  const recupererPosition=()=>{


  }


  return (
    <div className="element App border-[1px] w-full min-h-[100vh] bg-[#2d2d69] flex justify-center items-center">
      
      {loading==true?<motion.div className="w-full h-[100px] flex justify-center text-white" animate={{opacity:[1,0,1]}} transition={{duration:1,repeat:Infinity}}><TiWeatherStormy className="scale-[5] text-white"></TiWeatherStormy></motion.div>:
      <div className={"element2  min-[0px]:w-[95%] min-[435px]:w-[430px] min-w-[330px]   bg-white rounded-[13px] flex  flex-wrap transition-[height] duration-[2s] content-start "} style={{boxShadow:"-1px 1px 47px -6px rgba(255,255,255,0.75)",height:`${hauteur}`}}>
            <div className=" h-[130px] w-[16%] flex justify-center items-center">
              <FaLocationDot onClick={recupererPosition} className="scale-[2.5] translate-x-[-5px] hover:text-gray-400 cursor-pointer" title="Votre position"></FaLocationDot>
            </div>
            <div className=" h-[130px] w-[70%] flex justify-center items-center ">
                    <Autocomplete
                      options={selectedpays}
                      clearOnBlur={false}
                      getOptionLabel={(option)=>{return option.country }}
                      fullWidth
                            sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: '15px',
                                  },
                                }}
                      renderInput={(params) => (
                        <TextField {...params} onChange={(e)=>{console.log(e.target.value);suggestions(e.target.value)}} label="Choisissez un pays" variant="outlined"  />
                      )}
                    />
            </div>
            <div className=" h-[130px] w-[14%] flex justify-center items-center">
              <IoSearchCircle className="scale-[3.4] hover:text-gray-400 cursor-pointer" title="chercher" onClick={  ()=>{setHauteur((prev)=>{resultat(); return "580px";})}  }></IoSearchCircle>
            </div>
            {hauteur=="580px"? 
            <div className="w-full flex flex-wrap content-start h-[400px] ">
              <div className="w-full flex justify-center mb-5 ">
                  <motion.div animate={{scale:1}} initial={{scale:0}} transition={{duration:1,delay:1,type:"spring"}} className="degre opacity-[0.7] w-[150px] h-[150px] rounded-[14px] relative overflow-hidden">
                    {error=="erreur"?<img src={error2} alt="image d'erreur" className="w-full h-full absolute" ></img>:notfound==true?<img src="./assets/not-found.jpg" className="w-full h-full absolute"  alt="image introuvable"></img>:<div className="absolute w-full h-full flex justify-center items-center font-bold text-[32px]">{temp}°C</div>}
                  </motion.div>
              </div>
              <div className="w-full h-[100px] flex justify-center mb-5">
                <div className="border-[1px] border-black w-[200px] h-full flex justify-center items-center text-[20px] font-medium flex-wrap">{error=="erreur"||notfound==true?"Veuillez réssayer":<><div className="w-full text-center">logo</div><div className="w-full text-center">pression</div></>}</div>
              </div>

              <div className="w-full h-[90px]  flex justify-between">
                <div className="border-[1px] border-black w-[150px] flex justify-center items-center flex-wrap">
                  <span className="text-[15px]" >humidite</span>
                  <div className="w-full text-center">logo</div>
                </div>
                <div className="border-[1px] border-black w-[150px] flex justify-center items-center flex-wrap">
                  <span className="text-[15px]">vitesse</span>
                  <div className="w-full text-center">logo</div>
                </div>
              </div>
        </div>:<></>}

      </div>
      
      
      }

    </div>
  );
}

export default App;
