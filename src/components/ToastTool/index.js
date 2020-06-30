import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled, {withStyle} from 'styled-components';
import IconButton from './../IconButton/index.js';
import { motion } from "framer-motion";

const ToastTool = (props) => {
    const [active, setActive] = useState(false);
    useEffect(()=>{
        if(props.id){
            setActive(true);
            let timer1 = setTimeout(() => {
                setActive(false);
            }, 3000)
            return () => {
                clearTimeout(timer1)
            }
        }
    }, [props.id]);
    const handleClose = () => {
        setActive(false);
    }
    const renderToast = () => {
        return <React.Fragment>
            <p className="toast-text">{props.text}</p>
            </React.Fragment>
    }

    return <Container key={"toasttool"} className="z-ui" initial={HIDDEN} animate={active?VISIBLE:HIDDEN} 
            backgroundColor={props.backgroundColor}>
           {renderToast()}
    </Container>
}


const VISIBLE = {
    opacity: 1,
    y: '0%'
}
const HIDDEN = {
    opacity: 0,
    y: '200%'
}

ToastTool.propTypes = {
    id: PropTypes.string, //makes view appear
    text: PropTypes.string,
    title: PropTypes.string,
    timeout: PropTypes.number,
    backgroundColor: PropTypes.string
}


export default ToastTool;

const Container = styled(motion.div)`
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    max-width: 600px;
    margin: auto;
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.highlight};
    border: 3px solid ${props => props.theme.neutral};
    box-shadow: 0px 5px 8px black;
    padding: 10px;
    .close{
        float: right;
    }
    z-index: 3;
    .toast-text{
        text-align: center;
    }
`

/**
 * background-color:  ${props => props.theme.getColor(props.theme, props.backgroundColor, props.theme.primaryD)};
 *   .close{
        position: absolute;
        top: ${props => props.lowerClose?'21px':'17px'};
        right: 8px;
    }
 */