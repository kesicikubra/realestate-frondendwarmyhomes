"use client"
import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import "./style.scss";

function GoogleMapPage({dataAdvert}) {
  const options = {
    mapId:'8c15930634085219',
    fullScreenControl: false
  }
  
  const pinIcon = {
    url: "/images/logo/marker.png",
    scaledSize: {width:80 , height:100}
  }
  
  
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    
    lat: Number(dataAdvert?.location?.latitude) !== undefined ?  Number(dataAdvert?.location?.latitude) : 39.925533,
    lng: Number(dataAdvert?.location?.longitude) !== undefined ?  Number(dataAdvert?.location?.longitude) : 32.866287
  };
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)


  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onUnmount={onUnmount}
        options={options}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <MarkerF 
            position={{lat:Number(dataAdvert?.location.latitude), lng:Number(dataAdvert?.location.longitude)}}
            icon={pinIcon}
            label={{
              text:dataAdvert?.title,
              className:"marker text-primary fw-bold fs-6"
            }}
            />
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMapPage)