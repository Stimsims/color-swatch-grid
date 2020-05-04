import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import {Item, Container} from './Button.css.js';

export default class NormalButton extends React.PureComponent{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(ev){
        ev.stopPropagation();
        ev.preventDefault();
        this.props.onClick(this.props.id);
    }
    render(){
        return <Item key={this.props.id} 
            id={this.props.id} 
            onClick={this.handleClick} 
            aria-labelledby={this.props['aria-labelledby']}
        >
         <p>{this.props.text}</p>
    </Item>
    }
}
NormalButton.displayName = "ViewBtnBtn";
NormalButton.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
    onInput: PropTypes.func, //card form uses button, but does not use onInput on trigger, so not required
    error: PropTypes.string //message to display if error occurs
}
