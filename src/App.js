import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import { motion, spring } from "framer-motion";
import './fichier.css';
import { TiWeatherStormy } from "react-icons/ti";
import { TbFaceIdError } from "react-icons/tb";
import image1 from './assets/Pression.png';
import image2 from './assets/humidite.png'
import image3 from './assets/Airspeed.png'
import { IoIosAlert } from "react-icons/io";
import NonAutorise from "./components/nonAutorise";
import Erreur from "./components/erreur";
import Info from "./components/info";



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
  const lon=useRef("");
  const lat=useRef("");
  const [nonautorise,setNonautorise]=useState(false);
  const [positionacuelle,setPositionactuelle]=useState(false);
  const pro=useRef(true);
  const recherche=useRef(false);

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
  fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&format=json&apiKey=key1`)
  .then(response => response.json())
  .then(result =>{console.log(result.results);let aux;let a=result.results.filter((ele,key)=>{return ele.city});aux=a.map((ele,key)=>{return {"key":key,"city":ele.city,"lat":ele.lat,"lon":ele.lon,"country":ele.country}});console.log(aux);setpays(unique(aux))})
  .catch(error =>{console.log('error', error);})
  }





  const resultat=()=>{
  if( envoyer.current==true)
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat.current}&lon=${lon.current}&appid=key2`)
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
              <FaLocationDot onClick={()=>{recherche.current=false;recupererPosition();}} className="scale-[2.5] translate-x-[-5px] hover:text-gray-400 cursor-pointer" title="Votre position"></FaLocationDot>
            </div>
            <div className=" h-[130px] w-[70%] flex justify-center items-center ">
                    <Autocomplete
                      options={selectedpays}
                      clearOnBlur={false}
                      getOptionLabel={(option)=>{return `${option.city} (${option.country})`}}
                      onChange={(e,value)=>{envoyer.current=true;recherche.current=true;if(value){valeursaisie.current=value.city;console.log(value);lon.current=value.lon;lat.current=value.lat}}}
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
              <IoSearchCircle className="scale-[3.4] hover:text-gray-400 cursor-pointer" title="chercher" onClick={()=>{if(envoyer.current==true && recherche.current==true){pro.current=false;setHauteur("580px");resultat();setPositionactuelle(false);}}  }></IoSearchCircle>
            </div>
        <Erreur error={error}  nettoyer2={()=>{setError(false);}} ></Erreur>
        <Info current={envoyer.current} hauteur={hauteur} humidite={humidite} temp={temp} vitesse={vitesse} pression={pression} actuelle={positionacuelle} pro={pro.current} changer1={()=>{pro.current=false}}></Info>
        <NonAutorise nonautorise={nonautorise}  nettoyer2={()=>{setNonautorise(false);}}></NonAutorise>

      </div>
      
      
      }

    </div>
  );
}

export default App;
