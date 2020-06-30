import {sendError} from './measure.js';

if(typeof window !== 'undefined'){
    window.onerror = (msg, src, lineno, colno, err) => {
        // if(process.env.GATSBY_MY_ENV === 'production'){
        //     //send general to google
        //     sendError(msg, true);
        // }
        sendError(msg, true);
        return true;
    }
}