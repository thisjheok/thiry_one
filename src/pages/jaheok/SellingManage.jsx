import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Background = styled.div`
    width: 100%;
    max-width: 376px;
    height: 100vh;
    background-color: #ffffff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    padding: 20px;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 30px;
`;

const BackIcon = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
    position: absolute;
    left: 20px;
`;

const Content = styled.div`
    width: 100%;
    max-width: 376px;
    height: 100%;
    padding: 80px 20px 20px 20px; /* 헤더 높이만큼 위쪽 패딩 추가 */
    box-sizing: border-box;
    overflow-y: auto; /* 스크롤바가 상품 목록에만 생기도록 설정 */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const ProductList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ProductItem = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 8px;
    margin-right: 10px;
`;

const ProductInfo = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const ProductName = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const ProductPrice = styled.div`
    font-size: 14px;
    color: #666;
`;

const ProductStock = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
`;

const StockLabel = styled.div`
    margin-right: 5px;
`;

const StockCount = styled.div`
    color: ${props => (props.stock > 0 ? 'red' : 'red')};
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 376px;
  height: 60px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #d94844;
  text-align: center;
`;


const SellingManage = () => {
    const [products, setProducts] = useState([]);
    const [storeName, setStoreName] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        // 데이터를 가져오는 함수
        const fetchData = async () => {
            try {
                const response = await axios.get('http://13.125.100.193/store/1/product/list');
                const data = response.data;
                setProducts(data.products);
                setStoreName(data.store_name);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const handleBackClick = () => {
        navigate(-1);
      };
    return (
        <Background>
         <HeaderContainer>
          <BackIcon src="../assets/prev.svg" alt="Back" onClick={handleBackClick} />
          <HeaderTitle>상품 관리</HeaderTitle>
        </HeaderContainer>
            <Content>
                <ProductList>
                    {products.map((product, index) => (
                        <ProductItem key={index}>
                            <ProductImage src={`http://13.125.100.193/media/${product.photo}`} alt="product" />
                            <ProductInfo>
                                <ProductName>{product.name}</ProductName>
                                <ProductPrice>{product.price}원</ProductPrice>
                            </ProductInfo>
                            <ProductStock>
                                <StockLabel>재고</StockLabel>
                                <StockCount stock={product.amount}>{product.amount}</StockCount>
                            </ProductStock>
                        </ProductItem>
                    ))}
                </ProductList>
            </Content>
        </Background>
    );
};

export default SellingManage;
