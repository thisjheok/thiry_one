import React from "react";
import styled from "styled-components";

const LogWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 336px;
  height: 215px;
  left: 8px;
  top: 88px;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
`;

const FoodImg = styled.img`
  position: relative;
  width: 60px;
  height: 60px;
  left: 10px;
  top: 14px;
  border-radius: 15px;
  border: 1px solid #bababa65;
`;

const Text1 = styled.div`
  position: relative;
  width: 300px;
  height: 24px;
  left: 95px;
  top: -48px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 27px;
  color: rgba(217, 72, 68, 0.77);
`;

const Text2 = styled.div`
  position: relative;
  width: 194px;
  height: 23px;
  left: 95px;
  top: -35px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: rgba(217, 72, 68, 0.77);
`;

const Text3 = styled.div`
  position: relative;
  width: 194px;
  height: 23px;
  left: 100px;
  top: -30px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
`;

const Text4 = styled.div`
  position: relative;
  width: 194px;
  height: 23px;
  left: 100px;
  top: -22px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
`;

const Text5 = styled.div`
  position: relative;
  width: 230px;
  height: 23px;
  left: 100px;
  top: -18px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
`;
const Text6 = styled.div`
  position: relative;
  width: 230px;
  height: 23px;
  left: 100px;
  top: -16px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
`;

const Pickup = styled.div`
  display: inline-block; /* 글자 크기에 맞춰 width 자동 조정 */
  padding: 2px 10px; /* 여백 추가 */
  position: absolute;
  left: 250px;
  top: 20px;
  font-family: "Open Sans";
  font-style: normal;
  font-size: 12px;
  line-height: 19px; /* height와 동일하게 설정하여 세로 중앙 정렬 */
  color: #ffffff;
  background: #d94844;
  border-radius: 15px;
  text-align: center;
  vertical-align: middle;
`;

const Cancel = styled.button`
  padding: 0px;
  gap: 10px;
  position: absolute;
  width: 56px;
  height: 27px;
  left: 265px;
  top: 170px;
  border: none;
  background: #d94844;
  border-radius: 15px;
  cursor: pointer;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
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

  // acceptAt 시간보다 30분 늦은 시간을 계산
  const pickupTime = acceptAt ? new Date(acceptAt) : null;
  if (pickupTime) {
    pickupTime.setMinutes(pickupTime.getMinutes() + 30);
  }


  // buyStep에 따라 표시할 문구 설정
  let pickupStatus;
  switch (buyStep) {
    case "RES":
      pickupStatus = "예약 확인 중";
      break;
    case "PIC":
      pickupStatus = "픽업 대기 중";
      break;
    case "AUT":
      pickupStatus = "자동취소";
      break;
    case "CAN":
      pickupStatus = "주문 취소";
      break;
    case "COM":
      pickupStatus = "픽업완료";
      break;
    case "REJ":
      pickupStatus = "주문거절";
      break;
    default:
      pickupStatus = "알 수 없음";
      break;
  }

  // 날짜 형식을 지정할 옵션 설정
  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <LogWrapper>
      <FoodImg src={productPhoto} alt={productName} />
      <Text1>{storeName}</Text1>
      <Text2>{productName}</Text2>
      <Text3>
        주문시간 ㅣ {new Date(createdAt).toLocaleString(undefined, dateOptions)}
      </Text3>
      <Text4>주문수량 ㅣ {amount}개</Text4>
      <Text5>
      {pickupTime
          ? `픽업 가능 시간 ㅣ ${pickupTime.toLocaleString(undefined, dateOptions)}`
          : "픽업 가능 시간 ㅣ 예약 수락 후 표시됩니다!"}
      </Text5>
      <Text6>주문번호 ㅣ {orderNumber}</Text6>
      <Pickup>{pickupStatus}</Pickup>
      <Cancel onClick={handleDelete}>취소</Cancel>
    </LogWrapper>
  );
};

export default Log;
