
export const lightenHexColor = (hex: string, percent: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const newR = Math.round(Math.min(255, r + (255 - r) * percent));
    const newG = Math.round(Math.min(255, g + (255 - g) * percent));
    const newB = Math.round(Math.min(255, b + (255 - b) * percent));
    const newHex =
        '#' +
        newR.toString(16).padStart(2, '0') +
        newG.toString(16).padStart(2, '0') +
        newB.toString(16).padStart(2, '0');
    return newHex;
};

export const darkenHexColor = (hex: string, percent: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const newR = Math.round(r - r * percent);
    const newG = Math.round(g - g * percent);
    const newB = Math.round(b - b * percent);
    const newHex =
        '#' +
        newR.toString(16).padStart(2, '0') +
        newG.toString(16).padStart(2, '0') +
        newB.toString(16).padStart(2, '0');

    return newHex;
};
