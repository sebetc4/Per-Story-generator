import { useAppSelector } from '@/apps/front/hooks';
import { CircularProgress, Container } from '@mui/material';
import React from 'react';



export const LoaderContainer = () => {
    // Store
    const { layout } = useAppSelector((state) => state.app);
    
    return (
        <Container
            sx={{
                height: `calc(100vh - ${layout.headerHeight + layout.footerHeight}px)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress color='secondary' />
        </Container>
    );
};
