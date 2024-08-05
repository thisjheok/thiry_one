import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 376px;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
`;
const Title = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #d94844;
  text-align: center;
  margin-left: auto;
`;
const PrevBtn = styled(Link)`
  display: flex;
  width: 25px;
  height: 24px;
  margin-left: 6px;
  border: none;
  background: none;
  text-decoration: none;
  padding: 0;
`;

const PrevIcon = styled.img`
  width: 24px;
  height: 24px;
  background: none;
`;

const Logo = styled.img`
  width: 25px;
  height: 24px;
  margin-left: 8px;
`;
const Bell = styled.img`
  width: 24px;
  height: 24px;
`;

// 이전 화살표 버튼 없는 그냥 메인 홈 헤더
const PrevHeader = () => {
  const { buyerId } = useParams(); // 구매자 id 받아오는 거

  return (
    <Container>
      <PrevBtn to={`/userhome/${buyerId}`}>
        <PrevIcon src="/assets/prev.svg" />
      </PrevBtn>
      <Title>
        떠리원
        <Logo src="/assets/logo_red.png" />
      </Title>
    </Container>
  );
};

export default PrevHeader;
