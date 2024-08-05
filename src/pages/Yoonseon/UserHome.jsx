import React, { useState, useEffect } from "react";
import MainHeader from "../../components/MainHeader";
import Navbar from "../../components/Navbar";
import Category from "../../components/Category";
import Store from "../../components/Store";
import ModalPopup from "../../components/ModalPopup"; // 모달 팝업 컴포넌트 임포트
import "./UserHome.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components"; // 스타일드 컴포넌트 임포트
import ConfirmationPopup from "../../components/ConfirmationPopup";

const Item = styled.h2`
  color: #3b3b3b;
`;
const Text = styled.p`
  color: #535353;
  font-weight: bold;
`;

const SaleText= styled.p`
    color: #d94844;
    font-weight: bold;
`
const Price = styled.p`
  color: #656565;
  font-weight: bold;
`;
const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
const Button = styled.button`
  background-color: #d94844;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #a73230;
  }
`;

const UserHome = () => {
  const { buyerId } = useParams();
  const [storeInfo, setStoreInfo] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템 상태 관리
  const [quantity, setQuantity] = useState(0); // 수량 관리하는 useState
  const [maxQuantity, setMaxQuantity] = useState(1); // 주문가능 최대수량
  const categories = ['BAK', 'BUT', 'VEG', 'FRU', 'SID', 'ETC'];
  const [isConfirmed, setConfirmed] = useState(false); // 떨이픽 누르면 "예약되었습니다" 관리하는 거
  const [isFailed, setFailed] = useState(false);

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async () => {
        try {
            const requests = categories.map(category =>
                axios.get(`http://13.125.100.193/buyer/category/${category}/list`)
            );

            const responses = await Promise.all(requests);
            const allData = responses.flatMap(response => response.data);

            const formattedData = allData.map(item => ({
                id: item.id,
                photo: item.photo,
                name: item.name,
                amount: item.amount,
                price: item.price,
                sale_price: item.sale_price,
                store: item.store.name
            }));

            setStoreInfo(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

  // 모달 팝업 창 토글하는 함수
  const toggleModal = (item) => {
    if (item) {
      axios
        .get(`http://13.125.100.193/buyer/product/${item.id}`) // 여기 id는 상품의 id
        .then((response) => {
          const itemData = response.data; // 수량 받아올 변수
          setSelectedItem(response.data); // 선택된 아이템에 맞는 데이터 가져오기
          setShowModal(true); // Modal창 보이는 부분 true로 상태 변경
          setQuantity(0); // 수량은 API의 amount값으로 설정
          setMaxQuantity(itemData.amount); // 주문가능한 최대 수량 (상품 등록되어있는 최대 수량)
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      // 선택된 아이템 없으면
      setShowModal(false); // 모달 안보이게 함
      setSelectedItem(null); // 선택된 아이템 없음
    }
  };

  // 수량 조절하는 핸들러 함수
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // 떨이픽 관리하는 함수 2개
  const handlePickSuccess = () => {
    setShowModal(false); // 주문 팝업 안보이게하고
    setConfirmed(true); // 떨이픽 true로 바꾸기 (예약완료)
    console.log("예약완료");
    setTimeout(() => {
      setConfirmed(false);
    }, 3000); // "예약완료" 3초뒤에 사라지게 함
  };

  // 떨이 예약 실패
  const handlePickFailure = () => {
    setShowModal(false); // 주문 팝업 안보이게하고
    setFailed(true); // 떨이픽 실패 true로 바꾸기 (예약실패)
    setTimeout(() => {
      setFailed(false);
    }, 3000);
  };

  return (
    <div className="userhome">
      <header>
        <MainHeader />
      </header>
      <div className="store" style={{ fontSize: "24px", fontWeight: "700" }}>
        떨이 찾기
        <div
          style={{
            fontSize: "18px",
            color: "#525252",
            fontWeight: "500",
            marginTop: "5px",
          }}
        >
          원하는 떨이 종류를 찾아보세요!
        </div>{" "}
      </div>
      <Category buyerId={buyerId} />
      <div className="store">실시간 떨이 상품</div>
      <main>
        <div className="storecontainer">
        {storeInfo.map((store) => (
                <Store
                  key={store.id}
                  photo={store.photo}
                  name={store.name}
                  store={store.store}
                  amount={store.amount}
                  price={store.price}
                  sale_price={store.sale_price}
                  onClick={() => toggleModal(store)} // Store 항목 클릭 시 모달 토글
                />
            ))}
        </div>
      </main>
      {showModal && selectedItem && (
        <ModalPopup
          show={showModal}
          onClose={() => setShowModal(false)}
          onPickSuccess={handlePickSuccess}
          onPickFailure={handlePickFailure}
          itemData={selectedItem}
          quantity={quantity}
          buyerId={buyerId}
        >
          <Item>{selectedItem.name}</Item>
          <Text>{selectedItem.store.name}</Text>
          <Price>정가 : {selectedItem.price}원</Price>
          <SaleText>떨이 할인가 : {selectedItem.sale_price}원</SaleText>
          <QuantityContainer>
            <Text>수량 : </Text>
            <Button onClick={decrementQuantity}>-</Button>
            <Text>{quantity}</Text>
            <Button onClick={incrementQuantity}>+</Button>
            <Text>주문가능 최대 수량: {maxQuantity} </Text>
          </QuantityContainer>
        </ModalPopup>
      )}
        {isConfirmed && <ConfirmationPopup message={"예약이 완료되었어요"} />}
        {isFailed && <ConfirmationPopup message={"예약을 실패했어요"} />}
      <footer>
        <Navbar />
      </footer>
    </div>
  );
};

export default UserHome;
