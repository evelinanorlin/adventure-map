import { Marker } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { ExperienceContext } from "../contexts/ExperienceContext";
import { IExperience } from "./interfaces/IExperience";
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import { getIcon } from "../functions/markerFunction";

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
  const openExperience = (id: string) => {
    navigate(`/upplevelser/${id}`);
  };

  const markers: React.ReactNode[] = visualExperiences.map(
    (experience: IExperience) => {
      if (experience.isReviewed === false) return null;
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
