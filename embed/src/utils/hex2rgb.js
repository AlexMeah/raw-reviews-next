export default function hex2Rgba(_hex, alpha) {
    let hex = _hex;

    if (_hex.length === 4) {
        hex += hex.slice(1, 4);
    }

    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    return `${r}, ${g}, ${b}${alpha ? `, ${alpha}` : ''}`;
}
