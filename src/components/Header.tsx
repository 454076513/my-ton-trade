import React from 'react';
import { Link } from 'react-router-dom';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart ({itemCount})</Link></li>
        </ul>
      </nav>
      <TonConnectButton />
    </header>
  );
};

export default Header;