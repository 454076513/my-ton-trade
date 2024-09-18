import React from 'react';

interface TransactionConfirmationProps {
  total: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const TransactionConfirmation: React.FC<TransactionConfirmationProps> = ({ total, onConfirm, onCancel }) => {
  return (
    <div className="transaction-confirmation">
      <h3>Confirm Transaction</h3>
      <p>You are about to send {total.toFixed(2)} TON (including 5% transaction fee).</p>
      <p>Please confirm that you want to proceed with this transaction.</p>
      <div className="confirmation-buttons">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default TransactionConfirmation;