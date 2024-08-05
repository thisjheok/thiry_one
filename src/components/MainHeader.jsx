import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 376px;
  height: 70px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #d94844;
  margin-bottom: 10px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
`;

const Logo = styled.img`
  width: 25px;
  height: 24px;
  margin-left: 8px;
`;

// 이전 화살표 버튼 없는 그냥 메인 홈 헤더
const MainHeader = () => {
  return (
    <Container>
      <Title>
        떠리원
        <Logo src="/assets/white_logo.svg" />
      </Title>
    </Container>
  );
};

export default MainHeader;
