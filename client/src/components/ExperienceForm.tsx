import { ChangeEvent, useEffect, useState } from "react";
import SearchLocation from "./SearchLocation";
import TextEditor from "./TextEditor";
import { categories } from "../data/categories";
import { priceIntervals } from "../data/prices";
import { IExperience, Image } from "./interfaces/IExperience";
import { ILocation } from "./interfaces/ILocation";
import { validateDropdown, validateForm, validateLocation, validateTextInput } from "../functions/validateForm";
import { handleImg } from "../functions/handleImg";

export default function ExperienceForm() {
  const [location, setLocation] = useState<ILocation>({
    latitude: 0,
    longitude: 0,
    display_name: "",
    zoom: 0,
  })
  const [locationValid, setLocationValid] = useState<boolean>(true);
  const [experienceName, setExperienceName] = useState("");
  const [experienceNameValid, setExperienceNameValid] = useState<boolean>(true);
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [priceValid, setPriceValid] = useState<boolean>(true);
  const [category, setCategory] = useState("");
  const [categoryValid, setCategoryValid] = useState<boolean>(true);
  const [description, setDescription] = useState("");
  const [descriptionValid, setDescriptionValid] = useState<boolean>(true);
  const [image, setImage] = useState<Image>({preview: "", data: undefined});
  const [userName, setUserName] = useState("");
  const [userNameValid, setUserNameValid] = useState<boolean>(true);
  const [userLink, setUserLink] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const isValid = validateTextInput(description);
    setDescriptionValid(isValid);

  }, [description]);

  useEffect(() => {
    const isValid = validateLocation(location);
    setLocationValid(isValid);
  }, [location])

  useEffect(() => {
    if (!selectedFile) {
        setPreview("")
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e:  ChangeEvent<HTMLInputElement>)=> {
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined)
          return
      }

      // I've kept this example simple by using the first image instead of multiple
      setSelectedFile(e.target.files[0])
  }
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const experienceData: IExperience = {
      experienceName: experienceName,
      location: location,
      link: link,
      price: price,
      category: category,
      description: description,
      image: image,
      userName: userName,
      userLink: userLink,
    }
    const isValid = validateForm(experienceData);
    if(!isValid) {
      setErrorMessage(true);
      setExperienceNameValid(validateTextInput(experienceName));
      setLocationValid(validateLocation(location));
      setPriceValid(validateDropdown(price));
      setCategoryValid(validateDropdown(category));
      setDescriptionValid(validateTextInput(description));
      setUserNameValid(validateTextInput(userName));

      return;
    } else{
      console.log(experienceData)
      // HÄR SKICKAR VI TILL API SEN
      //lägga till isReviewed: false??
    }
  };

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

  const errorMessageHtml = errorMessage ? <p className="error-message">Fyll i alla obligatoriska fält</p> : null;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files === null) return;
    onSelectFile(e);
    const img = await handleImg(e.target.files);
    setImage(img);
  };

  return (
    <>
    {errorMessageHtml}
    <form onSubmit={handleSubmit}>
      <label>
        <p>Vad?*</p>
        <input
          type="text"
          name="name"
          placeholder="ex paddla på Vänern"
          onChange={(e) => {
            setExperienceName(e.target.value); 
            const isValid = validateTextInput(e.target.value);
            setExperienceNameValid(isValid);}}
          className={experienceNameValid === true ? "" : "unvalid"}
        />
      </label>
      <br />
      <label>
        <p>
          Var?* <br />
          <span>Ange adress eller markera på karta</span>
        </p>
        {locationValid ? "" : <p className="error-message">Välj en plats</p>}
        <div className="row">
          <SearchLocation setLocation={setLocation}/>
          <button className="btn btn-tertiary" type="button" onClick={(e) => e.preventDefault()}>Välj på karta</button>
        </div>
      </label>
      <label>
        <p>Länk till mer information</p>
        <input
          type="url"
          name="link"
          placeholder="ex https://www.vandringsleden.se"
          onChange={(e) => setLink(e.target.value)}
        />
      </label>
      <br />
      <div className="row justify-between">
      <label>
        <p>Kostnad*</p>
        <select 
        id="price" 
        name="price-intervals" 
        onChange={(e) => {
          setPrice(e.target.value);
          const isValid = validateDropdown(e.target.value);
          setPriceValid(isValid);}}
        className={priceValid ? "" : "unvalid"}>
        {priceIntervalsHtml}
        </select>
        </label>
        <label>
        <p>Kategori*</p>
        <select 
        id="price" 
        name="price-intervals" 
        onChange={(e) => {
          setCategory(e.target.value);
          const isValid = validateDropdown(e.target.value);
          setCategoryValid(isValid);}
        }
        className={categoryValid ? "" : "unvalid"}>
          {categoriesHtml}
        </select>
        </label>
        </div>
      <label>
        <p>
          Beskrivning* <br />
          <span>Beskriv gärna upplevelsen utförligt</span>
        </p>
        {descriptionValid ? "" : <p className="error-message">Beskrivningen får inte vara tom</p>}
        <TextEditor description={description} setDescription={setDescription} />
      </label>
      <br />
      <label>
        <p>Bild</p>
        <input className="img-input" type="file" name="image" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange}/>
        {selectedFile &&  <img src={preview} className="thumbnail-img"/> }
      </label>
      <label>
        <p>Ditt namn* <br /> <span>Som det visas på sidan</span></p>
        <input
          type="text"
          name="name"
          placeholder="ex Anna Andersson"
          onChange={(e) => {
            setUserName(e.target.value)
            const isValid = validateTextInput(e.target.value);
            setUserNameValid(isValid);}}
          className={userNameValid === true ? "" : "unvalid"}
        />
      </label>
      <label>
        <p>Länk till sociala medier <br /> <span>Om du vill dela din instagram, youTube, blogg etc.</span></p>
        <input
          type="url"
          name="name"
          placeholder="ex www.instagram.com/dittgrymmakonto"
          onChange={(e) => setUserLink(e.target.value)}
        />
      </label>
      <button className="btn btn-primary m-t-5" type="submit">Tipsa om upplevelse</button>
    </form>
    </>
  );
}
