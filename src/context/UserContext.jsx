import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3002/users");
      setUsers(response.data);
    } catch (error) {
      console.log("error fetching users: ", error);
    }
  };

  const addUser = async (user) => {
    console.log("Datos enviados en addUser:", user);
    try {
      const response = await axios.post("http://localhost:3002/users", user);
      console.log("Respuesta de addUser:", response.data);
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (error) {
      console.log("Error adding user: ", error);
    }
  };

  const editUser = async (id, updatedUser) => {
    console.log(`Editando usuario con ID ${id}:`);
    try {
      const response = await axios.put(`http://localhost:3002/users/${id}`, updatedUser);
      console.log("Respuesta de editUser:", response.data);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        )
      );
    } catch (error) {
      console.log("Error editing user: ", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.log("Error deleting user: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
