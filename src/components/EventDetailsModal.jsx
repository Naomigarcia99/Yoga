export default function EventDetailsModal({ event, onClose, onDelete }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-3xl shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-pink-700">Event Details</h2>
        <p>
          <strong>Title:</strong> {event.title}
        </p>
        <p>
          <strong>Start:</strong> {new Date(event.start).toLocaleString()}
        </p>
        <p>
          <strong>End:</strong>{" "}
          {event.end ? new Date(event.end).toLocaleString() : "No end date"}
        </p>
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onDelete} className="rounded-full bg-red-200 hover:bg-red-500 text-red-500 hover:text-white">
            Delete
          </button>
          <button onClick={onClose} className="rounded-full bg-pink-100 hover:bg-pink-300 text-pink-300 hover:text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
