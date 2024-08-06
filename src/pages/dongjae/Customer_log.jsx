import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Log from "../../components/dongjae/Log";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  background-color: #f9f9f9;
  overflow-x: hidden;
  position: relative; // NavBar 위치 지정을 위해 추가
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #d94844;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const LogWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 70px 10px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const LogItem = styled.div`
  margin: 10px 0;
  width: 100%;
  max-width: 400px; // 최대 너비 설정
  box-sizing: border-box;
`;

const NavbarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Customer_log = () => {
  const { buyerId } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!buyerId) {
        console.error("buyerId가 제공되지 않았습니다.");
        return;
      }

      try {
        const response = await axios.get(
          `https://thirtyone.kro.kr/buyer/purchase/${buyerId}/list`
        );

        const filteredLogs = response.data.filter(
          (log) => log.buyer === parseInt(buyerId)
        );

        setLogs(filteredLogs.reverse());
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchLogs();
  }, [buyerId]);

  const handleDelete = async (orderId) => {
    try {
      await axios.patch(
        `https://thirtyone.kro.kr/buyer/purchase/${buyerId}/cancel/${orderId}`
      );
      setLogs(logs.filter((log) => log.id !== orderId));
      console.log("상태 변경 완료");
    } catch (error) {
      console.error("삭제 오류:", error);
    }
  };

  return (
    <Container>
      <Header>회원 구매 내역</Header>
      <LogWrapper>
        {logs.map((log) => (
          <LogItem key={log.id}>
            <Log
              id={log.id}
              storeName={log.store.name}
              productName={log.sale_product.name}
              productPhoto={log.sale_product.photo}
              acceptAt={log.accept_at}
              createdAt={log.created_at}
              amount={log.amount}
              buyStep={log.buy_step}
              onDelete={() => handleDelete(log.id)}
              orderNumber={log.order_number}
            />
          </LogItem>
        ))}
      </LogWrapper>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
    </Container>
  );
};

export default Customer_log;