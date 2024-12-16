import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const LocationsContext = createContext();

export const useLocationsContext = () => useContext(LocationsContext);

export const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:3002/locations");
      setLocations(response.data);
    } catch (error) {
      console.log("error fetching locations: ", error);
    }
  };

  const addLocation = async (location) => {
    console.log("Datos enviados en addLocation:", location);
    try {
      const response = await axios.post(
        "http://localhost:3002/locations",
        location
      );
      console.log("Respuesta de addLocation:", response.data);
      setLocations((prevLocations) => [...prevLocations, response.data]);
    } catch (error) {
      console.log("Error adding location: ", error);
    }
  };

  const editLocation = async (id, updatedLocation) => {
    console.log(`Editando location con ID ${id}:`);
    try {
      const response = await axios.put(
        `http://localhost:3002/locations/${id}`,
        updatedLocation
      );
      console.log("Respuesta de editLocation:", response.data);
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location.id === id ? { ...location, ...updatedLocation } : location
        )
      );
    } catch (error) {
      console.log("Error editing location: ", error);
    }
  };

  const deleteLocation = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/locations/${id}`);
      setLocations((prevLocations) =>
        prevLocations.filter((location) => location.id !== id)
      );
    } catch (error) {
      console.log("Error deleting location: ", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <LocationsContext.Provider
      value={{ locations, addLocation, editLocation, deleteLocation }}
    >
      {children}
    </LocationsContext.Provider>
  );
};
