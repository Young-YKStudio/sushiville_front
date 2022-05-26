import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import React from 'react';
import restaurantData from '../../Data/Restaurant.json'

const mapContainerStyle = {
  width: "100%",
  height: "50vh"
}

const Maps = (props) => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  const [ showInfoWindow, setShowInfoWindow ] = React.useState(true);

  if(loadError) return "Error";
  if(!isLoaded) return "Loading...";

  return (
    <div style={{ width: "100%", height: "50vh "}}>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={{ lat: restaurantData[0].lat, lng: restaurantData[0].lng }}
      >
        <Marker
          position={{ lat: restaurantData[0].lat, lng: restaurantData[0].lng }}
          onClick={()=>{
            setShowInfoWindow(true)
          }}
        />
        {showInfoWindow ? (
          <InfoWindow
            position={{ lat: restaurantData[0].lat+0.0006, lng: restaurantData[0].lng }}
            onCloseClick={()=> {
              setShowInfoWindow(false)
            }}
          >
            <div>
              <h3>
                SushiVille
              </h3>
              <p>{restaurantData[0].address}</p>
              <a target="_blank" rel="noreferrer" href="https://www.google.com/maps/place/Sushiville/@41.155677,-74.193748,16z/data=!4m8!1m2!3m1!2sSushiville!3m4!1s0x89c2dfc1c127b3e3:0x4735a45026923a62!8m2!3d41.1556049!4d-74.1935692">View on Google Maps</a>
            </div>
          </InfoWindow>
        ) : !showInfoWindow}
      </GoogleMap>
    </div>
  );
}
export default Maps;