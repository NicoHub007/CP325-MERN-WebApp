import { useEffect, useState } from "react";
import axios from "axios";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    notes: "",
  });

  const API_URL = "http://localhost:5050/api/orders";

  const fetchOrders = async () => {
    try {
      const response = await axios.get(API_URL);
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const addOrder = async () => {
    try {
      await axios.post(API_URL, formData);
      fetchOrders();
    } catch (err) {
      console.error("Error adding order:", err);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder();
  };

  return (
    <div>
      <h2>Orders</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Order Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          required
        />
        <textarea
          name="notes"
          placeholder="Notes"
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        ></textarea>
        <button type="submit">Add Order</button>
      </form>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.name} - {order.category} - {order.price} - {order.quantity}
            <button onClick={() => deleteOrder(order._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderPage;
