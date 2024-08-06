import React from "react";
import styled from "styled-components";

const LogWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  padding: 15px;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const LogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const LogContent = styled.div`
  display: flex;
`;

const FoodImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  border: 1px solid #bababa65;
  margin-right: 15px;
`;

const TextContainer = styled.div`
  flex: 1;
`;

const StoreName = styled.div`
  font-family: "Open Sans", sans-serif;
  font-weight: 900;
  font-size: 18px;
  color: rgba(217, 72, 68, 0.77);
  margin-bottom: 5px;
`;

const ProductName = styled.div`
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: rgba(217, 72, 68, 0.77);
  margin-bottom: 10px;
`;

const InfoText = styled.div`
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 1.4;
  margin-bottom: 5px;
`;

const Pickup = styled.div`
  display: inline-block;
  padding: 2px 10px;
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  color: #ffffff;
  background: #d94844;
  border-radius: 15px;
  text-align: center;
`;

const Cancel = styled.button`
  padding: 5px 15px;
  background: #d94844;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  color: #ffffff;
  margin-top: 10px;
`;

const Log = ({
  id,
  storeName,
  productName,
  productPhoto,
  acceptAt,
  createdAt,
  amount,
  buyStep,
  onDelete,
  orderNumber,
}) => {
  const handleDelete = () => {
    onDelete(id);
  };

  const pickupTime = acceptAt ? new Date(new Date(acceptAt).getTime() + 30 * 60000) : null;

  let pickupStatus;
  switch (buyStep) {
    case "RES": pickupStatus = "예약 확인 중"; break;
    case "PIC": pickupStatus = "픽업 대기 중"; break;
    case "AUT": pickupStatus = "자동취소"; break;
    case "CAN": pickupStatus = "주문 취소"; break;
    case "COM": pickupStatus = "픽업완료"; break;
    case "REJ": pickupStatus = "주문거절"; break;
    default: pickupStatus = "알 수 없음"; break;
  }

  const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };

  return (
    <LogWrapper>
      <LogHeader>
        <StoreName>{storeName}</StoreName>
        <Pickup>{pickupStatus}</Pickup>
      </LogHeader>
      <LogContent>
        <FoodImg src={productPhoto} alt={productName} />
        <TextContainer>
          <ProductName>{productName}</ProductName>
          <InfoText>주문시간 ㅣ {new Date(createdAt).toLocaleString(undefined, dateOptions)}</InfoText>
          <InfoText>주문수량 ㅣ {amount}개</InfoText>
          <InfoText>
            {pickupTime
              ? `픽업 가능 시간 ㅣ ${pickupTime.toLocaleString(undefined, dateOptions)}`
              : "픽업 가능 시간 ㅣ 예약 수락 후 표시됩니다!"}
          </InfoText>
          <InfoText>주문번호 ㅣ {orderNumber}</InfoText>
        </TextContainer>
      </LogContent>
      <Cancel onClick={handleDelete}>취소</Cancel>
    </LogWrapper>
  );
};

export default Log;