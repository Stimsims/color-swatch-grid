import styled from 'styled-components';

export const Item = styled.button`
    border: 0;
    outline: none;
    box-sizing: border-box;
    left: 0px; top: 0px;
    background-color: #F263CC;
    border-radius: 5px;
    color:  black;
    min-width: 50px;
    margin: 10px;
    transition: opacity 0.3 ease, background-color 0.1s ease;
    opacity: 0.8;
    &:hover{
        opacity: 1;
    }
    &:active{
        background-color: blue;
    }

`
/*

    ${props => {
        if(props.hover){
            return `
                transition: opacity ${props => props.theme.animS} ease;
                &:hover{
                    opacity: 1;
                }
            `
        }
    }}


        ${props => {
        if(props.glow){
            return `
                background-color: ${props.theme.primaryD};
                box-shadow: 0 0 2px #fff, 0 0 3px #fff, 0 0 5px ${props.theme.getColor(props.theme, props.glow)}, 
                0 0 6px ${props.theme.getColor(props.theme, props.glow)}, 0 0 8px ${props.theme.getColor(props.theme, props.glow)}, 
                0 0 10px ${props.theme.getColor(props.theme, props.glow)}, 0 0 20px ${props.theme.getColor(props.theme, props.glow)};
                
                `
        }
    }}
*/