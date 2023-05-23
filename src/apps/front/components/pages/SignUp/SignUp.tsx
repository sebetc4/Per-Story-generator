// Librairies
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '@/apps/front/hooks';
import { Box, Container, Grid, Typography, useTheme, useThemeProps } from '@mui/material';
import { CustomTextField } from '../../inputs/CustomTextField/CustomTextField';
import { SignUpReq } from '@/package/types/request.types';
import { signInSchema } from '@/package/schemas/auth.schemas';
import { CustomPasswordInput } from '../../inputs/CustomPasswordInput/CustomPasswordInput';
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';
import { Routes } from '@/types';
import Image from 'next/image';
import BookImage from '../../../../../../public/images/signup-book.png';
import LogoImage from '../../../../../../public/images/logo.png';
import { signUp } from '@/store';

export const SignUp = () => {
    // Hooks
    const dispatch = useAppDispatch();
    const router = useRouter();
    const theme = useTheme();

    // Form
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<SignUpReq>({
        resolver: yupResolver(signInSchema),
        mode: 'onTouched',
    });

    // Handlers
    const onSubmit = async (data: SignUpReq) => {
        const res = await dispatch(signUp(data));
        if (res.meta.requestStatus === 'fulfilled') {
            router.push(Routes.SIGNIN);
        } else {
        }
    };

    return (
        <Grid
            container
            maxWidth='xl'
            sx={{ ml: 'auto', mr: 'auto' }}
        >
            <Grid
                item
                xs={6}
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Container
                    maxWidth='xs'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        src={LogoImage}
                        alt='Hotel en bord de mer'
                        width={333}
                        height={250}
                        style={{
                            objectFit: 'cover',
                        }}
                        placeholder='blur'
                        quality={100}
                    />
                    <Box
                        sx={{
                            position: 'relative',
                            mb: 6,
                            ':before': {
                                content: '""',
                                position: 'absolute',
                                bottom: '-10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '50%',
                                height: '4px',
                                backgroundColor: theme.palette.primary.main,
                            },
                        }}
                    >
                        <Typography
                            component='h1'
                            variant='h2'
                        >
                            Créer un compte
                        </Typography>
                    </Box>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <CustomTextField
                            name='email'
                            label='Adresse e-mail'
                            type='email'
                            register={register('email')}
                            errorMessage={errors.email?.message || null}
                        />
                        <CustomPasswordInput
                            name='password'
                            label='Mot de passe'
                            register={register('password')}
                            errorMessage={errors.password?.message || null}
                        />
                        <LoadingButton
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            type='submit'
                            variant='contained'
                            size='large'
                            fullWidth
                            sx={{ mt: 1 }}
                        >
                            S'inscrire
                        </LoadingButton>
                    </Box>
                    <Box sx={{ mt: 4, display: 'flex', gap: 1 }}>
                        <Typography>Vous avez déjà un compte ?</Typography>
                        <Typography
                            component={Link}
                            href={Routes.SIGNIN}
                            color='primary'
                            sx={{
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            Connectez vous
                        </Typography>
                    </Box>
                </Container>
            </Grid>
            <Grid
                item
                xs={6}
                sx={{
                    position: 'relative',
                    borderTopLeftRadius: 80,
                    borderBottomLeftRadius: 80,
                    overflow: 'hidden',
                }}
            >
                <Image
                    src={BookImage}
                    alt='Livre ouvert'
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                    placeholder='blur'
                    quality={100}
                />
            </Grid>
        </Grid>
    );
};
