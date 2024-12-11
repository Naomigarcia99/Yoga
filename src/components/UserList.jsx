import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import UserItem from "./UserItem";
import UserForm from "./UserForm";

const UserList = () => {
  const { users } = useUserContext();
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex justify-start w-full max-w-5xl mt-4">
        <h1 className="font-bold text-xl">CRUD database</h1>
      </div>

      <div className="overflow-x-auto w-full max-w-5xl mt-4 shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-300">
              <th className="py-3 px-6 text-gray-700 font-semibold">Name</th>
              <th className="py-3 px-6 text-gray-700 font-semibold">Email</th>
              <th className="py-3 px-6 text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserItem key={user.id} user={user} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      {isCreating && (
        <div className="mt-4 w-full max-w-5xl">
          <UserForm setIsCreating={setIsCreating} />
        </div>
      )}

      <div className="flex justify-start w-full max-w-5xl mt-4">
        <button
          className="bg-green-200 hover:bg-green-300 text-green-600 hover:text-white rounded-full"
          onClick={() => setIsCreating(true)}
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default UserList;
