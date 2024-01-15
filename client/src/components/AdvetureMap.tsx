import { Marker } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { ExperienceContext } from "../contexts/ExperienceContext";
import { IExperienceId } from "./interfaces/IExperience";
import L, { PointExpression } from "leaflet";
import { useNavigate } from "react-router-dom";
import Map from "./Map";

interface AdventureMapProps {
  location: {
    latitude: number;
    longitude: number;
    display_name: string;
    zoom: number;
  };
}

export default function AdventureMap({ location }: AdventureMapProps) {
  const experiencesCont = useContext(ExperienceContext);
  const visualExperiences = experiencesCont.visualExperiences;
  const navigate = useNavigate();

  const getIcon = (category: string, _iconSize: PointExpression) => {
    const url = "/icons/" + category + ".svg";
    return L.icon({
      iconUrl: url,
      iconSize: _iconSize,
    });
  };

  const openExperience = (id: string) => {
    navigate(`/upplevelser/${id}`);
  };

  const markers: React.ReactNode[] = visualExperiences.map(
    (experience: IExperienceId) => {
      if(experience.isReviewed === false) return null;
      return (
        <Marker
          key={experience._id}
          position={[
            experience.location.latitude,
            experience.location.longitude,
          ]}
          icon={getIcon(experience.category, [30, 30])}
          eventHandlers={{
            click: () => {
              openExperience(experience._id);
            },
          }}
        ></Marker>
      );
    },
  );

  return <Map location={location} markers={markers} />;
}
