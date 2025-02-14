import { useState } from "react";
import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";

export default function CountrySelect() {
  const [selectedCountry, setSelectedCountry] = useState("");

  const selectCountryHandler = (value) => setSelectedCountry(value);

  // Have to register the languages you want to use
  countries.registerLocale(enLocale);
  countries.registerLocale(itLocale);

  // Returns an object not a list
  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  return (
    <div>
      <select className="form-select" aria-label="Default select example" value={selectedCountry} onChange={(e) => selectCountryHandler(e.target.value)}>
        {!!countryArr?.length &&
          countryArr.map(({ label, value }) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
      </select>
    </div>
  );
}
