import { useState } from "react";
import axios from "axios";
import "./Mon3.css";
import { useNavigate } from "react-router-dom";

function Mon3() {
  const [pname, setPname] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);

  const addProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/addproduct",
        {
          pname,
          price,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);

      setPname("");
      setPrice("");
      setDescription("");
    } catch (err) {
      console.log(err);
      alert("Please Login First");
    }
  };

  const show = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
      alert("Please Login First");
    }
  };
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="product-container">
      <h2>Add Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={pname}
        onChange={(e) => setPname(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={addProduct}>Add Product</button>
      <br />
      <button onClick={show}>Show Products</button>

      <div className="product-list">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <h3>{p.pname}</h3>
            <p>Price: ₹{p.price}</p>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Mon3;
