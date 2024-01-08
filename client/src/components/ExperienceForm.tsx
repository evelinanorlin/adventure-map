import { SetStateAction, useState } from "react";
import SearchLocation from "./SearchLocation";
import TextEditor from "./TextEditor";
import { categories } from "../data/categories";
import { priceIntervals } from "../data/prices";

export default function ExperienceForm() {
  const [location, setLocation] = useState<
    SetStateAction<{
      latitude: number;
      longitude: number;
      display_name: string;
      zoom: number;
    }>
  >();
  console.log(location);
  const [description, setDescription] = useState("");

  const categoriesHtml = categories.map((category, index) => {
    return(
      <option value={category} key={index}>{category}</option>
    )
  });

  const priceIntervalsHtml = priceIntervals.map((priceInterval, index) => {
    return(
      <option value={priceInterval} key={index}>{priceInterval}</option>
    )
  });

  return (
    <form>
      <label>
        <p>Vad? *</p>
        <input
          type="text"
          name="name"
          placeholder="ex paddla på Vänern"
          required
        />
      </label>
      <br />
      <label>
        <p>
          Var? * <br />
          <span>Ange adress eller markera på karta</span>
        </p>
        <div className="row">
          <SearchLocation setLocation={setLocation} />
          <button className="btn btn-tertiary">Välj på karta</button>
        </div>
      </label>
      <label>
        <p>Länk till mer information</p>
        <input
          type="url"
          name="link"
          placeholder="ex https://www.vandringsleden.se"
        />
      </label>
      <br />
      <div className="row justify-between">
      <label>
        <p>Kostnad</p>
        <select id="price" name="price-intervals" required>
        {priceIntervalsHtml}
        </select>
        </label>
        <label>
        <p>Kategori</p>
        <select id="price" name="price-intervals" required>
          {categoriesHtml}
        </select>
        </label>
        </div>
      <label>
        <p>
          Beskrivning* <br />
          <span>Beskriv gärna upplevelsen utförligt</span>
        </p>
        <TextEditor description={description} setDescription={setDescription} />
      </label>
      <br />
      <label>
        <p>Bild</p>
        <input className="img-input" type="file" name="image" accept="image/png, image/gif, image/jpeg"/>
      </label>
      <label>
        <p>Ditt namn* <br /> <span>Som det visas på sidan</span></p>
        <input
          type="text"
          name="name"
          placeholder="ex Anna Andersson"
          required
        />
      </label>
      <label>
        <p>Länk till sociala medier <br /> <span>Om du vill dela din instagram, youTube, blogg etc.</span></p>
        <input
          type="url"
          name="name"
          placeholder="ex www.instagram.com/dittgrymmakonto"
        />
      </label>
      <button className="btn btn-primary m-t-5">Tipsa om upplevelse</button>
    </form>
  );
}
