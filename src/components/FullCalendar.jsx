import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEventsContext } from "../context/EventsContext";
import CalendarForm from "./CalendarForm";
import EventDetailsModal from "./EventDetailsModal";
import CalendarFormModal from "./CalendarFormModal";

function Calendar() {
  const { events, deleteEvent } = useEventsContext();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setIsFormModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsFormModalOpen(false);
    setSelectedDate(null);
    setSelectedEvent(null);
  };

  const handleEventClick = (info) => {
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
    });
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;

    try {
      await deleteEvent(selectedEvent.id);
      alert("Event deleted successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto pt-24">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>

      <EventDetailsModal
        event={selectedEvent}
        onClose={handleCloseModal}
        onDelete={handleDeleteEvent}
      />

      <CalendarFormModal
        isOpen={isFormModalOpen}
        selectedDate={selectedDate}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default Calendar;
