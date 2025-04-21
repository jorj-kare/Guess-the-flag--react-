import { useEffect, useState } from "react";
import { getRandomInteger, shuffleArray } from "./utils";
import "./style.css";
import Flag from "src/components/Flag/component";
import ContinentButton from "src/components/ContinentButton/component";
import Counter from "src/components/Counter/component";
import CountryToBeFound from "src/components/CountryToBeFound/component";
import Statistics from "src/components/Statistics/component";
import Footer from "src/components/Footer/component";
import Spinner from "src/components/Spinner/component";
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
  const [continent, setContinent] = useState("");
  const [countries, setCountries] = useState();
  const [randomCountries, setRandomCountries] = useState([null]);
  const [countryToBeFound, setCountryToBeFound] = useState(null);
  const [countryCounter, setCountryCounter] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isAnswer, setIsAnswer] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalNumberOfCountries, setTotalNumberOfCountries] = useState();

  async function fetchData(continent) {
    const url =
      continent == null
        ? null
        : continent == "all"
        ? `https://restcountries.com/v3.1/all?fields=name,capital,flags,population,languages,subregion`
        : `https://restcountries.com/v3.1/region/${continent}?fields=name,capital,flags,population,languages,subregion`;
    setLoading(true);
    setContinent(continent);
    const res = await fetch(url);

    const data = await res.json();
    if (!res.ok) {
      console.log("ERROR " + data.status + ":" + data.message);

      setError(data);
      console.log(res);
      return;
    }
    const shuffledArray = shuffleArray(data.filter(FILTER[continent]));
    const someCountries = shuffledArray.slice(0, 9);

    setCountries(shuffledArray);
    setTotalNumberOfCountries(shuffledArray);
    setRandomCountries(someCountries.slice(0, 9));
    setCountryToBeFound(
      someCountries[getRandomInteger(0, someCountries.length)]
    );

    setLoading(false);
  }

  function handleFlagClick(name) {
    if (name == countryToBeFound.name.common) {
      setIsAnswer("correct");
      const decreasedArray = countries.filter(
        (country) => country.name.common != name
      );

      setTimeout(() => {
        setCountryCounter((prevScore) => prevScore + 1);
        const shuffledArray = shuffleArray(decreasedArray);
        const someCountries = shuffledArray.slice(0, 9);
        setCountries(shuffledArray);
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
  function endGame() {
    setContinent("");
    setCountryCounter(0);
    setFailedAttempts(0);
  }
  if (continent && countries?.length == 0)
    return (
      <div className="app">
        <Statistics
          continent={continent}
          endGame={endGame}
          totalCountries={totalNumberOfCountries.length}
          failedAttempts={failedAttempts}
        />
      </div>
    );
  else if (continent)
    return (
      <div className="app">
        <div className="dashboard">
          <button className="end-game-btn" onClick={endGame}>
            x
          </button>

          <CountryToBeFound
            countryToBeFound={countryToBeFound}
            isAnswer={isAnswer}
          />
          <Counter
            title="Found:"
            className={isAnswer == "correct" ? isAnswer : ""}>
            {countryCounter}/{totalNumberOfCountries?.length}
          </Counter>
          <Counter
            title="Fails:"
            className={isAnswer == "wrong" ? isAnswer : ""}>
            {failedAttempts}
          </Counter>
          <div className={`flags-wrapper ${isAnswer}`}>
            {loading && <Spinner />}
            {!loading &&
              randomCountries &&
              randomCountries.map((country) => (
                <Flag
                  isAnswer={isAnswer}
                  key={country.name.common}
                  name={country.name.common}
                  countryToBeFound={countryToBeFound}
                  onFlagClick={() => handleFlagClick(country.name.common)}
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
              onClickBtn={() => fetchData(continent)}
            />
          ))}
        </div>
      </div>
    );
}

export default App;
