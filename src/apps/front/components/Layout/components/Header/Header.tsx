import { setHeaderHeight } from '@/store';
import { Routes } from '@/types';
import { Box, Button, Fab, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { OpenAiKey } from './Components/OpenAiKey/OpenAiKey';
import { signOut } from 'next-auth/react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppSelector } from '@/apps/front/hooks';
import Image from 'next/image';
import Logo from '../../../../../../../public/images/logo.png';
import Link from 'next/link';

export const Header = () => {
    // Hooks
    const theme = useTheme();
    const router = useRouter();
    const headerRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    // Store
    const { isAuth } = useAppSelector((state) => state.user);

    // State
    const [title, setTitle] = useState('');

    // Set height header on the store
    useEffect(() => {
        headerRef.current?.offsetHeight && dispatch(setHeaderHeight(headerRef.current?.offsetHeight));
    }, [headerRef.current?.offsetHeight, dispatch]);

    useEffect(() => {
        switch (router.pathname) {
            case Routes.NEW_STORY:
                setTitle('Commencer une nouvelle histoire');
                break;
            case Routes.CHAPTER_VALIDATION:
                setTitle('Nouveau chapitre');
                break;
            case Routes.CHAPTER_GENERATOR:
                setTitle('Générateur de Chapitre');
                break;
            case Routes.STORY_SCHEMA:
                setTitle("Schéma de l'histoire");
                break;
            case Routes.CHAPTER_MODIFICATION:
                setTitle('Modification du chapitre');
                break;
            default:
                setTitle('Générateur de Chapitre');
        }
    }, [router.pathname]);
    return (
        <Box
            ref={headerRef}
            sx={{
                position: 'relative',
                backgroundColor: theme.palette.secondary.main,
                boxShadow:
                    'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;',
            }}
        >
            <Link
                href={Routes.HOME}
                style={{
                    paddingTop: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '24px',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '150px',
                        height: '150px',
                        backgroundColor: 'black',
                        borderRadius: '50%',
                    }}
                >
                    <Image
                        src={Logo}
                        alt="logo de l'application"
                        fill
                    />
                </Box>
                <Typography
                    component='h1'
                    variant='mainTitle'
                    textAlign='center'
                    color='white'
                    sx={{
                        pt: 4,
                        pb: 4,
                        fontSize: '4rem',
                    }}
                >
                    {title}
                </Typography>
            </Link>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, pb: 2 }}>
                {isAuth ? (
                    <>
                        <Button
                            component={Link}
                            href={Routes.NEW_STORY}
                            size='large'
                            sx={{ fontSize: '1.3rem' }}
                        >
                            Nouvelle histoire
                        </Button>
                        <Button
                            component={Link}
                            href={Routes.STORY_SCHEMA}
                            size='large'
                            sx={{ fontSize: '1.3rem' }}
                        >
                            Histoire en cours
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            component={Link}
                            href={Routes.SIGNIN}
                            size='large'
                            sx={{ fontSize: '1.3rem' }}
                        >
                            Connexion
                        </Button>
                        <Button
                            component={Link}
                            href={Routes.SIGNUP}
                            size='large'
                            sx={{ fontSize: '1.3rem' }}
                        >
                            Inscription
                        </Button>
                    </>
                )}
            </Box>
            {isAuth && (
                <>
                    <Box sx={{ position: 'absolute', bottom: '20px', left: '150px' }}>
                        <OpenAiKey />
                    </Box>
                    <Box>
                        <Fab
                            color={'info'}
                            aria-label='logout'
                            onClick={() => signOut()}
                            sx={{ position: 'absolute', bottom: '20px',  right: '150px' }}
                        >
                            <LogoutIcon />
                        </Fab>
                    </Box>
                </>
            )}
        </Box>
    );
};
