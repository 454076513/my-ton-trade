import React from 'react';
import Carousel from '../components/Carousel';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Carousel />
      <SearchBar />
      <ProductList />
    </div>
  );
};

export default HomePage;