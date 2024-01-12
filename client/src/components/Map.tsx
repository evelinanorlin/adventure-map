import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import { ILocation } from "./interfaces/ILocation";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useContext, useState } from "react";
import "leaflet/dist/leaflet.css";
import { ClickableMapContext } from "../contexts/ClickableMapContext";
import { ChosenLocationContext } from "../contexts/ChosenLocationContext";
import { getLocationName } from "../services/mapServices";

interface IMapProps {
  location: ILocation;
  markers: React.ReactNode[] | null;
}

export default function Map({ location, markers }: IMapProps) {
  const [markerLocation, setMarkerLocation] = useState<LatLngExpression>([
    0, 0,
  ]);
  const [showMarker, setShowMarker] = useState<boolean>(false);
  const API_KEY: string = import.meta.env.VITE_MAPTILER_KEY;
  const clickableMap = useContext(ClickableMapContext).clickable;
  const setClickableMap = useContext(ClickableMapContext).setClickable;
  const setChosenLocation = useContext(ChosenLocationContext).setChosenLocation;

  const handleMapClick = async (e: LeafletMouseEvent) => {
    if (clickableMap === false) return;
    const { lat, lng } = e.latlng;
    setShowMarker(true);
    setMarkerLocation([lat, lng]);
    setClickableMap(false);
    const findLocation = await getLocationName(lng, lat);
    setChosenLocation({
      latitude: lat,
      longitude: lng,
      display_name: findLocation[0].place_name_sv,
      zoom: 13,
    });
  };

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
        attribution="Kommer snart"
      />
      <MapEventsHandler handleMapClick={handleMapClick} />
      {markers}
      {showMarker ? <Marker position={markerLocation}></Marker> : null}
    </MapContainer>
  );
}
interface MapEventsHandlerProps {
  handleMapClick: (e: LeafletMouseEvent) => void;
}
const MapEventsHandler: React.FC<MapEventsHandlerProps> = ({
  handleMapClick,
}) => {
  useMapEvents({
    click: (e) => handleMapClick(e),
  });
  return null;
};
