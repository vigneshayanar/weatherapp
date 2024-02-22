import searchicon from './assets/searchicon.png'
import chizzle from './assets/chizzle.png'
import cloud from './assets/cloud.png'
import humidity from './assets/humidity.png'
import rain from './assets/rain.png'
import snow from './assets/snow.png'
import winds from './assets/wind.png'
import clear from './assets/clear.png'
import { useState } from 'react'


function Weather(){

    const search=async()=>{
        let apikey="8dd9ee6e709206e9274a5d03b186c930"
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=Metric`;
        try{
            let res=await fetch(url)
            let data=await res.json();
            if (data.cod==="404"){
                setcitynotfound(true)
            }
            else{
                setimge(cloud)
                settemp(data.main.temp);
                setcountry(data.sys.country)
                setlat(data.coord.lat)
                setlog(data.coord.lon)
                sethumdity(data.main.humidity)
                setwind(data.wind.speed)
                const id=data.weather[0].icon;
                setimge(weathericon[id]||clear)
                setcitynotfound(false)
            }
        }
        catch (error) {
            console.error("An error occurred while fetching weather data:", error);
        }
        finally{

        }
    }
    const Handle=(e)=>{
        setcity(e.target.value);
    };
    const handlekey=(e)=>{
        if(e.key==="Enter"){
            search();
        }};
    const handleicon=()=>{
        search();
     }   
     
    function Currentweather({icon,temp,city,country,lat,log,humdity,wind}){
        return(
            <>    
            <div className='image-icon'>
            <img src={icon} alt="image"  style={{ width: '100px', height: '100px' }} />
            </div>
            <div className='elements'>
            <div className='temp'>{temp}°C </div>
            <div className='city'>{city} </div>
            <div className='country'>{country} </div>
            <div className='humdity'>
                <span className='lat'>latitude {lat}</span>
                <span className='log'>logtitude {log}</span> </div>
                </div>
                <div className='conatiner-case'>
                <div className='hum'>
                    <img src={humidity} alt="" style={{width:'50px',height:'50px',marginLeft:'11px'}}/>
                    <div className='elements'>
                    <div className='hum-per'>{humdity}%</div>
                    <div className='text'>humdity</div>
                </div>
                </div>
                <div className='wind'>
                    <img src={winds} alt="" style={{width:'50px',height:'50px',marginLeft:'20px'}}/>
                    <div className='elements'>
                    <div className='hum-per'>{wind}km/h</div>
                    <div className='text'>Wind speed</div>
                </div>
                </div>
                </div>
            </>
        )
    
    }
    const[icon,setimge]=useState(cloud)
    const[temp,settemp]=useState(0)
    const[city,setcity]=useState()
    const[country,setcountry]=useState()
    const[lat,setlat]=useState(0)
    const[log,setlog]=useState(0)
    const[humdity,sethumdity]=useState(0)
    const[wind,setwind]=useState(0)
    const[citynotfound,setcitynotfound]=useState(false)
    const weathericon={
        '01d':clear,
        '01n':clear,
        '02d':clear,
        '02n':clear,
        '03d':chizzle,
        '03n':chizzle,
        '04d':chizzle,
        '04n':chizzle,
        '09d':rain,
        '09n':rain,
        '10d':rain,
        '10n':rain,
        '13d':snow,
        '13n':snow,
    
    };
    return(
        <div className='container'>
            <div className='input-conatiner'>
                <input type="text" className='cityinput' placeholder='search City' onChange={Handle}  value={city} onKeyDown={handlekey}/>
                <div className='search-icon' style={{width:20}} >
                <img src={searchicon} alt="search" style={{ width: '20px', height: '20px' }} onClick={handleicon}/>
                </div>
            </div>
            {citynotfound ?(<div className='Notfound'>City not found</div>):(<Currentweather icon={icon} temp={temp} city={city} country={country} log={log} lat={lat} humdity={humdity} wind={wind}/>)}

            <div className='copy'>
                <span>Designed by ^vicky^</span>
            </div>
        </div>
    )
    }
export default Weather