import React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
  
  @media (min-width: 768px) {
    max-width: 768px;
    margin: 0 auto;
  }
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  );
};

export default Layout;
