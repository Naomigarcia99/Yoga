import CalendarForm from "./CalendarForm";

export default function EventFormModal({ isOpen, selectedDate, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-3xl shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add New Event</h2>
        <CalendarForm selectedDate={selectedDate} onClose={onClose} />
      </div>
    </div>
  );
}
