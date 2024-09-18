import React from 'react';
import ProductCard from './ProductCard';
import { useInventory } from '../hooks/useInventory';

const ProductList: React.FC = () => {
  const { products } = useInventory();

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;