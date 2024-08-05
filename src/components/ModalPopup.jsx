// 떨이 상품 주문하는 팝업창 컴포넌트

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const Modaloverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 20px;
  width: 500px;
  max-width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Closebutton = styled.button`
  position: absolute;
  top: 280px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
`;

const ClosebtnImage = styled.img`
  width: 25px;
  height: 25px;
`;

const PickBtn = styled.button`
  width: 320px;
  height: 50px;
  padding: 3px;
  border-radius: 10px;
  border: none;
  background-color: rgba(217, 72, 68, 0.77);
  margin-left: 8px;
  color: white;
  font-weight: 800;
  font-size: 20px;
  &:hover {
    cursor: pointer;
    background-color: #d94844;
  }
`;

const ModalPopup = ({
  show,
  onClose,
  children,
  onPickSuccess,
  onPickFailure,
  itemData,
  quantity, // quantity를 props로 받아옴
  buyerId, // 구매자 id
}) => {
  const handlePick = () => {
    const postData = {
      buyer: buyerId, // 구매자 id
      amount: quantity, // itempage에서 받아온 quantity값
      sale_product: itemData.id, // 넘겨주는 id값
      store: itemData.store.name,
    };
    axios
      .post("http://13.125.100.193/buyer/pick", postData) // API_ENDPOINT를 실제 API URL로 대체 필요
      .then((response) => {
        console.log("주문 성공:", response.data);
        onPickSuccess(); // 부모 컴포넌트인 ItemPage의 onPickSuccess 함수 호출하여 상태 업데이트
      })
      .catch((error) => {
        if (itemData.amount < quantity) {
          console.error("주문 실패:", error);
          onPickFailure(); // 주문 실패 시 ItemPage의 onPickFailure 함수 호출
        }
      });
  };

  if (!show) {
    return null;
  }

  return (
    <Modaloverlay>
      <Modal>
        <Closebutton onClick={onClose}>
          <ClosebtnImage src="/assets/close.svg" alt="close btn" />
        </Closebutton>
        <div className="modal-content">{children}</div>
        <PickBtn onClick={handlePick}>떨이 PICK</PickBtn>
      </Modal>
    </Modaloverlay>
  );
};

export default ModalPopup;
