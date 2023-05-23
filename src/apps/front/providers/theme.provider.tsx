import { createContext, ReactNode, useMemo, useState } from 'react';
import { createTheme, CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { commonTheme, darkPalette, darkTheme, lightPalette, lightTheme } from '../theme';

interface CustomThemeProvider {
    children: ReactNode;
}

export const CustomThemeProvider = ({ children }: CustomThemeProvider) => {
    // State
    const [mode, setMode] = useState<PaletteMode>('light');

    // Context
    const ColorModeContext = createContext({ toggleColorMode: () => {} });

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                ...commonTheme,
                ...(mode === 'light' ? lightTheme : darkTheme),
                palette: {
                    mode,
                    ...(mode === 'light' ? lightPalette : darkPalette),
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <CssBaseline />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};
