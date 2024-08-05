import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../pages/dongjae/Layout";
import Back_arrow from "../../components/dongjae/Back_arrow";
import Header_text from "../../components/dongjae/Header_text";

const Text1 = styled.img`
position: absolute;
width: 319px;
height: 142px;
left: calc(50% - 319px/2 - 0.5px);
top: 150px;

font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
font-size: 64px;
line-height: 87px;

color: #FFFFFF;
`
const Text2 = styled.img`
/* 월 12,900원으로 남은 식품을 손쉽게 판매하고 재고 부담을 줄이세요! */

position: absolute;
width: 312px;
height: 99px;
left: 22px;
top: 321px;

/* TItle/24px/Bold */
font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 33px;

/* Gray 50 */
color: #1F1F1F;


`
const WhiteLogo = styled.img`
    /* image 4 */

position: absolute;
width: 76px;
height: 80px;
left: 210px;
top: 146px;
`

const Sub_button = styled.button`
    /* Frame 9 */

position: absolute;
width: 376px;
height: 250px;
left: calc(50% - 376px/2);
top: 562px;

/* main */
background: #D94844;
border-radius: 15px;
border:none;
padding:0;
margin:0;
`
const ButtnonImg = styled.img`
    width: 376px;
    height: 250px;
    border:none;
    padding:0;
    margin:0;
`
const Subscribe = () => {
    const navigate = useNavigate();

    return(
        <>
            <Back_arrow></Back_arrow>
            <Header_text text="구독하기"></Header_text>
            <Text1 src="assets/main_text_red.svg" />
            <Text2 src="assets/subscribe_text.svg"/>
            <WhiteLogo src="assets/logo_red.png"/>
            <Sub_button onClick={() => navigate("/sellerhome")}>
                <ButtnonImg src="assets/subscribe_button.svg"/>
            </Sub_button>
        </>
    );
};

export default Subscribe;