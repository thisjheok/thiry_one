import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GlobalStyle = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #D94844;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoText = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 48px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const LogoIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-left: 10px;
`;

const SubText = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  color: #FFFFFF;
  margin-bottom: 40px;
`;

const Button = styled.button`
  width: 100%;
  max-width: 336px;
  height: 52px;
  background-color: #FFFFFF;
  border-radius: 15px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #D94844;
`;

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <Background>
        <ContentWrapper>
          <LogoText>
            떠리원
            <LogoIcon src="assets/white_logo.svg" alt="Logo" />
          </LogoText>
          <SubText>
            우리 동네 떨이 제품을<br />
            마감 전에 쉽게 판매 / 구매해보세요
          </SubText>
          <Button onClick={() => navigate("/sellerhome")}>
            판매자로 시작하기
          </Button>
          <Button onClick={() => navigate("/customer_start")}>
            구매자로 시작하기
          </Button>
        </ContentWrapper>
      </Background>
    </>
  );
};

export default Login;
