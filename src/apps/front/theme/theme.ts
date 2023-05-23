import { darkenHexColor, lightenHexColor } from '../utils';

/**
 * Common Types
 */
declare module '@mui/material/styles' {
    interface Theme {}

    interface ThemeOptions {}

    interface BreakpointOverrides {
        xxs: true;
    }

    interface TypographyVariants {
        mainTitle: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        mainTitle?: React.CSSProperties;
    }
}

/**
 * Typography Types
 */
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        mainTitle: true;
    }
}

export const commonTheme = {
    typography: {
        h1: {
            fontFamily: "'Montserrat', sans-serif;",
        },
        h2: {
            fontFamily: "'Montserrat', sans-serif;",
            fontSize: '2rem',
            fontWeight: 'bold',
        },
        h3: {
            fontFamily: "'Montserrat', sans-serif;",
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
        h4: {
            fontFamily: "'Montserrat', sans-serif;",
        },
        mainTitle: {
            fontFamily: "'Rubik', sans-serif;",
            fontWeight: 'bold',
        },
        fontFamily: "'Hind Madurai', sans-serif",
    },
    breakpoints: {
        values: {
            xxs: 0,
            xs: 450,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    main: {
        padding: 6,
    },
};

/**
 * Colors Types
 */
type ColorPalette = {
    primary: {
        dark: string;
        light: string;
        main: string;
    };
    secondary: {
        dark: string;
        light: string;
        main: string;
    };
    tertiary: {
        main: string;
    };
    divider: string;
};

const primaryColor = '#f39200';
const secondaryColor = '#164193';

export const lightPalette: ColorPalette = {
    primary: {
        main: primaryColor,
        light: lightenHexColor(primaryColor, 0.4),
        dark: darkenHexColor(primaryColor, 0.3),
    },
    secondary: {
        main: secondaryColor,
        light: '#5b9bd5',
        dark: darkenHexColor(secondaryColor, 0.7),
    },
    tertiary: {
        main: '#c5192d',
    },
    divider: '#5b9bd5',
};

export const darkPalette: ColorPalette = {
    primary: {
        dark: '#844E27',
        light: '#844E27',
        main: '#B47B4A',
    },
    secondary: {
        dark: '#3B5936',
        light: '#A7B677',
        main: '#C39C6B',
    },
    tertiary: {
        main: '#F0EBCE',
    },
    divider: 'red',
};

type ColorTheme = {};

export const lightTheme: ColorTheme = {};

export const darkTheme: ColorTheme = {};
