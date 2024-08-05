import React from "react";
import styled from "styled-components";

const ConfirmationPopupContainer = styled.div`
  &.confirmation-popup {
    position: absolute;
    top: 650px;
    left: 50%;
    width: 200px;
    transform: translateX(-50%);
    background: rgba(217, 72, 68, 0.77);
    color: white;
    padding: 10px 20px;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    font-size: 16px;
    font-weight: bold;
    z-index: 100; /* Ensure it's above other content */
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    word-break: keep-all; /* 긴 단어 줄바꿈 */
    word-wrap: break-word;
    //white-space: pre-wrap; /* 공백과 줄바꿈 유지 */
  }
`;

const TotalContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 0;
`;
const CheckImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
// "예약완료되었습니다" 뜨는 팝업 컴포넌트

const TreeImage = styled.img`
  width: 120px;
  height: 100px;
  margin-bottom: 10px;
  position: absolute;
  top: 530px;
  left: 35%;
`;

const ConfirmationPopup = ({ message, showTree }) => {
  return (
    <>
      {showTree && <TreeImage src="/assets/tree.png" />}
      <ConfirmationPopupContainer className="confirmation-popup">
        <TotalContainer>
          <CheckImage src="/assets/check.svg" />
          {message}
        </TotalContainer>
      </ConfirmationPopupContainer>
    </>
  );
};

export default ConfirmationPopup;
