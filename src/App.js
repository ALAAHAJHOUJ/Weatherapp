import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { motion, spring } from "framer-motion";
import './fichier.css';
import error2 from './assets/error2.jpg';
import { TiWeatherStormy } from "react-icons/ti";
import { TbFaceIdError } from "react-icons/tb";
import image1 from './assets/Pression.png';
import image2 from './assets/humidite.png'
import image3 from './assets/Airspeed.png'
import { IoIosAlert } from "react-icons/io";



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
  const envoyer=useRef(false);
  const valeursaisie=useRef("");
  const divpere=useRef();
  const divfils=useRef();
  const divfils1=useRef();
  const divpere1=useRef();
  const lon=useRef("");
  const lat=useRef("");
  const [nonautorise,setNonautorise]=useState(false);
  const [positionacuelle,setPositionactuelle]=useState(false);

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
  .then(result =>{console.log(result.results);let aux;let a=result.results.filter((ele,key)=>{return ele.city});aux=a.map((ele,key)=>{return {"key":key,"city":ele.city,"lat":ele.lat,"lon":ele.lon,"country":ele.country}});console.log(aux);setpays(unique(aux))})
  .catch(error =>{console.log('error', error);})
  }





  const resultat=()=>{
  if( envoyer.current==true)
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat.current}&lon=${lon.current}&appid=key1`)
  .then(res=>{console.log(res);if(res.ok==true)return res.json();else {setError("erreur");throw new Error("une erreur s'est produit")}})
  .then(res=>{console.log(res);console.log(res.main.temp,res.main.pressure,res.main.humidity,res.wind.speed);setTemp((res.main.temp-273.15).toPrecision(5));setVitesse(res.wind.speed+"");setHumidite(res.main.humidity+"");setPression(res.main.pressure+"")})
  .catch(error=>{console.log("error",error)})
  }





  const recupererPosition=()=>{
     if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);

          lat.current=position.coords.latitude;
          lon.current=position.coords.longitude;
          envoyer.current=true;
          setPositionactuelle(true);
          setHauteur("580px");
          setNonautorise(false);
          resultat();
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          envoyer.current=false;
          setNonautorise(true);
        }
      );
    } else {
      envoyer.current=false;
      console.error("La géolocalisation n'est pas supportée par ce navigateur.");
    }

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
                      getOptionLabel={(option)=>{return `${option.city} (${option.country})`}}
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
              <IoSearchCircle className="scale-[3.4] hover:text-gray-400 cursor-pointer" title="chercher" onClick={  ()=>{if(envoyer.current==true){setHauteur("580px");resultat();setPositionactuelle(false);console.log("ah oui")}}  }></IoSearchCircle>
            </div>
            { hauteur=="580px" && envoyer.current==true? 
            <div className="w-full flex flex-wrap content-start h-[400px] ">
              <motion.div animate={{scale:1}} initial={{scale:0}} transition={{duration:1,delay:1.5,type:"spring"}} className="w-full flex justify-center mb-5 flex-wrap  h-[160px]">
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
        </div>:
        error=="erreur"?<div ref={divpere} onClick={(e)=>{if(e.target==divpere.current) setError("bien")}} className="absolute left-0 top-0 bg-[#00000078] flex justify-center items-center w-[100vw] h-[100vh]">
            <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:0.7,type:"spring"}} ref={divfils} className="bg-white h-[300px] z-[10000] min-[0px]:w-[90%] min-[500px]:w-[300px] rounded-[14px] flex justify-center flex-wrap content-center gap-4">
              <div className=" w-full h-[50px] font-bold text-center italic">Une Erreur S'est Produite</div>
              <TbFaceIdError size={60}></TbFaceIdError>
              <div className=" w-full h-[100px] flex justify-center font-bold text-[20px] italic">
                <div onClick={()=>{setError("rien")}} className="w-[110px] hover:bg-[#80a2dd] cursor-pointer  h-[60px] bg-[#4682ea] rounded-[12px] text-white font-medium flex justify-center items-center">Réssayer</div>
              </div>
            </motion.div>
        </div>:nonautorise==true?
        <div ref={divpere1} onClick={(e)=>{if(e.target==divpere1.current) setNonautorise(false)}} className="absolute left-0 top-0 bg-[#00000078] flex justify-center items-center w-[100vw] h-[100vh]">
           <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:0.7,type:"spring"}} ref={divpere1} className="bg-white h-[300px] z-[10000] min-[0px]:w-[90%] min-[500px]:w-[300px] rounded-[14px] flex justify-center flex-wrap content-center gap-4">
            <IoIosAlert size={50}></IoIosAlert>
            <div className="w-full font-bold italic text-center box-border pl-4 pr-4">Veuillez Autoriser l'acces a la position</div>
            <div className="w-full h-[100px] flex justify-center font-bold text-[20px] italic">
              <div onClick={()=>{setNonautorise(false)}} className="w-[110px] hover:bg-[#80a2dd] cursor-pointer  h-[60px] mt-7 bg-[#4682ea] rounded-[12px] text-white font-medium flex justify-center items-center">Réssayer</div>
            </div>
           </motion.div>
        </div>
        :<></>
        
        }

      </div>
      
      
      }

    </div>
  );
}

export default App;
