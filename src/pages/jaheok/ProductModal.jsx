import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  width: 85%;
  max-width: 400px;
  animation: ${fadeIn} 0.3s ease-out;
  margin-bottom: 80px; /* Adjusted to keep the modal 80px from the bottom */
`;

function ProductModal({ product, onClose, onPick, buyerId }) { // buyerId 전달 받기
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handlePickClick = async () => {
    console.log(`떨이 PICK clicked for product: ${product.name}, ${product.id} quantity: ${quantity}`);
    console.log(buyerId);
    try {
      const response = await axios.post('http://13.125.100.193/buyer/pick', {
        buyer: buyerId, // buyerId.buyerId 사용
        sale_product: product.id,
        amount: quantity,
        store: product.store_id,
      });
      console.log('Response:', response.data);
      onPick();
    } catch (error) {
      console.error('Error posting pick:', error);
    }
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <h3 style={{ color: '#D9534F', fontSize: '24px' }}>{product.name}</h3>
        <p>{product.store}</p>
        <div style={{ marginBottom: '10px', display: 'flex' }}>
          <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '5px' }}>{product.originalPrice}원</span>
          <span style={{ color: '#D9534F' }}>{product.discountedPrice}원</span>
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>수량:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={decrementQuantity} style={{
              backgroundColor: '#f0f0f0',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              marginRight: '5px',
              cursor: 'pointer',
            }}>-</button>
            <span style={{ margin: '0 10px' }}>{quantity}</span>
            <button onClick={incrementQuantity} style={{
              backgroundColor: '#f0f0f0',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              marginLeft: '5px',
              cursor: 'pointer',
            }}>+</button>
          </div>
        </div>
        <button onClick={handlePickClick} style={{ marginTop: '10px', padding: '10px', width: '100%', backgroundColor: '#D9534F', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          떨이 PICK
        </button>
        <button onClick={onClose} style={{ marginTop: '10px', padding: '10px', width: '100%', backgroundColor: '#ddd', color: 'black', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          닫기
        </button>
      </ModalContainer>
    </ModalBackground>
  );
}

export default ProductModal;
