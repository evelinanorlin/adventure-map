import FilterSearch from "./FilterSearch";
import SearchLocation from "./SearchLocation";
import { ILocation } from "./interfaces/ILocation";

interface ISearchFieldMapProps {
  setLocation: React.Dispatch<ILocation>;
}

export default function SearchFieldMap({ setLocation }: ISearchFieldMapProps) {
  return (
    <div className="search-field-map">
      <SearchLocation setLocation={setLocation} />
      <FilterSearch />
    </div>
  );
}
