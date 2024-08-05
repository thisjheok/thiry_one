import styled from "styled-components";
import React from "react";

const Box = styled.div`
  width: 320px;
  height: 120px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 3px #e0e0e0;
  border-radius: 20px;
  border: 3px solid #f8f8f8;
  margin: auto;
  background-color: white;
  cursor: pointer; // 클릭 가능하게 커서 추가
`;
const Image = styled.img`
  width: 100px;
  height: 80px;
  margin: 5px;
`;

const TitleBox = styled.div`
  width: 160px;
  height: 85px;
  padding: 5px;
  margin: 5px;
  box-sizing: border-box;
`;
const Text = styled.div`
  width: 150px;
  height: 25px;
  font-size: 12px;
  color: #525252;
  font-weight: bold;
`;
const Title_Text = styled.div`
  width: 150px;
  height: 25px;
  font-size: 16px;
  color: #525252;
  font-weight: bold;
`;

// API에서 price에 해당하는 부분 (세일 안한 정가)
const OriginalPrice = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #b3b3b3;
`;
// API에서 sale_price에 해당하는 부분 (세일한 가격)
const SalePrice = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #d94844;
  padding: 3px;
`;

const Arrow = styled.img`
  width: 15px;
  height: 15px;
  padding: 0px;
`;

// Home에서 현재 떨이 중인 가게 보여주는 컴포넌트
const Store = ({ name, photo, amount, price, sale_price, store, onClick }) => {
  return (
    <Box onClick={onClick}>
      <Image src={photo}></Image>
      <TitleBox>
        <Title_Text>{name}</Title_Text>
        <OriginalPrice>{price}원</OriginalPrice>
        <Arrow src="/assets/arrow.svg" />
        <SalePrice>{sale_price}원</SalePrice>
        <Text>남은 갯수 : {amount} </Text>
        <Text>{store}</Text>
      </TitleBox>
    </Box>
  );
};

export default Store;
