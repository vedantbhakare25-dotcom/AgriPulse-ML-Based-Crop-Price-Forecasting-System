import { createContext, useState } from "react";

export const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [crop, setCrop] = useState("");

  return (
    <LocationContext.Provider
      value={{
        state,
        setState,
        district,
        setDistrict,
        crop,
        setCrop,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}