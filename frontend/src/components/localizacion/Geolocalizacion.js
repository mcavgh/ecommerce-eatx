import React, { useState} from "react"

export  function FindMe(){

 const [distancia,setDistancia]=useState("")

  
  //Obtenemos latitud y longitud
  function localizacion(posicion){
    var latitudeObelisco=-34.60371
    var longitudeObelisco=-58.38157 

    var latitude = posicion.coords.latitude;
    var longitude = posicion.coords.longitude;

    const R = 6371
    const deltlatitude= ((latitude)-(latitudeObelisco))*(0.0174533)
    const deltlongitude= ((longitude)-(longitudeObelisco))*(0.0174533)
    const a= Math.pow(Math.sin(deltlatitude/2),2)+Math.cos(-32.4914166)*Math.cos(-34.60371)* Math.pow(Math.sin(deltlongitude/2),2)
    const c=2*Math.atan2(Math.sqrt(a),Math.sqrt((1-a)))
    const d = R*c
    setDistancia(d)
    


  }

  function error(){
    return <p>No se pudo obtener tu ubicación</p>

  }

  navigator.geolocation.getCurrentPosition(localizacion,error);

  if (navigator.geolocation) {

      return (distancia)       
      
    }else{
      return <p>Tu navegador no soporta Geolocalizacion</p>
    }
}