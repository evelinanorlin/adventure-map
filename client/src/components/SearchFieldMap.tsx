import SearchLocation from "./SearchLocation";

interface SearchFieldMapProps {
  setLocation: React.Dispatch<React.SetStateAction<{
    latitude: number;
    longitude: number;
    display_name: string;
    zoom: number;
  }>>;
}

export default function SearchFieldMap({setLocation}: SearchFieldMapProps) {
  return (
    <div className="search-field-map">
      <SearchLocation setLocation={setLocation}/>
    </div>
  );
}