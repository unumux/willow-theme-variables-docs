import React, { Component } from 'react';
import styled from "styled-components";

import {Variables} from "./Variables";

const StyledMain = styled.main`
    flex: 1 1 0px;
    padding: 10px;
    overflow: auto;
`;

export class Main extends React.Component {
    render() {
        const {data} = this.props;

        return (
            <StyledMain>
                {data.map(Variables)}
            </StyledMain>
        )
    }
}