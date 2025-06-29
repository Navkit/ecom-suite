import './App.css';
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import Login from './Login';

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategories] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [token, setToken] = useState(localStorage.getItem('token'));

  const user = token ? parseJwt(token) : null;

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:8081/api/products', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.status === 401) {
          localStorage.removeItem('token');
          setToken(null);
          throw new Error("Token expired");
        }
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, [token]);

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:8081/api/categories', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.status === 401) {
          localStorage.removeItem('token');
          setToken(null);
          throw new Error("Token expired");
        }
        return response.json();
      })
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, [token]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategories(categoryId ? Number(categoryId) : null);
  };

  const filteredProducts = products
    .filter(product => {
      return (
        (selectedCategory ? product.category.id === selectedCategory : true) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => sortOrder === "asc" ? a.price - b.price : b.price - a.price);

  if (!token) return <Login setToken={setToken} />;

  return (
    <div className='container'>
      <header className="app-header">
        {user && <p className="welcome-text">Welcome, <strong>{user.sub}</strong></p>}
        <button
          className="btn btn-danger logout-btn"
          onClick={() => {
            localStorage.removeItem('token');
            setToken(null);
          }}
        >
          Logout
        </button>
      </header>

      <h1 className='my-4'>Product Catalog</h1>
      <div className='row align-items-center mb-4'>
        <div className='col-md-3 col-sm-12 mb-2'>
          <CategoryFilter categories={categories} onSelect={handleCategorySelect} />
        </div>
        <div className='col-md-5 col-sm-12 mb-2'>
          <input
            type="text"
            placeholder='Search for Products'
            className='form-control'
            onChange={handleSearchChange}
          />
        </div>
        <div className='col-md-4 col-sm-12 mb-2'>
          <select className='form-control' onChange={handleSortChange}>
            <option value="asc">Sort by Price: Low to High</option>
            <option value="desc">Sort by Price: High to Low</option>
          </select>
        </div>
      </div>
      <div>
        {filteredProducts.length ? (
          <ProductList products={filteredProducts} />
        ) : (
          <p>No Products Found</p>
        )}
      </div>
    </div>
  );
}

export default App;
