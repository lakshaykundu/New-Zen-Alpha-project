import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Home() {
  const categories = ["Ladies Suits", "Gowns", "Shirts", "Trousers"];

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
