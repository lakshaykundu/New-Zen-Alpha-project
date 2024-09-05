import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Category({ addToCart }) {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo data for testing
  const demoData = {
    "ladies suits": [
      { id: 1, name: "Unstitched Black Suit", price: 9999 },
      { id: 2, name: "Stitched Pink Suit", price: 3099 },
      { id: 3, name: "Stitched Yellow Suit", price: 1999 },
    ],
    gowns: [
      { id: 4, name: "Evening Gown", price: 1200 },
      { id: 5, name: "Casual Gown", price: 6000 },
    ],
    shirts: [
      { id: 6, name: "Cotton Shirt", price: 2999 },
      { id: 7, name: "Silk Shirt", price: 5999 },
    ],
    trousers: [
      { id: 8, name: "Denim Jeans", price: 4000 },
      { id: 9, name: "Formal Trousers", price: 5000 },
    ],
  };

  // useEffect(()=>{
  //   let itemsApi="https://jsonplaceholder.typicode.com/posts";
  //   (async function fetchData(){

  //     try {
  //       let response= await fetch(itemsApi)
  //       let data=await response.json()

  //     } catch (error) {
  //       console.log("error in itemAPI ,"error)

  //     }

  //   })()
  // },[])

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      if (demoData[type.toLowerCase()]) {
        setProducts(demoData[type.toLowerCase()]);
      } else {
        setProducts([]);
      }
      setLoading(false);
    }, 1000);
  }, [type]);
  console.log(addToCart);

  return (
    <div>
      <h2>{type}</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>
              <p>₹{product.price.toFixed(2)}</p>

              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
}

export default Category;
