import Layout from "../../pages/dongjae/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Back_arrow from "../../components/dongjae/Back_arrow";

const WhiteLogo = styled.img`
  position: absolute;
  width: 76px;
  height: 80px;
  left: 210px;
  top: 206px;
`;

const Text1 = styled.img`
  position: absolute;
  width: 319px;
  height: 142px;
  left: calc(50% - 319px / 2 - 0.5px);
  top: 210px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 87px;
  color: #ffffff;
`;

const Text2 = styled.div`
  position: absolute;
  width: 94px;
  height: 22px;
  left: 21px;
  top: 581px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
`;

const NameInput = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 107px 8px 8px;
  gap: 10px;
  position: absolute;
  width: 336px;
  height: 52px;
  left: 21px;
  top: 611px;
  background: #ffffff;
  border: 1px solid #b3b3b3;
  border-radius: 10px;
`;

const StartButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 60px;
  gap: 10px;
  position: absolute;
  width: 336px;
  height: 56px;
  left: calc(50% - 336px / 2);
  top: 708px;
  border: none;
  background: ${(props) =>
    props.disabled ? "rgba(217, 72, 68, 0.44)" : "#D94844"};
  border-radius: 15px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: #ffffff;
  cursor: pointer;
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
      const response = await axios.post("http://13.125.100.193/buyer/create", {
        name,
      });
      //   localStorage.setItem("temp_tokken",res.data.temp_access_token)
      const id = response.data.id;
      //localStorage.setItem("buyerId", id);
      //navigate("/userhome");
      navigate(`/userhome/${id}`); // useParams로 userHome에 구매자 id 넘기기
      console.log("Sign up complete, buyer ID:", id);
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <>
      <Back_arrow />
      <Text1 src="assets/main_text_red.svg" />
      <WhiteLogo src="assets/logo_red.png" />
      <Text2>이름</Text2>
      <NameInput
        type="text"
        placeholder="이름을 입력해 주세요."
        onChange={(e) => setName(e.target.value)}
      />
      <StartButton onClick={handle_submit} disabled={is_next_disabled}>
        시작하기
      </StartButton>
    </>
  );
};

export default Customer_start;
