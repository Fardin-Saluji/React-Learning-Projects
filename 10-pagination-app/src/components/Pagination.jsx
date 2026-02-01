import { useEffect, useState } from "react";
import "../styles/Pagination.css";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const ITEMS_PER_PAGE = 10;
const TOTAL_PAGES = 20;

export default function Pagination() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${
        (page - 1) * ITEMS_PER_PAGE
      }`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(() => setProducts([]));
  }, [page]);

  return (
    <div className="container">
      <h1>Pagination</h1>

      <div className="pagination">
        <button
          id="previous"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <FiChevronsLeft />
        </button>

        {[...Array(TOTAL_PAGES)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          id="next"
          disabled={page === TOTAL_PAGES}
          onClick={() => setPage(page + 1)}
        >
          <FiChevronsRight />
        </button>
      </div>

    
      <div className="products">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <h3>{item.title}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
