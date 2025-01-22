import { Routes, Route } from "react-router";
import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import GroceryPage from "./pages/GroceryPage";
import OrderPage from "./pages/OrderPage";
import About from "./pages/About";
import Home from "./pages/Home";
import EmployeePage from "./pages/EmployeePage"
import Nav from "./components/Nav";
import "./App.css";
import { getUser } from "./utilities/users-services";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      {
        user
          ?
          <>
            <Nav />
            <h1>Grocery Ease Management</h1>
            <div>Hi {user.name}</div>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/grocery" element={<GroceryPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/employee" element={<EmployeePage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </>
  );
}

export default App;
