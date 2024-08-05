import React from "react";
import styled from "styled-components";
import Layout from "../../pages/dongjae/Layout";
import { useNavigate } from "react-router-dom";

const Background = styled.div`
    width:376px;
    height:812px;
    background-color:#D94844;
`

const Text1 = styled.img`
position: absolute;
width: 319px;
height: 142px;
left: calc(50% - 319px/2 - 0.5px);
top: 241px;

font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
font-size: 64px;
line-height: 87px;

color: #FFFFFF;
`
const Text2 = styled.img`
position: absolute;
width: 352px;
height: 58px;
left: calc(50% - 352px/2);
top: 406px;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 29px;
text-align: center;

color: #FFFFFF;
`

const WhiteLogo = styled.img`
    /* image 4 */

position: absolute;
width: 80px;
height: 80px;
left: 210px;
top: 241px;
`
const Sellerbutton = styled.button`

position: absolute;
width: 336px;
height: 52px;
top: 624px;
border-radius:15px;
left:22px;
border:none;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
`
const Customerbutton = styled.button`
position: absolute;
width: 336px;
height: 52px;
top: 684px;
left:22px;
border-radius:15px;
border:none;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
`
const ButtonText = styled.p`

/* TItle/20px/Bold */
font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 27px;

/* main */
color: #D94844;
`

const Login = () => {
    const navigate = useNavigate();
    return(
        <>
            <Background>
                <Text1 src="assets/logo_text.svg" />
                <Text2 src="assets/main_text.svg"/>
                <WhiteLogo src="assets/white_logo.svg"/>
                <Sellerbutton onClick={() => navigate("/subscribe")}>
                    <ButtonText>판매자로 시작하기</ButtonText>
                </Sellerbutton>
                <Customerbutton onClick={() => navigate("/customer_start")}>
                    <ButtonText>구매자로 시작하기</ButtonText>
                </Customerbutton>

            </Background>
        </>
    );
};

export default Login;
