import styled from 'styled-components';

export const Icon = styled.span` 
    display: inline;
    pointer-events:auto;
    text-align: center;
    top: 0px; left: 0px;
    &:before{
        font-size: ${props => props.theme.getFontSize(props.theme, props.iconSize || props.fontSize, 'iconXS')};
        @media (min-width: ${props => props.theme.mediaM}){
            font-size: ${props => props.theme.getFontSize(props.theme, props.iconSize || props.fontSize, 'iconS')};
        }
    }
    ${props => props.width?`width: ${props.width};`:'width: 50px;'}
    color: ${props => {
        if(props.disabled) return `grey`;
        return props.theme.getColor(props.theme, props.color, 'pink')}};
    
    position: relative;

    &.rotates:before{
        display: block;
        transition: transform ${props => props.theme.animS} ease;
        ${props => {
              if(props.rotate){
                  return `transform: rotate(${props.rotate}deg)`;
              }
          }}
    }
`

//margin:0px 4px;
export const Btn = styled.button`
    ${props => props.height?`min-height: ${props.height};`:'min-height: 50px;'}
    ${props => props.width?`min-width: ${props.width};`:'min-width: 50px;'}
    ${props => props.top?`top: ${props.top};`:''}
    max-width: 95%;
    margin: auto;
    ${props => props.round?`border-radius: 50%;`:'border-radius: 5px;'}
    border: none;
    outline: 0;
    background: ${props => props.theme.getColor(props.theme, props.bgColor, 'transparent')};
    position: relative;
    opacity: ${props => props.hover?props.disabled?'0.5':'0.8':'1'};
   
    display: inline-block;
 
    ${props => props.padding?`padding: ${props.padding};`:''}

    ${props => {
        if(props.glow){
            return `box-shadow: 0 0 2px #fff, 0 0 3px #fff, 0 0 5px ${props.theme.getColor(props.theme, props.glow)}, 
                0 0 6px ${props.theme.getColor(props.theme, props.glow)}, 0 0 8px ${props.theme.getColor(props.theme, props.glow)}, 
                0 0 10px ${props.theme.getColor(props.theme, props.glow)}, 0 0 20px ${props.theme.getColor(props.theme, props.glow)};
                
                margin:10px;
                `
        }
    }}
    ${props => `transition: opacity ${props.theme.animS} ease, transform ${props.theme.animS} ease; `}
    ${props => {
        if(!props.disabled){
            return `
                &:hover{
                    opacity: 1;
                    ${props.hoverScale?`transform: scale(1.3);`:``}
                }
            `
        }
    }}
    font-size: ${props => props.theme.remS};


    .text-icon{
        @media(min-width: ${props => props.theme.mediaM}){
            float: left;
        }
    }
`

export const BtnText = styled.span`
    transform: translateY(-50%);
    display: inline-block;
`