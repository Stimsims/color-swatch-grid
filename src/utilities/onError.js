import {sendError, log} from './measure.js';

if(typeof window !== 'undefined'){
    window.onerror = (msg, src, lineno, colno, err) => {
        if(process.env.GATSBY_MY_ENV === 'production'){
            //send general to google
            sendError(msg, true);
        }else{
            //print details to console
            log(`%c ` + msg,  err, 'error', "color: pink");
        }
        return true;
    }
}