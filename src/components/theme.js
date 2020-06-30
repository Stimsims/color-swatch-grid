
const graphColors =  ['#FF7CFF', '#CF2556', '#8F2B6C', '#FF690D', '#FFBE50'];

export const theme = {
    primary: '#C11227',
    primaryDark: '#921227',
    primaryLight: '#D61227',
    secondary: '#334C73',
    tertiary: '#6792A6',
    neutral: '#A7B8C0',
    highlight: '#D8DADB',
    text: 'black',
    animS:'0.3s',
    getColor: (theme, color, fallback) => {
        if(theme[color]){
            return theme[color];
        }else if(color && color !== true){
            return color;
        }else{
            if(fallback){
                return theme[fallback] || fallback;
            }
            return theme.text;
        }
    },

    getFontSize: (theme, size, fallback) => {
        if(theme[size]){
            return theme[size];
        }else if(size && size !== true){
            return size + 'em';
        }else{
            if(fallback) return theme[fallback]?theme[fallback]:fallback+'em';
            return theme.remS;
        }
    }
}

