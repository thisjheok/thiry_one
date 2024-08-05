import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Background = styled.div`
  width: 100%;
  max-width: 376px;
  height: 100vh;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 20px;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  left: 20px;
`;
const Title = styled.div`
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 60px;
  text-align: left;
  color: #303030;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #3d3d3d;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
  resize: none;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
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

const ProductRegistration = () => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [amount, setAmount] = useState("");
  const [content, setContent] = useState("");

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("name", name);
    formData.append("product_type", productType);
    formData.append("price", price);
    formData.append("sale_price", salePrice);
    formData.append("amount", amount);
    formData.append("content", content);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://13.125.100.193/store/create/1/product",
        formData
      );
      console.log("Product registered successfully:", response.data);
    } catch (error) {
      console.error("Error registering product:", error);
    }
  };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };
    const handleBackClick = () => {
        navigate(-1);
      };
    return (
        <Background>
         <HeaderContainer>
          <BackIcon src="../assets/prev.svg" alt="Back" onClick={handleBackClick} />
          <HeaderTitle>상품 등록</HeaderTitle>
        </HeaderContainer>
            <Title>떨이 시작하기</Title>
            <Form onSubmit={handleSubmit}>
                <FormItem>
                    <Label>상품 사진</Label>
                    <Input type="file" onChange={handlePhotoChange} />
                </FormItem>
                <FormItem>
                    <Label>상품명</Label>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="상품명을 입력해주세요" />
                </FormItem>
                <FormItem>
                    <Label>상품 종류</Label>
                    <Select value={productType} onChange={(e) => setProductType(e.target.value)}>
                        <option value="">카테고리를 선택해주세요</option>
                        <option value="BAK">빵&간식류</option>
                        <option value="BUT">정육제품</option>
                        <option value="FRU">과일류</option>
                        <option value="VEG">채소류</option>
                        <option value="SID">반찬가게</option>
                        <option value="ETC">기타</option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Label>상품 가격</Label>
                    <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="상품 가격을 입력해주세요" />
                </FormItem>
                <FormItem>
                    <Label>할인 가격</Label>
                    <Input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="할인 가격을 입력해주세요" />
                </FormItem>
                <FormItem>
                    <Label>수량</Label>
                    <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="수량을 입력해주세요" />
                </FormItem>
                <FormItem>
                    <Label>상품 설명</Label>
                    <TextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder="상품 설명을 입력해주세요" rows="4" />
                </FormItem>
                <SubmitButton type="submit" onClick={handleBackClick}>등록 완료</SubmitButton>
            </Form>
        </Background>
    );
};

export default ProductRegistration;
