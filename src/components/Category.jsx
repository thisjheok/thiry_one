import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px; /* 그리드 아이템 간의 간격 */
  padding: 16px;
  justify-items: center;
  align-items: center;
  /* min-height: 330px; 최소 높이 설정 */
  box-sizing: border-box;
  overflow: hidden;
  background-color: #ffffff;
`;

const GridItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #d94844; /* 텍스트 색상 */
  height: 100%;
`;

const Icon = styled.img`
  width: 65px; /* 아이콘 크기 */
  height: 55px; /* 아이콘 크기 */
  margin-bottom: 8px; /* 아이콘과 텍스트 간의 간격 */
  border: 1px solid #d0d0d0;
  border-radius: 30px;
  padding: 8px;
  box-shadow: 3px 3px 3px #e0e0e0;
  background-color: white;
`;

const Label = styled.span`
  font-size: 15px; /* 텍스트 크기 */
  font-weight: 700;
  color: #525252; /* 텍스트 색상 */
`;

const categories = [
  {
    category: "BAK",
    type: "빵 / 간식",
    icon: "/assets/bread.svg",
  },
  {
    category: "BUT",
    type: "정육",
    icon: "/assets/meat.svg",
  },
  {
    category: "VEG",
    type: "채소",
    icon: "/assets/vege.svg",
  },

  {
    category: "FRU",
    type: "과일",
    icon: "/assets/fruit.svg",
  },
  {
    category: "SID",
    type: "반찬",
    icon: "/assets/sidedish.svg",
  },
  {
    category: "ETC",
    type: "기타",
    icon: "/assets/etc.svg",
  },
];

const Category = ({ buyerId }) => {
  return (
    <GridContainer>
      {categories.map((category) => (
        <GridItem
          to={`/itempage/${category.category}/${buyerId}?type=${category.type}&icon=${category.icon}`}
          key={category.category}
        >
          <Icon src={category.icon} alt={category.type} />
          <Label>{category.type}</Label>
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default Category;
