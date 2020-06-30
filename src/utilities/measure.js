
const PROPERTY = 'UA-149526395-11';
export const WARN = 'warn';
export const ERROR = 'error';
export const log = (message, object, level, style) => {
    switch(level){
        case 'error': console.error(message, style, object);
        case 'warn': console.warn(message, style, object);
        case 'log':
        default:
                console.log(message, style, object);
    }
}


const isGtagReady = () => {
    return window && window.gtag;
}
const getClient = () => {
    if(!window || !window.gtag) return ()=>{log(`error: gtag not available, returned mock method`, 'error')};
    return window.gtag;
}


export const sendError = (description, fatal = false) => {
    log(`sendError ${description}`, 'error');
    if(isGtagReady()){
        getClient()('event', 'exception', {
            'send_to': PROPERTY,
            'description': description,
            'fatal': fatal   
          });
    }
}

export const sendPageView = (url) => {
    if(isGtagReady()){
        getClient()('send', url, {
            'send_to': PROPERTY
        });
    }
}

export const sendEvent = (category, action, label, value) => {
        if(isGtagReady()){
            getClient()('event', action, {
                hitType: 'event',
                ['event_category']: category,
                ['event_action']: action,
                ['event_label']: label,
                ['event_value']: value,
                'send_to': 'UA-149526395-11'
            });
        }
  }


