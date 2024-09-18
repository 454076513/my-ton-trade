import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  // 这里应该从后端或状态管理中获取产品详情
  const product = {
    id: Number(id),
    name: `Product ${id}`,
    price: Math.floor(Math.random() * 100) + 1,
    description: `This is the description for product ${id}.`
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
    console.log(`Added product ${id} to cart`);
  };

  return (
    <div className="product-page">
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductPage;