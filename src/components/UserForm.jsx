import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";

const UserForm = ({ user, setIsEditing, setIsCreating }) => {
  const { addUser, editUser } = useUserContext();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email };
    console.log("Datos enviados desde formulario:", userData);

    if (user) {
      editUser(user.id, userData);
    } else {
      addUser(userData);
    }
    if (setIsEditing) setIsEditing(false);
    if (setIsCreating) setIsCreating(false);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit} className="flex p-4 bg-white shadow-md rounded-lg space-x-6 w-full justify-center">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="shadow border rounded px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="shadow border rounded px-3"
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          className="bg-pink-200 hover:bg-pink-300 text-pink-600 hover:text-white"
        >
          {user ? "Update User" : "Add User"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
