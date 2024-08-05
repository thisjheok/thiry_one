import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BackButton = styled.button`
position: absolute;
width: 24px;
height: 24px;
left: 20px;
top: 16px;
cursor:pointer;
padding:none;
margin:none;
border:none;
background:none;
`
const ArrowImg = styled.img`
    width: 24px;
    height: 24px;
`

const Back_arrow = () => {
    const navigate = useNavigate();

    return(
        <>
            <BackButton onClick={() => navigate(-1)}>
                <ArrowImg src="assets/back_arrow.svg"/>
            </BackButton>
        </>
    );
};

export default Back_arrow;