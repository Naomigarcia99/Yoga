import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import UserForm from "./UserForm";

const UserItem = ({ user, index }) => {
  const { deleteUser } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    deleteUser(user.id);
  };

  return (
    <tr
      className={`${
        index % 2 === 0 ? "bg-pink-50" : "bg-white"
      } hover:bg-pink-200`}
    >
      {isEditing ? (
        <td>
          <UserForm user={user} setIsEditing={setIsEditing} />
        </td>
      ) : (
        <>
          <td className="py-3 px-6">{user.name}</td>
          <td className="py-3 px-6">{user.email}</td>
          <td className="py-3 px-6 text-center flex gap-2 justify-center">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-200 hover:bg-yellow-300 rounded-full text-yellow-600 hover:text-white"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-300 hover:bg-red-400 text-red-800 rounded-full hover:text-white"
            >
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default UserItem;
