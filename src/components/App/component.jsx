import { useState, useEffect } from "react";
import useFetch from "./hooks";
import { getRandomInteger, shuffleArray } from "./utils";
import "./style.css";
import Flag from "src/components/Flag/component";
import ContinentButton from "src/components/ContinentButton/component";
import Counter from "src/components/Counter/component";
import CountryToBeFound from "src/components/CountryToBeFound/component";
import FailedAttemptsCounter from "src/components/FailedAttemptsCounter/component";
import EndGame from "src/components/EndGame/component";
import Footer from "src/components/Footer/component";
const CONTINENTS = [
  "africa",
  "europe",
  "asia",
  "america",
  "oceania",
  "south america",
  "all",
];
const FILTER = {
  europe: (country) =>
    country.name.common != "Svalbard and Jan Mayen" &&
    country.name.common != "Åland Islands",
  africa: (country) =>
    country.name.common != "British Indian Ocean Territory" &&
    country.name.common != "Western Sahara",
  asia: () => true,
  "south america": (country) => country.subregion == "South America",
  america: (country) => country.subregion != "South America",
  all: (country) =>
    country.name.common != "Svalbard and Jan Mayen" &&
    country.name.common != "Åland Islands" &&
    country.name.common != "British Indian Ocean Territory" &&
    country.name.common != "Western Sahara",
};
function App() {
  const [continent, setContinent] = useState(null);
  const [Countries, setCountries] = useState();
  const [randomCountries, setRandomCountries] = useState(null);
  const [countryToBeFound, setCountryToBeFound] = useState(null);
  const [countryCounter, setCountryCounter] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isAnswer, setIsAnswer] = useState("");
  const [endGame, setEndGame] = useState(false);

  const url =
    continent == null
      ? null
      : continent == "all"
      ? `https://restcountries.com/v3.1/all?fields=name,capital,flags,population,languages,subregion`
      : `https://restcountries.com/v3.1/region/${continent}?fields=name,capital,flags,population,languages,subregion`;

  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    let shuffledArray;
    if (data) {
      if (continent == "europe") {
        shuffledArray = shuffleArray(
          data.filter(
            (country) =>
              country.name.common != "Svalbard and Jan Mayen" &&
              country.name.common != "Åland Islands"
          )
        );
      } else {
        console.log(data[0].subregion);

        console.log(FILTER[continent]);

        shuffledArray = shuffleArray(data.filter(FILTER[continent]));
      }
      console.log(shuffledArray.map((c) => c.name.common));

      setCountries(shuffledArray);
      const someCountries = shuffledArray.slice(0, 9);
      setRandomCountries(someCountries);
      setCountryToBeFound(
        someCountries[getRandomInteger(0, someCountries.length)]
      );
    } else if (error) {
      console.log(error);
    }
  }, [data, error]);

  function onFlagClick(name) {
    if (name == countryToBeFound.name.common) {
      setIsAnswer("correct");
      const decreasedArray = Countries.filter(
        (country) => country.name.common != name
      );
      if (decreasedArray.length == 0) {
        setEndGame(true);
      }
      setTimeout(() => {
        setCountries(decreasedArray);
        setCountryCounter((prevScore) => prevScore + 1);
        const shuffledArray = shuffleArray(decreasedArray);
        const someCountries = shuffledArray.slice(0, 9);
        setCountryToBeFound(
          someCountries[getRandomInteger(0, someCountries.length)]
        );
        setRandomCountries(someCountries);
      }, 800);
    } else {
      setIsAnswer("wrong");
      setFailedAttempts((prevAttempts) => prevAttempts + 1);
    }
    setTimeout(() => {
      setIsAnswer("");
    }, 800);
  }
  function goBackToContinents() {
    setEndGame(false);
    setContinent(null);
    setCountryCounter(0);
    setFailedAttempts(0);
  }
  if (endGame)
    return (
      <div className="app">
        <EndGame
          continent={continent}
          goBackToContinents={goBackToContinents}
          totalCountries={data.length}
          failedAttempts={failedAttempts}
        />
      </div>
    );
  else if (continent)
    return (
      <div className="app">
        <div className="dashboard">
          <button className="end-game-btn" onClick={goBackToContinents}>
            x
          </button>

          <CountryToBeFound
            countryToBeFound={countryToBeFound}
            isAnswer={isAnswer}
          />
          <Counter
            countryCounter={countryCounter}
            totalCountries={data?.length}
            isAnswer={isAnswer}
          />
          <FailedAttemptsCounter
            isAnswer={isAnswer}
            failedAttempts={failedAttempts}
          />
          <div className={`flags-wrapper ${isAnswer}`}>
            {loading && <span className="spinner">Loading...</span>}
            {!loading &&
              randomCountries &&
              randomCountries.map((country) => (
                <Flag
                  isAnswer={isAnswer}
                  key={country.name.common}
                  name={country.name.common}
                  countryToBeFound={countryToBeFound}
                  onFlagClick={() => onFlagClick(country.name.common)}
                  flag={country.flags}
                />
              ))}
          </div>

          <Footer
            population={countryToBeFound?.population}
            languages={countryToBeFound?.languages}
            capital={countryToBeFound?.capital}
            subregion={countryToBeFound?.subregion}
            isAnswer={isAnswer}
          />
        </div>
      </div>
    );
  else
    return (
      <div className="app">
        <div className={`continents-wrapper`}>
          {CONTINENTS.map((continent) => (
            <ContinentButton
              key={continent}
              name={continent}
              setContinent={setContinent}
            />
          ))}
        </div>
      </div>
    );
}

export default App;
