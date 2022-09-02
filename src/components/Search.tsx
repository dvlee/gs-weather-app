import { ReactComponent as LoadingSpinner } from "../assets/LoadingSpinner.svg";
import React, { ComponentType, useEffect, useState } from "react";
import { useFindCityByNameMutation } from "../app/services/geoApi";
import { getCityName } from "../app/utils";
import { CityProps } from "../types";

interface SearchProps {
  onCitySelect: (city: CityProps) => void;
}

const Search: ComponentType<SearchProps> = ({ onCitySelect }) => {
  const [q, setQ] = useState<string>("");
  const [find, { isLoading }] = useFindCityByNameMutation();
  const [result, setResult] = useState<CityProps[]>([]);

  useEffect(() => {
    if (q.length > 2 && !isLoading)
      find({ q }).unwrap().then(setResult).catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQ(event.target.value);
  };

  const handleSelectCity = (city: CityProps) => () => {
    onCitySelect(city);
    setResult([]);
  };

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        onChange={handleChange}
        placeholder="Введите название города"
      />
      {isLoading && (
        <span className="search__loading">
          <LoadingSpinner />
        </span>
      )}

      {result.length > 0 && (
        <div className="search__result">
          <div className="search__resultList">
            {result.map((item: CityProps, index: number) => (
              <div
                className="search__resultListItem"
                key={index}
                onClick={handleSelectCity(item)}
              >
                <span>{getCityName(item)}</span>,<span> {item.country}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
