import { useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';
import { SendTransactionRequest } from '@tonconnect/sdk';

export function useTonConnect() {
  const [tonConnectUI] = useTonConnectUI();
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange(wallet => {
      setWallet(wallet?.account.address || null);
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI]);

  const sendTransaction = async (transaction: SendTransactionRequest) => {
    if (!wallet) {
      throw new Error('Wallet is not connected');
    }
    return tonConnectUI.sendTransaction(transaction);
  };

  return {
    wallet,
    connected: !!wallet,
    connect: () => tonConnectUI.connectWallet(),
    disconnect: () => tonConnectUI.disconnect(),
    sendTransaction,
  };
}