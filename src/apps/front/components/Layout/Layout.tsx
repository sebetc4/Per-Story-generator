import { ReactNode } from 'react';
import { AlertComponent, Footer, Header } from './components';
import { Box } from '@mui/material';
import { useAppSelector } from '../../hooks';

type LayoutProps = {
    children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    // Store
    const { layout } = useAppSelector((state) => state.app);

    return (
        <>
            <Header />
            <Box
                component='main'
                sx={{
                    minHeight: `calc(100vh - ${layout.headerHeight + layout.footerHeight}px)`,
                    background: 'radial-gradient(circle, rgba(91,155,213,0.4) 0%, rgba(254,254,254,1) 100%);',
                    pl: 24,
                    pr: 24,
                    pt: 12,
                    pb: 12,
                }}
            >
                {children}
            </Box>
            <AlertComponent />
            <Footer />
        </>
    );
};
