// https://dineshigdd.medium.com/how-to-integrate-openstreetmap-with-react-typescript-861605b67ea3
import { Marker } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import osm from "../Leaflet/osm-providers";
import { TileLayer , MapContainer  } from "react-leaflet"
import "leaflet/dist/leaflet.css";


export interface LocationLatLong {
  latitude:number
  longitude:number,
  display_name:string,
  zoom: number;
}

interface props {
  location: LocationLatLong
}

export default function Map( { location }: props) {
  const API_KEY = import.meta.env.VITE_MAPTILER_KEY;
  
  return (
    <MapContainer key={`${location.latitude}-${location.longitude}`} center={[location.latitude, location.longitude]} zoom={ location.zoom } scrollWheelZoom={true}>

      <TileLayer
        url={`https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=${API_KEY}`} attribution={osm.maptiler.attribution}
      />
      <Marker  position={[0,0]}>
      </Marker>
    </MapContainer>
  )
}