// https://dineshigdd.medium.com/how-to-integrate-openstreetmap-with-react-typescript-861605b67ea3
import { Marker, Popup } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import osm from "../Leaflet/osm-providers";
import { TileLayer , MapContainer  } from "react-leaflet"
import "leaflet/dist/leaflet.css";

export interface LocationLatLong {
  latitude:number
  longitude:number,
  display_name:string
}

interface props {
  location: LocationLatLong
}

export default function Map( { location }: props) {
  const currentCity: LocationLatLong = location;
  const API_KEY = import.meta.env.VITE_MAPTILER_KEY;
 
  return (
    <MapContainer center={[62,11]} zoom={ 5 } scrollWheelZoom={true}>

      <TileLayer
        url={`https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=${API_KEY}`} attribution={osm.maptiler.attribution}
      />

      <Marker position={[ location.latitude, location.longitude ]}>
          <Popup>
            { currentCity.display_name }
          </Popup>
      </Marker> 
    </MapContainer>
  )
}