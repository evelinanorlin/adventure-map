import { ChangeEvent, useContext, useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import ConfirmationPopup from "./ConfirmationPopup";
import { categories } from "../data/categories";
import { priceIntervals } from "../data/prices";
import { IExperience } from "./interfaces/IExperience";
import { ILocation } from "./interfaces/ILocation";
import {
  validateDropdown,
  validateForm,
  validateLocation,
  validateTextInput,
} from "../functions/validateForm";
import { handleImg } from "../functions/handleImg";
import { addExperience } from "../services/experinceServices";
import { uploadImage } from "../functions/imageUpload";
import "leaflet/dist/leaflet.css";
import { ClickableMapContext } from "../contexts/ClickableMapContext";
import { ChosenLocationContext } from "../contexts/ChosenLocationContext";
import { ShowMarkerContext } from "../contexts/ShowMarkerContext";

export default function ExperienceForm() {
  // State variables
  const [location, setLocation] = useState<ILocation>({
    latitude: 0,
    longitude: 0,
    display_name: "",
    zoom: 0,
  });
  const [locationValid, setLocationValid] = useState<boolean>(true);
  const [experienceName, setExperienceName] = useState<string>("");
  const [experienceNameValid, setExperienceNameValid] = useState<boolean>(true);
  const [link, setLink] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [priceValid, setPriceValid] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");
  const [categoryValid, setCategoryValid] = useState<boolean>(true);
  const [description, setDescription] = useState<string>("");
  const [descriptionValid, setDescriptionValid] = useState<boolean>(true);
  const [image, setImage] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userNameValid, setUserNameValid] = useState<boolean>(true);
  const [userLink, setUserLink] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string>("");
  const isReviewed = false;

  // Context variables
  const clickableMap = useContext(ClickableMapContext).clickable;
  const setClickableMap = useContext(ClickableMapContext).setClickable;
  const chosenLocation = useContext(ChosenLocationContext).chosenLocation;
  const setChosenLocation = useContext(ChosenLocationContext).setChosenLocation;
  const setShowMarker = useContext(ShowMarkerContext).setShowMarker;

  // Confirmation variables
  const confirmationAction = "lägga till";
  const confirmationExperience = "upplevelsen";
  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showConfirmationMessage, setShowConfirmationMessage] =
    useState<boolean>(false);

  // useEffects
  useEffect(() => {
    const isValid = validateTextInput(description);
    setDescriptionValid(isValid);
  }, [description]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Free memory when this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (confirmed) {
      setShowConfirmation(false);
      handleSubmit();
      setShowConfirmationMessage(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmed]);

  // Event Handlers
  const choseLocation = () => {
    setClickableMap(!clickableMap);
    setShowMarker(true);
  };

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    onSelectFile(e);
    try {
      const img = await handleImg(e.target.files);
      setImage(img);
    } catch (error) {
      console.error("Error in handleFileChange:", error);
    }
  };

  // Form Submission
  const handleSubmit = async () => {
    const experienceData: IExperience = {
      experienceName: experienceName,
      location: location,
      link: link,
      price: price,
      category: category,
      description: description,
      imageURL: imageUrl,
      userName: userName,
      userLink: userLink,
      isReviewed: isReviewed,
      date: new Date(),
    };

    if (image.length > 0) {
      const imgData = await uploadImage(image);
      setImageUrl(imgData.url);
      addExperience({ ...experienceData, imageURL: imgData.url });
    } else {
      addExperience(experienceData);

      // Reset form fields
      setExperienceName("");
      setLocation({ latitude: 0, longitude: 0, display_name: "", zoom: 0 });
      setLink("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImage("");
      setImageUrl("");
      setUserName("");
      setUserLink("");
      setShowMarker(false);
      setChosenLocation(null);
    }
  };

  const handleButtonClick = () => {
    const experienceData: IExperience = {
      experienceName: experienceName,
      location: chosenLocation ? chosenLocation : location,
      link: link,
      price: price,
      category: category,
      description: description,
      imageURL: imageUrl,
      userName: userName,
      userLink: userLink,
      isReviewed: isReviewed,
      date: new Date(),
    };
    const isValid = validateForm(experienceData);
    if (!isValid) {
      setErrorMessage(true);
      setExperienceNameValid(validateTextInput(experienceName));
      setLocationValid(validateLocation(location));
      setPriceValid(validateDropdown(price));
      setCategoryValid(validateDropdown(category));
      setDescriptionValid(validateTextInput(description));
      setUserNameValid(validateTextInput(userName));
    } else {
      setLocation(chosenLocation ? chosenLocation : location);
      setShowConfirmation(true);
    }
  };

  // HTML Elements
  const categoriesHtml = categories.map((category, index) => (
    <option value={category} key={index}>
      {category}
    </option>
  ));

  const priceIntervalsHtml = priceIntervals.map((priceInterval, index) => (
    <option value={priceInterval} key={index}>
      {priceInterval}
    </option>
  ));

  const errorMessageHtml = errorMessage ? (
    <p className="error-message">Fyll i alla obligatoriska fält</p>
  ) : null;

  if (!showConfirmationMessage) {
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
                setExperienceNameValid(isValid);
              }}
              className={experienceNameValid ? "" : "unvalid"}
            />
          </label>
          <br />
          <label>
            <p>Var?*</p>
            {locationValid ? (
              ""
            ) : (
              <p className="error-message">Välj en plats på kartan</p>
            )}
            {chosenLocation ? (
              <div>
                <p className="chosen-location">
                  {chosenLocation.display_name
                    ? chosenLocation.display_name
                    : chosenLocation.longitude + ", " + chosenLocation.latitude}
                </p>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={choseLocation}
                >
                  Ändra plats
                </button>
              </div>
            ) : (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={choseLocation}
              >
                Välj en plats på kartan
              </button>
            )}
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
                  setPriceValid(isValid);
                }}
                className={priceValid ? "" : "unvalid"}
              >
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
                  setCategoryValid(isValid);
                }}
                className={categoryValid ? "" : "unvalid"}
              >
                {categoriesHtml}
              </select>
            </label>
          </div>
          <label>
            <p>
              Beskrivning* <br />
              <span>Beskriv gärna upplevelsen utförligt</span>
            </p>
            {descriptionValid ? (
              ""
            ) : (
              <p className="error-message">Beskrivningen får inte vara tom</p>
            )}
            <TextEditor
              description={description}
              setDescription={setDescription}
            />
          </label>
          <br />
          <label>
            <p>Bild</p>
            <input
              className="img-input"
              type="file"
              name="image"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleFileChange}
            />
            {selectedFile && <img src={preview} className="thumbnail-img" />}
          </label>
          <label>
            <p>
              Ditt namn* <br /> <span>Som det visas på sidan</span>
            </p>
            <input
              type="text"
              name="name"
              placeholder="ex Anna Andersson"
              onChange={(e) => {
                setUserName(e.target.value);
                const isValid = validateTextInput(e.target.value);
                setUserNameValid(isValid);
              }}
              className={userNameValid ? "" : "unvalid"}
            />
          </label>
          <label>
            <p>
              Länk till sociala medier <br />{" "}
              <span>Om du vill dela din instagram, youTube, blogg etc.</span>
            </p>
            <input
              type="url"
              name="name"
              placeholder="ex www.instagram.com/dittgrymmakonto"
              onChange={(e) => setUserLink(e.target.value)}
            />
          </label>
          <button
            className="btn btn-primary m-t-5"
            type="button"
            onClick={handleButtonClick}
          >
            Tipsa om upplevelse
          </button>
        </form>
        {showConfirmation ? (
          <ConfirmationPopup
            action={confirmationAction}
            experience={confirmationExperience}
            setConfirmed={setConfirmed}
            setShowConfirmation={setShowConfirmation}
          />
        ) : null}
      </>
    );
  } else {
    return <p>Tack för ditt bidrag!</p>;
  }
}
