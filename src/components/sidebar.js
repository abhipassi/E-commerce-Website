import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{
      width: "200px",
      background: "#2c3e50",
      minHeight: "100vh",
      padding: "20px",
      color: "white"
    }}>
      <h3>Admin Panel</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/admin/category" style={linkStyle}>Create Category</Link></li>
        <li><Link to="/admin/subcategory" style={linkStyle}>Create SubCategory</Link></li>
        <li><Link to="/admin/product" style={linkStyle}>Insert Product</Link></li>
        <li><Link to="/admin/manageproducts" style={linkStyle}>Manage Product</Link></li>
      </ul>
    </div>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  margin: "10px 0"
};

export default Sidebar;
