import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { motion } from "framer-motion";
import './fichier.css';
import error2 from './assets/error2.jpg';
import { TiWeatherStormy } from "react-icons/ti";
import { TbFaceIdError } from "react-icons/tb";


function App() {

  const [hauteur,setHauteur]=useState("130px");
  const [selectedpays, setpays] =useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("erreur");
  const [notfound,setNotFound]=useState(false);
  const [temp,setTemp]=useState("");
  const [humidite,setHumidite]=useState("");
  const [pression,setPression]=useState("");
  const [vitesse,setVitesse]=useState("");
  const [sugg,setsugg]=useState(true);
  const envoyer=useRef(false);
  const valeursaisie=useRef("");
  const divpere=useRef();
  const divfils=useRef();
  const lon=useRef("");
  const lat=useRef("");

  useEffect(()=>{
  setTimeout(() => {
      setLoading(false);
  }, 3000);

  },[])




  const verifier=(tab,objet)=>{
  for(let i=0;i<tab.length;i++)
  {
    if(tab[i].city==objet.city) return true;
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
  fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&format=json&apiKey=key2`)
  .then(response => response.json())
  .then(result =>{console.log(result.results);let aux;let a=result.results.filter((ele,key)=>{return ele.city});aux=a.map((ele,key)=>{return {"key":key,"city":ele.city,"lat":ele.lat,"lon":ele.lon}});console.log(a);setpays(unique(aux))})
  .catch(error =>{console.log('error', error);})
  }





  const resultat=()=>{
  if(valeursaisie.current.split()!="" && envoyer.current==true)
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={API key}`)
  .then(res=>{console.log(res);if(res.ok==true)return res.json();else {setError("erreur");throw new Error("une erreur s'est produit")}})
  .then(res=>{console.log(res)})
  .catch(error=>{console.log("error",error)})
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
                      getOptionLabel={(option)=>{return option.city }}
                      onChange={(e,value)=>{envoyer.current=true;if(value){valeursaisie.current=value.city;console.log(value);lon.current=value.lon;lat.current=value.lat}}}
                      fullWidth
                            sx={{
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: '15px',
                                  },
                                }}
                      renderInput={(params) => (
                        <TextField {...params} onChange={(e)=>{envoyer.current=false;valeursaisie.current=e.target.value;suggestions(e.target.value)}} label="Choisissez un pays" variant="outlined"  />
                      )}
                    />
            </div>
            <div className=" h-[130px] w-[14%] flex justify-center items-center">
              <IoSearchCircle className="scale-[3.4] hover:text-gray-400 cursor-pointer" title="chercher" onClick={  ()=>{resultat();if(envoyer.current==true)setHauteur((prev)=>{ return "580px";})}  }></IoSearchCircle>
            </div>
            {hauteur=="580px" && envoyer.current==true? 
            <div className="w-full flex flex-wrap content-start h-[400px] ">
              <div className="w-full flex justify-center mb-5 ">
                  <motion.div animate={{scale:1}} initial={{scale:0}} transition={{duration:1,delay:1,type:"spring"}} className="degre opacity-[0.7] w-[150px] h-[150px] rounded-[14px] relative overflow-hidden">
                    <div className="absolute w-full h-full flex justify-center items-center font-bold text-[32px]">{temp}°C</div>
                  </motion.div>
              </div>
              <div className="w-full h-[100px] flex justify-center mb-5">
                <div className="border-[1px] border-black w-[200px] h-full flex justify-center items-center text-[20px] font-medium flex-wrap"><div className="w-full text-center">logo</div><div className="w-full text-center">pression</div></div>
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
        </div>:
        error=="erreur"?<div ref={divpere} onClick={(e)=>{if(e.target==divpere.current) setError("bien")}} className="absolute left-0 top-0 bg-[#00000078] flex justify-center items-center w-[100vw] h-[100vh]">
            <div ref={divfils} className="bg-white h-[300px] z-[10000] min-[0px]:w-[90%] min-[500px]:w-[300px] rounded-[14px] flex justify-center flex-wrap content-center gap-4">
              <div className=" w-full h-[50px] font-bold text-center italic">Une Erreur S'est Produite</div>
              <TbFaceIdError size={60}></TbFaceIdError>
              <div className=" w-full h-[100px] flex justify-center font-bold text-[20px] italic">
                <div onClick={()=>{setError("rien")}} className="w-[110px] hover:bg-[#80a2dd] cursor-pointer  h-[60px] bg-[#4682ea] rounded-[12px] text-white font-medium flex justify-center items-center">Réssayer</div>
              </div>
            </div>
        </div>:<></>
        
        }

      </div>
      
      
      }

    </div>
  );
}

export default App;
