import "./App.css";
import TypeAhead from "./components/TypeAhead/TypeAhead";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
const API_URL = `https://restcountries.com/v2/all`;

function App() {
  const [countries, serCountries] = useState([]);

  const getCountries = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    const countryNames = data?.map((country) => country?.name);
    serCountries(countryNames);
  };

  useEffect(() => {
    getCountries();
    return;
  }, []);

  return (
    <div className="App">
      <Container maxWidth="lg">
        <h1>TypeAhead</h1>
        <h4>Simple auto complete search with multiselect</h4>
        <TypeAhead data={countries} />
      </Container>
    </div>
  );
}

export default App;
