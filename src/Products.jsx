import React, { useState } from "react";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { Link } from "react-router-dom";

export default function Products() {
  const [size, setSize] = useState(""); // only relevant to shoes
  const { category } = useParams(); // relevant to all products

  // relevant to all products
  const { data: products, loading, error } = useFetch(
    "products?category=" + category
  );

  // relevant to all products
  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }

  // only relevant to shoes
  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  // relevant to all products
  if (error) throw error;
  if (loading) return <Spinner />;
  if (products.length === 0) return <PageNotFound />;


  // filters section only relevant for shoes at the moment, could be relevant for further products though
  // products section relevant for all products
  return (
    <>{category === "shoes" ? <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {size && <h2>Found {filteredProducts.length} items</h2>}
      </section>
      
      <section id="products">
        {filteredProducts.map(renderProduct)}
      </section>

     </>
     : 
     <section id="products">{products.map(renderProduct)}</section>}</>
  );
}
