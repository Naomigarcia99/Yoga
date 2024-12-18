import { useState, useEffect } from "react";
import { useEventsContext } from "../context/EventsContext";

export default function SimpleEventForm({ selectedDate, onClose }) {
  const { addEvent } = useEventsContext();

  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (selectedDate) {
      setStart(selectedDate);
    }
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !start) {
      alert("Title and Start Date are required.");
      return;
    }

    try {
      await addEvent({ title, start, end });
      alert("Event added successfully!");
      setTitle("");
      setStart("");
      setEnd("");
      onClose();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 rounded-2xl shadow-xl bg-pink-50"
    >
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input rounded-xl pl-2"
        required
      />

      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="input rounded-xl pl-2"
        required
      />

      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="input rounded-xl pl-2"
      />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-pink-200 hover:bg-pink-300 text-pink-400 hover:text-white px-4 py-2"
        >
          Cancel
        </button>
        <button type="submit" className="bg-green-200 hover:bg-green-400 text-green-500 hover:text-white rounded-full">
          Add Event
        </button>
      </div>
    </form>
  );
}
