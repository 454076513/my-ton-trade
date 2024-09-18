import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export function useInventory() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // 这里应该从后端 API 获取商品数据
    // 现在我们使用模拟数据
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', price: 10, stock: 5 },
      { id: 2, name: 'Product 2', price: 20, stock: 3 },
      { id: 3, name: 'Product 3', price: 30, stock: 8 },
    ];
    setProducts(mockProducts);
  }, []);

  const updateStock = (productId: number, quantity: number) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, stock: Math.max(0, product.stock - quantity) }
          : product
      )
    );
  };

  return { products, updateStock };
}