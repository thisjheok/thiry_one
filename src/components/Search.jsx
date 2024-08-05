import styled from "styled-components";
import axios from "axios";
import React from "react";

const Container = styled.input`
  border: 2px solid #b3b3b3;
  border-radius: 10px;
  height: 52px;
  width: 330px;
  margin-left: 20px;
  margin-bottom: 10px;
  color: #d94844;
  font-size: 16px;
  padding: 8px;
  &:hover {
  }
  &::placeholder {
    color: #d94844;
  }
  &:focus {
    outline: none;
  }
`;

const Search = () => {
  return (
    <>
      <Container type="search" placeholder="검색어를 입력하세요"></Container>
    </>
  );
};

export default Search;
