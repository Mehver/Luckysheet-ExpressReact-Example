export const toolBarCss = {
    position: 'absolute',
    top: '0px',
    width: '100%',
    height: '30px',
    backgroundColor: '#abc',
}
export const titleCss = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff',
    float: 'left',
    position: 'relative',
    top: '-21px',
    left: '8px'
}

export const barCss = {
    position: 'absolute',
    top: '3.5px',
    left: '400px',
    height: '23px',
    backgroundColor: '#abc',
    overflow: 'hidden',
};

let width_button = 33;
let iconSize = 16;
if (window.innerWidth < 640) {
    width_button = (window.innerWidth - 400) / 7;
    iconSize = window.innerWidth / 34;
}

export const buttonCss = {
    float: 'left',
    cursor: 'pointer',
    left: 15,
    width: width_button,
    backgroundColor: '#fff',
    border: '2px solid #abc',
    height: '23px',
};

export const iconCss = {
    fontSize: iconSize,
    color: '#abc',
};