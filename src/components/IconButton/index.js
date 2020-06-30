import React from "react";
import PropTypes from 'prop-types';
  import './styles/style.css';
 import {Icon, Btn} from './IconButton.css.js';

class IconButton extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        //this.state = {mounted: false};
    }

    handleClick(){
        if(this.props.onInput){
            this.props.onInput(this.props.id, this.props.out, this.props.viewProps, this.props.mergeInput);
        }
    }
    getIcon(){
        return <Icon className={`${this.props.icon} inline rotates ${this.props.text?'text-icon':''} `} 
                rotate={this.props.rotate}  color={this.props.color} iconSize={this.props.iconSize}
            disabled={this.props.disabled?this.props.disabled:false} fontSize={this.props.fontSize} 
            />;
    }
    makeButton(view){
        return <Btn key={this.props.id} id={this.props.id} 
                    rotate={this.props.rotate}  
                    width={this.props.width} height={this.props.height} 
                    padding={this.props.padding}
                    hover={this.props.hover}
                    bgColor={this.props.bgColor}
                    top={this.props.top}
                    style={this.props.style}
                    className={`glyph fs1 ${this.props.className?this.props.className:''}`} 
                    onClick={this.handleClick}>
                    {view}
                </Btn>
    }
    render(){
        
        return this.makeButton(<div>
        {this.getIcon()}
        </div>
    )
    }
}

IconButton.propTypes = {
    hover: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
      ]),
    color: PropTypes.string,
    icon: PropTypes.string.isRequired,
    fontSize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
    disabled: PropTypes.bool
}

export default IconButton;
