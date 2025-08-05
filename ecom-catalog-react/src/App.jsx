import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';
import Login from './Login';
import Signup from './Signup';

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function App() {
  const getStoredToken = () =>
    localStorage.getItem('token') || sessionStorage.getItem('token');

  const [token, setToken] = useState(getStoredToken());
  const [view, setView] = useState('login'); // 'login' | 'signup' | 'home'
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const user = token ? parseJwt(token) : null;

  const clearToken = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setToken(null);
    setView('login');
  };

  // Fetch products
  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:8081/api/products', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          clearToken();
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(setProducts)
      .catch(console.error);
  }, [token]);

  // Fetch categories
  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:8081/api/categories', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          clearToken();
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(setCategories)
      .catch(console.error);
  }, [token]);

  // Filtering and sorting
  const filteredProducts = products
    .filter((product) =>
      (selectedCategory ? product.category.id === selectedCategory : true) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

  // Renders based on view
  if (!token) {
    return view === 'signup' ? (
      <Signup onSwitchToLogin={() => setView('login')} />
    ) : (
      <Login setToken={(t) => {
        setToken(t);
        setView('home');
      }} onSwitchToSignup={() => setView('signup')} />
    );
  }

  return (
    <div className="container">
      <header className="app-header">
        {user && <p className="welcome-text">Welcome, <strong>{user.sub}</strong></p>}
        <button className="btn btn-danger" onClick={clearToken}>Logout</button>
      </header>

      <h1 className="my-4">Product Catalog</h1>

      <div className="row align-items-center mb-4">
        <div className="col-md-3 col-sm-12 mb-2">
          <CategoryFilter categories={categories} onSelect={(id) => setSelectedCategory(id ? Number(id) : null)} />
        </div>
        <div className="col-md-5 col-sm-12 mb-2">
          <input type="text" className="form-control" placeholder="Search Products" onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="col-md-4 col-sm-12 mb-2">
          <select className="form-control" onChange={e => setSortOrder(e.target.value)}>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} />
      ) : (
        <p>No Products Found</p>
      )}
    </div>
  );
}

export default App;
