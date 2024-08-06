import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Back_arrow from "../../components/dongjae/Back_arrow";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFFFFF;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const WhiteLogo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;

const Text1 = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 1.2;
  color: #D94844;
  text-align: center;
`;

const Text2 = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.2;
  color: #D94844;
  text-align: center;
  margin-top: 10px;
`;

const InputLabel = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  align-self: flex-start;
  margin-left: 10%;
  margin-top: 40px;
`;

const NameInput = styled.input`
  box-sizing: border-box;
  width: 80%;
  height: 52px;
  padding: 8px;
  background: #FFFFFF;
  border: 1px solid #B3B3B3;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 16px;
`;

const StartButton = styled.button`
  width: 80%;
  height: 56px;
  background: ${(props) => (props.disabled ? "rgba(217, 72, 68, 0.44)" : "#D94844")};
  border-radius: 15px;
  border: none;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: #FFFFFF;
  position: absolute;
  bottom: 40px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const Customer_start = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [is_next_disabled, set_is_next_disabled] = useState(true);

  useEffect(() => {
    set_is_next_disabled(!name);
  }, [name]);

  const handle_submit = async () => {
    try {
      const response = await axios.post("https://thirtyone.kro.kr/buyer/create", { name });
      const id = response.data.id;
      navigate(`/userhome/${id}`);
      console.log("Sign up complete, buyer ID:", id);
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <Container>
      <Back_arrow />
      <LogoContainer>
        <WhiteLogo src="assets/logo_red.png" />
        <Text1>떠리원</Text1>
        <Text2>떨이를 원하다</Text2>
      </LogoContainer>
      <InputLabel>이름</InputLabel>
      <NameInput
        type="text"
        placeholder="이름을 입력해 주세요."
        onChange={(e) => setName(e.target.value)}
      />
      <StartButton onClick={handle_submit} disabled={is_next_disabled}>
        시작하기
      </StartButton>
    </Container>
  );
};

export default Customer_start;
