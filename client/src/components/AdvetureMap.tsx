import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { ExperienceContext } from "../contexts/ExperienceContext";
import { IExperience } from "./interfaces/IExperience";
import Map from "./Map";
import { getIcon } from "../functions/markerFunction";
import { ILocation } from "./interfaces/ILocation";

interface IAdventureMapProps {
  location: ILocation;
}

export default function AdventureMap({ location }: IAdventureMapProps) {
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
              if (!experience._id) return;
              openExperience(experience._id);
            },
          }}
        ></Marker>
      );
    },
  );

  return <Map location={location} markers={markers} />;
}
