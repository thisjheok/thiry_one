import { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Navbar from '../../components/Navbar';
import StoreModal from './StoreModal';
import ProductModal from './ProductModal';
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

function Map() {
  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lat: 37.451436, lng: 126.655978 });
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [markersData, setMarkersData] = useState([]);
  const { buyerId } = useParams(); // useParams 훅으로 buyerId 가져오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://13.125.100.193/store/list');
        const data = response.data.map(store => ({
          lat: store.latitude,
          lng: store.longitude,
          name: store.name,
          address: store.address,
          phone: store.tel,
          hours: `${store.open_time.slice(0, 5)} ~ ${store.close_time.slice(0, 5)}`,
          imageUrl: store.photo,
          menu: store.sale_products.map(product => ({
            name: product.name,
            store: store.name,
            originalPrice: product.price,
            discountedPrice: product.sale_price,
            quantity: product.amount,
            photo: product.photo,
            store_id: store.id,
            id: product.id,
          }))
        }));
        setMarkersData(data);
        console.log(buyerId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const { naver } = window;
    if (!naver) return;

    if (!mapRef.current) {
      const mapOptions = {
        center: new naver.maps.LatLng(center.lat, center.lng),
        logoControl: false,
        mapDataControl: false,
        scaleControl: true,
        tileDuration: 200,
        zoom: 19,
        zoomControl: false,
        zoomControlOptions: { position: naver.maps.Position.BOTTOM_RIGHT },
      };

      mapRef.current = new naver.maps.Map('map', mapOptions);
    } else {
      mapRef.current.setCenter(new naver.maps.LatLng(center.lat, center.lng));
    }

    // Current location marker
    new naver.maps.Marker({
      position: new naver.maps.LatLng(center.lat, center.lng),
      map: mapRef.current,
      icon: {
        url: '../assets/currentlocation.svg', // 경로를 현재 위치 이미지로 변경
        size: new naver.maps.Size(32, 32), // 이미지 크기 조정
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(12, 12) // 중심점을 맞추기 위해 설정
      }
    });

    // Add markers and click events
    markersData.forEach(markerData => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(markerData.lat, markerData.lng),
        map: mapRef.current,
        icon: {
          url: '../assets/logo_red2.svg', // 경로를 현재 위치 이미지로 변경
          size: new naver.maps.Size(60, 60), // 이미지 크기 조정
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(12, 12) // 중심점을 맞추기 위해 설정
        }
      });

      naver.maps.Event.addListener(marker, 'click', () => {
        setSelectedStore(markerData);
      });
    });
  }, [center, markersData]);

  const handleProductPick = () => {
    setSelectedProduct(null);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Notification visible for 3 seconds
  };

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

  const fadeOut = keyframes`
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  `;

  const NotificationContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 999;
    pointer-events: none; /* Prevent interaction */
    padding: 20px;
  `;

  const Notification = styled.div`
    background-color: #D9534F;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    animation: ${({ show }) => show ? css`${fadeIn} 0.3s ease-out, ${fadeOut} 0.3s ease-out 2.7s` : 'none'};
  `;

  const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 376px;
    height: 60px;
    padding: 20px;
    box-sizing: border-box;
  `;
  const Title = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: #d94844;
    text-align: center;
  `;

  const Logo = styled.img`
    width: 25px;
    height: 24px;
    margin-left: 8px;
  `;
  const Bell = styled.img`
    width: 24px;
    height: 24px;
  `;
  const CheckImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

  return (
    <>
      <Container>
        <Title>
          근처 떨이 가게
          <Logo src="../assets/logo_red.png" />
        </Title>
      </Container>
      <div id="map" style={{ width: '100%', height: '700px', marginBottom: '70px' }} />
      {selectedStore && (
        <div>
          <StoreModal 
            store={selectedStore} 
            onClose={() => {
              setSelectedStore(null);
              setSelectedProduct(null);
            }} 
            onProductSelect={(product) => setSelectedProduct(product)}
          />
          {selectedProduct && (
            <>
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 998,
              }} onClick={() => {
                setSelectedProduct(null);
              }}></div>
              <ProductModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
                onPick={handleProductPick} 
                buyerId={buyerId} // buyerId 전달
              />
            </>
          )}
        </div>
      )}
      {showNotification && (
        <NotificationContainer>
          <Notification show={showNotification}>
          <CheckImage src="/assets/check.svg" />
            예약이 완료 되었어요
          </Notification>
        </NotificationContainer>
      )}
      <Navbar />
    </>
  );
}

export default Map;
