import React, { useState, useEffect } from "react";
import { useSelect } from "./useSelect";
import { useBreedList } from "./useBreedList";
import SelectComponent from "./SelectComponent";
import Result from "./Result";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animalProps] = useSelect("");
  const [breedProps] = useSelect("");
  const [breeds] = useBreedList(animalProps.value);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animalProps.value}&location=${location}&breed=${breedProps.value}`
    );
    const json = await res.json();
    console.log(json.pets);
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />{" "}
        </label>
        <SelectComponent
          labelName="animal"
          props={animalProps}
          options={ANIMALS}
        />
        <SelectComponent
          labelName="Breed"
          props={breedProps}
          options={breeds}
        />
        <button>Submit</button>
      </form>
      <Result pets={pets} />
    </div>
  );
};

export default SearchParams;
