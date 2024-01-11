import { Marker } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import osm from "../Leaflet/osm-providers";
import { TileLayer, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { ExperienceContext } from "../contexts/ExperienceContext";
import { IExperienceId } from "./interfaces/IExperience";
import L, { PointExpression } from "leaflet";
import { useNavigate } from "react-router-dom";

interface AdventureMapProps {
  location: {
    latitude: number;
    longitude: number;
    display_name: string;
    zoom: number;
  };
}

export default function Map({ location }: AdventureMapProps) {
  const API_KEY = import.meta.env.VITE_MAPTILER_KEY;
  const experiencesCont = useContext(ExperienceContext);
  const visualExperiences = experiencesCont.visualExperiences;

  const navigate = useNavigate();
  
  const getIcon = (category: string, _iconSize: PointExpression) => {
    const url = "/icons/" + category + ".svg";
    return L.icon({
      iconUrl: url,
      iconSize: _iconSize,
    })
  };

  const openExperience = (id: string) => {
    navigate(`/upplevelser/${id}`);
  };

  const markers =
    visualExperiences.map((experience: IExperienceId) => {
    if (experience.location.latitude !== null && experience.location.longitude !== null) {
      return (
        <Marker
          key={experience._id}
          position={[experience.location.latitude, experience.location.longitude]}
          icon={getIcon(experience.category, [30, 30])}
          eventHandlers={{click: () => {openExperience(experience._id)}}}
        >
        </Marker>
      );
    }
  });

  return (
    <MapContainer
      key={`${location.latitude}-${location.longitude}`}
      center={[location.latitude, location.longitude]}
      zoom={location.zoom}
      scrollWheelZoom={true}
    >
      <TileLayer
        key={`${location.latitude}-${location.longitude}`}
        url={`https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=${API_KEY}`}
        attribution={osm.maptiler.attribution}
      />
      {markers}
    </MapContainer>
  );
}
