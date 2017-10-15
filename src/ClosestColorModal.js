import React, { Component } from 'react';
import styled from "styled-components";

import * as color from "./util/color";

const ColorCompare = styled.div`
    display: flex;
    justify-content: center;
`;

const Color = styled.div`
    font-size: 10px;
    text-align: center;

    &::before {
        content: "";
        display: block;
        width: 100px;
        height: 100px;
        background-color: ${(props) => props.value};
        margin: 5px;
    }
`;

export const ClosestColorModal = ({enteredColor, closestColor}) => (
    <div>
        <p>
            Closest color variable is ${closestColor.key} with a value of {closestColor.value}. It has a difference of {Math.round(closestColor.deltaE * 100) / 100}, which is {color.deltaEText(closestColor.deltaE)}.
        </p>
        <ColorCompare>
            <Color value={enteredColor}>
                {enteredColor}
            </Color>
            <Color value={closestColor.value}>
                ${closestColor.key}
            </Color>
        </ColorCompare>
    </div>
)