
import React, { useState } from "react";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Shampoo", desc: "Gentle and refreshing", price: 200, qty: 1 },
    { id: 2, name: "Soap", desc: "Fragrant and foamy", price: 50, qty: 1 },
    { id: 3, name: "Toothpaste", desc: "Whitening and minty", price: 100, qty: 1 },
    { id: 4, name: "Conditioner", desc: "Smooth and silky", price: 150, qty: 1 }
  ]);

  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);
  const [desc, setDesc] = useState("");

  // ADD PRODUCT
  const addProduct = () => {
    if (!name || price <= 0) {
      alert("Please enter valid product name and price.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      qty: Number(qty),
      desc
    };

    setProducts([...products, newProduct]);
    setName("");
    setPrice("");
    setQty(1);
    setDesc("");
  };

  // REMOVE
  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // UPDATE QTY
  const updateQty = (id, type) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        if (type === "inc") return { ...p, qty: p.qty + 1 };
        if (type === "dec" && p.qty > 1) return { ...p, qty: p.qty - 1 };
      }
      return p;
    }));
  };

  const subtotal = products.reduce((acc, p) => acc + p.price * p.qty, 0);

  // APPLY COUPON
  const applyCoupon = (code) => {
    if (code === "GRAB50") {
      const d = subtotal * 0.5;
      setDiscount(d);
      setCouponMsg("GRAB50 coupon applied successfully!");
    } else {
      setCouponMsg("");
      alert("Invalid coupon code. Use GRAB50 for 50% discount.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Shopping Cart</h1>

      {/* ADD PRODUCT */}
      <div style={styles.addBox}>
        <h2>Add New Product</h2>

        <input style={styles.input} placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input style={styles.input} placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <input style={styles.input} type="number" value={qty} onChange={e => setQty(e.target.value)} />
        <input style={styles.input} placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />

        <button style={styles.addBtn} onClick={addProduct}>Add Product</button>
      </div>

      {/* PRODUCT LIST */}
      <div>
        {products.map(p => (
          <div key={p.id} style={styles.card}>
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <p>Price: ₹{p.price}</p>

            <div style={styles.qtyContainer}>
              <button style={styles.minus} onClick={() => updateQty(p.id, "dec")}>-</button>
              <input style={styles.qty} value={p.qty} readOnly />
              <button style={styles.plus} onClick={() => updateQty(p.id, "inc")}>+</button>
            </div>

            <p>Subtotal: ₹{(p.price * p.qty).toFixed(2)}</p>

            <button style={styles.remove} onClick={() => removeProduct(p.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* COUPON */}
      <div style={styles.couponBox}>
        <h3>Coupon Code:</h3>
        <input
          style={styles.input}
          placeholder="Enter GRAB50 for 50% off"
          onChange={e => applyCoupon(e.target.value)}
        />
        <button style={styles.applyBtn}>Apply</button>
        <p>{couponMsg}</p>
      </div>

      {/* TOTAL */}
      <div style={styles.totalBox}>
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>Discount: ₹{discount.toFixed(2)}</p>
        <h2>Total: ₹{(subtotal - discount).toFixed(2)}</h2>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "auto",
    padding: "20px",
    background: "#f5f5f5",
    
  },

  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  addBox: {
    background: "#f3e2b3",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "25px"
  },

  addBtn: {
    background: "green",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    marginTop: "10px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "16px",
  },

  qtyContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px"
  },

  minus: {
    background: "red",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px"
  },

  plus: {
    background: "green",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px"
  },

  qty: {
    width: "50px",
    textAlign: "center",
    padding: "6px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },

  remove: {
    background: "red",
    color: "white",
    padding: "6px",
    marginTop: "10px",
    border: "none",
    borderRadius: "5px"
  },

  couponBox: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px"
  },

  applyBtn: {
    background: "blue",
    color: "white",
    padding: "8px",
    marginTop: "10px",
    border: "none",
    borderRadius: "5px"
  },

  totalBox: {
    marginTop: "20px"
  }
};

export default App;
