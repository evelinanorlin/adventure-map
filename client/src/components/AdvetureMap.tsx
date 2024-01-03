import { useState } from "react";
import {MapContainer, TileLayer} from "react-leaflet"
import osm from "../Leaflet/osm-providers";
import "leaflet/dist/leaflet.css";

export default function AdventureMap() {
  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
  const ZOOM_LEVEL = 13;
  const key=import.meta.env.VITE_MAPTILER_KEY;
  console.log(key)
 // const mapRef = useRef();
  return (
    <div className="map">
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
       // ref={mapRef}
      >
        <TileLayer url={`https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=${key}`} attribution={osm.maptiler.attribution} />
      </MapContainer>
    </div>
  );
}