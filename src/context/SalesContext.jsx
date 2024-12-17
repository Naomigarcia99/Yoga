import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const SaleContext = createContext();

export const useSaleContext = () => useContext(SaleContext);

export const SaleProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const response = await axios.get("http://localhost:3002/sales");
      setSales(response.data);
    } catch (error) {
      console.log("error fetching sales: ", error);
    }
  };

  const addSale = async (sale) => {
    console.log("Datos enviados en addSale:", sale);
    try {
      const response = await axios.post("http://localhost:3002/sales", sale);
      console.log("Respuesta de addSale:", response.data);
      setSales((prevSales) => [...prevSales, response.data]);
    } catch (error) {
      console.log("Error adding sale: ", error);
    }
  };

  const editSale = async (id, updatedSale) => {
    console.log(`Editando venta con ID ${id}:`);
    try {
      const response = await axios.put(
        `http://localhost:3002/sales/${id}`,
        updatedSale
      );
      console.log("Respuesta de editSale:", response.data);
      setSales((prevSale) =>
        prevSale.map((sale) =>
          sale.id === id ? { ...sale, ...updatedSale } : sale
        )
      );
    } catch (error) {
      console.log("Error editing sale: ", error);
    }
  };

  const deleteSale = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/sales/${id}`);
      setSales((prevSale) => prevSale.filter((sale) => sale.id !== id));
    } catch (error) {
      console.log("Error deleting sale: ", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <SaleContext.Provider value={{ sales, addSale, editSale, deleteSale }}>
      {children}
    </SaleContext.Provider>
  );
};
