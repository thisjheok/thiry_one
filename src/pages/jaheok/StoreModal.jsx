import React from 'react';

function StoreModal({ store, onClose, onProductSelect }) {
  if (!store) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '0%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#F8F8F8',
      padding: '20px',
      borderRadius: '8px',
      borderTop: '2px solid #f59f9d',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 998,
      width: '85%',
      maxWidth: '400px',
      height: '350px',
    }} onClick={e => e.stopPropagation()}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={store.imageUrl} alt="Store" style={{ width: '80px', height: '70px', borderRadius: '8px', marginRight: '10px' }} />
          <div>
            <h3 style={{ margin: '0 0 5px' }}>{store.name}</h3>
            <p style={{ margin: '5px 0' }}>전화번호: {store.phone}</p>
            <p style={{ margin: '5px 0' }}>영업 시간: {store.hours}</p>
          </div>
        </div>
      </div>
      <h4 style={{ marginBottom: '10px', color: '#D9534F' }}>떨이 상품</h4>
      <div style={{ height: '180px', overflowY: 'auto' }}>
        {store.menu.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '10px', border: '1px solid #f0f0f0', borderRadius: '8px', cursor: 'pointer', background: 'white' }} onClick={() => onProductSelect(item)}>
            <img src={item.photo} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
            <div style={{ flex: '1', marginLeft: '10px' }}>
              <span style={{ display: 'block', fontSize: '14px', fontWeight: 'bold' }}>{item.name}</span>
              <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '5px' }}>{item.originalPrice}원</span>
              <span style={{ color: '#D9534F' }}>{item.discountedPrice}원</span>
            </div>
            <span style={{ fontSize: '12px', color: '#777' }}>수량: {item.quantity}개</span>
          </div>
        ))}
      </div>
      <button onClick={onClose} style={{ marginTop: '10px', padding: '10px', width: '100%', backgroundColor: '#cbcbcb', color: 'white', border: 'none', borderRadius: '8px' }}>닫기</button>
    </div>
  );
}

export default StoreModal;