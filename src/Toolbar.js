import React, { Component } from 'react';
import styled from "styled-components";

const StyledToolbar = styled.header`
    flex: 0 0 auto;
    background: #333;
    padding: 10px 20px;
    color: #fff;
    display: flex;
`;

const Select = styled.select`
    margin-right: auto;
`;

export class Toolbar extends Component {
    render() {
        return (
            <StyledToolbar>
                <Select value={this.props.selectedFile} onChange={this.props.onFileChange}>
                    <option>View All</option>
                    {this.props.data.map(item => <option key={item.filename}>{item.filename}</option>)}
                </Select>
                <button onClick={this.props.findNearestSpacing}>Find Nearest Spacing</button>
                <button onClick={this.props.findNearestColor}>Find Nearest Color</button>
            </StyledToolbar>
        )
    }
}