"use client"
import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import "./style.scss";

function AddressInformationGoogleMap({latlng}) {

  const options = {
    mapId:'8c15930634085219',
    fullScreenControl: false
  }
  
  const pinIcon = {
    url: "/images/logo/marker.png",
    scaledSize: {width:80 , height:100}
  }
  //hello world
  
  const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius:"20px",
    marginTop:"2rem"
  };

  const center = {
    lat: latlng?.lat !== undefined ?  latlng?.lat : 39.925533,
    lng: latlng?.lng !== undefined ?  latlng?.lng : 32.866287
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
            position={{lat:latlng?.lat, lng:latlng?.lng}}
            icon={pinIcon}
            label={{
              text:"Konum",
              className:"marker text-primary fw-bold fs-6"
            }}
            />
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(AddressInformationGoogleMap)