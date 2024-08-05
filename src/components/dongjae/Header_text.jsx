import React from "react";
import styled from "styled-components";

const Text = styled.p`
position: absolute;
width: 74px;
height: 27px;
left: calc(50% - 74px/2);
top: 16px;

/* TItle/20px/Bold */
font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 27px;

color: #000000;
border:none;
margin:0;

`

const Header_text = (props) => {
    return(
        <>
            <Text>{props.text}</Text>
        </>
    );
};

export default Header_text;