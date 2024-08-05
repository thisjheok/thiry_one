import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Log from "../../components/dongjae/Log";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";

const Header = styled.div`
  position: fixed;
  width: 376px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: #d94844;
  background-color: rgba(255, 255, 255, 1);
  z-index: 1000;
`;

const LogWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 70px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogItem = styled.div`
  margin: 10px 0;
`;

const Customer_log = () => {
  const { buyerId } = useParams(); // url에서 buyerId 가져옴
  console.log("현재 buyerId: ", buyerId);
  const [logs, setLogs] = useState([]);
  //const [buyerId, setBuyerId] = useState(null); // buyerId를 로컬 상태로 관리

  useEffect(() => {
    const fetchLogs = async () => {
      if (!buyerId) {
        console.error("buyerId가 제공되지 않았습니다.");
        return; // buyerId가 없으면 함수 종료
      }

      try {
        const response = await axios.get(
          `http://13.125.100.193/buyer/purchase/${buyerId}/list`
        );

        // `buyer` 값과 `buyerId`가 일치하는 데이터만 필터링
        const filteredLogs = response.data.filter(
          (log) => log.buyer === parseInt(buyerId)
        );

        setLogs(filteredLogs.reverse()); // 최신순으로 역순 정렬하여 상태에 저장
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchLogs(); // buyerId가 변경될 때마다 fetchLogs 호출
  }, [buyerId]);

  const handleDelete = async (orderId) => {
    // 여기에 쓰이는 id는 order id
    try {
      // await axios.patch(`http://13.125.100.193/buyer/purchase/${buyerId}/cancel/${id}`);
      await axios.patch(
        `http://13.125.100.193/buyer/purchase/${buyerId}/cancel/${orderId}`
      );
      setLogs(logs.filter((log) => log.id !== orderId)); // 삭제 후 로그 목록에서 해당 주문 제거
      console.log("상태 변경 완료");
    } catch (error) {
      console.error("삭제 오류:", error);
    }
  };

  return (
    <>
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
              onDelete={() => handleDelete(log.id)} // log.id를 인자로 전달
              orderNumber={log.order_number}
            />
          </LogItem>
        ))}
      </LogWrapper>
      <Navbar />
    </>
  );
};

export default Customer_log;
