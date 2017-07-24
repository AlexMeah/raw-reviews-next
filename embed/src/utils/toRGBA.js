import hex2rgb from './hex2rgb';

export default (_color, alpha) => {
    let color = _color;

    if (_color.indexOf('#') === 0) {
        color = hex2rgb(color);
    }

    return `rgba(${color}, ${alpha})`;
};
