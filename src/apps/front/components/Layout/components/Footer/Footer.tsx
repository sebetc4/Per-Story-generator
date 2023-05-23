import { useAppDispatch } from '@/apps/front/hooks';
import { setFooterHeight } from '@/store';
import { Box, Container, Link, Typography, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';

interface IFooterProps {}

export const Footer = ({}: IFooterProps) => {

    // Hooks
    const theme = useTheme()
    const footerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        footerRef.current?.offsetHeight && dispatch(setFooterHeight(footerRef.current?.offsetHeight));
    }, [footerRef.current?.offsetHeight, dispatch]);
    
    return (
        <Box
            component='footer'
            ref={footerRef}
            sx={{
                borderTop: 1,
                borderColor: '#164193',
                backgroundColor: theme.palette.secondary.light,
                zIndex: 1,
            }}
        >
            <Container
                maxWidth='xl'
                sx={{
                    pt: 6,
                    pb: 6,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography
                        color='white'
                        sx={{
                            fontSize: '1.5rem',
                        }}
                    >
                        Générateur de chapitre -
                    </Typography>
                    <Link
                        href='https://sebastien-etcheto.com'
                        style={{ textDecoration: 'none' }}
                    >
                        <Typography
                            sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                fontSize: '1.5rem',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Sébastien ETCHETO
                        </Typography>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
};
