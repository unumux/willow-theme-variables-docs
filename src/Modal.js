import React, { Component } from 'react';
import styled from "styled-components";

const ModalBackground = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    background: rgba(0, 0, 0, 0.8);
    align-items: center;
    justify-content: center;
`;

const StyledModal = styled.div`
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.9);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    padding: 20px;
    position: relative;
    font-size: 20px;
    width: calc(100vw - 20px);
    max-width: 500px;
`;

const ExitButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background: none;
    font-size: 18px;
    padding: 10px;
`;

export class Modal extends Component {
    render() {
        return (
            <ModalBackground onClick={this.props.onDismiss}>
                <StyledModal onClick={(e) => e.stopPropagation()}>
                    <ExitButton onClick={this.props.onDismiss}>&#10006;</ExitButton>
                    {this.props.children}
                </StyledModal>
            </ModalBackground>
        )
    }
}