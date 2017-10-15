import React, { Component } from 'react';
import styled from "styled-components";

const VariablesContainer = styled.section`
    background: #ddd;
    border: 1px solid rgba(0,0,0,0.2);
    margin-bottom: 10px;
`;

const Filename = styled.h1`
    background: #666;
    color: #fafafa;
    padding: 10px;  
    margin: 0;  
    font-size: 20px;
`;

const StyledVariablesTable = styled.table`
    border-collapse: collapse;
    width: 100%;
`;

const TH = styled.th`
    background: #888;
    color: #fafafa;
    text-align: right;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    width: 1%;
    white-space: nowrap;
`;

const TD = styled.td`
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

export const Variables = ({filename, variables}) => (
    <VariablesContainer key={filename}>
        <Filename>{filename}</Filename>
        <VariablesTable variables={variables} />
    </VariablesContainer>
);

const VariablesTable = ({variables}) => (
    <StyledVariablesTable>
        <tbody>
            {Object.keys(variables).map((key, i) => {
                const value = variables[key];
                return (
                    <tr key={key}>
                        <TH>{key}:</TH>
                        <TD>{typeof value === 'string' ? value : <VariablesTable variables={value} />}</TD>
                    </tr>
                )
            })}
        </tbody>
    </StyledVariablesTable>  
);