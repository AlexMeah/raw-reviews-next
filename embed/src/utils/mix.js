import hex2rgb from './hex2rgb';

const keys = ['r', 'g', 'b', 'a'];
const breakColor = color =>
    color.split(',').map(v => v.trim()).reduce((c, v, i) =>
        Object.assign(c, {
            [keys[i]]: v
        }), {
        a: 1
    });

export default function mix(_color1, _color2, weight) {
    let color1;
    let color2;

    if (_color1.indexOf('#') > -1) {
        color1 = hex2rgb(_color1);
    }

    if (_color2.indexOf('#') > -1) {
        color2 = hex2rgb(_color2);
    }

    color1 = breakColor(color1);
    color2 = breakColor(color2);

    const p = weight === undefined ? 0.5 : weight;

    const w = 2 * p - 1;
    const a = color1.a - color2.a;

    const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
    const w2 = 1 - w1;

    return `rgba(${Math.round(w1 * color1.r + w2 * color2.r)}, ${Math.round(w1 * color1.g + w2 * color2.g)}, ${Math.round(w1 * color1.b + w2 * color2.b)}, ${Math.round(color1.a * p + color2.a * (1 - p))})`;
}
