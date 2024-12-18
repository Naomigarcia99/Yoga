import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const EventsContext = createContext();

export const useEventsContext = () => useContext(EventsContext);

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3002/events");
      setEvents(response.data);
    } catch (error) {
      console.log("error fetching events: ", error);
    }
  };

  const addEvent = async (event) => {
    console.log("Datos enviados en addEvent:", event);
    try {
      const response = await axios.post("http://localhost:3002/events", event);
      console.log("Respuesta de addEvent:", response.data);
      setEvents((prevEvents) => [...prevEvents, response.data]);
    } catch (error) {
      console.log("Error adding event: ", error);
    }
  };

  const editEvent = async (id, updatedEvent) => {
    console.log(`Editando event con ID ${id}:`);
    try {
      const response = await axios.put(
        `http://localhost:3002/events/${id}`,
        updatedEvent
      );
      console.log("Respuesta de editEvent:", response.data);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id ? { ...event, ...updatedEvent } : event
        )
      );
    } catch (error) {
      console.log("Error editing event: ", error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/events/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.log("Error deleting event: ", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider
      value={{ events, addEvent, editEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
};
