import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTonConnect } from '../hooks/useTonConnect';
import { toNano } from '@ton/core';
import TransactionConfirmation from '../components/TransactionConfirmation';
import { useInventory } from '../hooks/useInventory';

const TRANSACTION_FEE = 0.05; // 5% transaction fee

const CartPage: React.FC = () => {
  const { items, removeFromCart, clearCart } = useCart();
  const { connected, sendTransaction } = useTonConnect();
  const { updateStock } = useInventory();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fee = subtotal * TRANSACTION_FEE;
  const total = subtotal + fee;

  const handleCheckout = () => {
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmTransaction = async () => {
    try {
      // 这里应该是卖家的钱包地址
      const sellerAddress = 'EQD__________________________________________';
      
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from now
        messages: [
          {
            address: sellerAddress,
            amount: toNano(total.toString()).toString(),
          },
        ],
      };

      const result = await sendTransaction(transaction);
      console.log('Transaction sent successfully', result);
      
      // 更新库存
      items.forEach(item => {
        updateStock(item.id, item.quantity);
      });

      // 清空购物车
      clearCart();
      
      alert('Payment successful! Your order has been placed.');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout. Please try again.');
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleCancelTransaction = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>
          <span>Price: ${item.price}</span>
          <span>Quantity: {item.quantity}</span>
          <span>Subtotal: ${item.price * item.quantity}</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <div className="cart-total">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Transaction Fee (5%): ${fee.toFixed(2)}</p>
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
      <button onClick={handleCheckout} disabled={!connected || items.length === 0}>
        {connected ? 'Proceed to Checkout' : 'Connect Wallet to Checkout'}
      </button>

      {showConfirmation && (
        <TransactionConfirmation
          total={total}
          onConfirm={handleConfirmTransaction}
          onCancel={handleCancelTransaction}
        />
      )}
    </div>
  );
};

export default CartPage;