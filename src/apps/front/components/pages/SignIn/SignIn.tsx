// Librairies
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '@/apps/front/hooks';
import { setAlert, signInWithCredendtials } from '@/store';
import { CustomError } from '@/package/classes';
import { SignInReq } from '@/package/types/request.types';
import { signInSchema } from '@/package/schemas/auth.schemas';
import { Routes } from '@/types';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { CustomTextField } from '../../inputs/CustomTextField/CustomTextField';
import { CustomPasswordInput } from '../../inputs/CustomPasswordInput/CustomPasswordInput';
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';
import BookImage from '../../../../../../public/images/signin-book.png';
import LogoImage from '../../../../../../public/images/logo.png';

export const SignIn = () => {
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
    } = useForm<SignInReq>({
        resolver: yupResolver(signInSchema),
        mode: 'onTouched',
    });

    // Handlera
    const onSubmit = async (data: SignInReq) => {
        const res = await dispatch(signInWithCredendtials(data));
        if (res.meta.requestStatus === 'fulfilled') {
            router.replace(Routes.STORY_SCHEMA);
        } else {
            switch (res.payload) {
                case CustomError.WRONG_EMAIL.message:
                    setError('email', { type: 'custom', message: "Pas d'adresse mail associée à se compte" });
                    break;
                case CustomError.WRONG_PASSWORD.message:
                    setError('password', { type: 'custom', message: 'wrong' });
                    break;
                default:
                    dispatch(setAlert({ type: 'error', message: 'error.login.default' }));
            }
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
                        alt="Logo de l'application"
                        width={333}
                        height={250}
                        style={{
                            borderRadius: 50,
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
                            Connecter vous
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
                            Se connecter
                        </LoadingButton>
                    </Box>
                    <Box sx={{ mt: 4, display: 'flex', gap: 1 }}>
                        <Typography>Vous n'avez pas de compte ?</Typography>
                        <Typography
                            component={Link}
                            href={Routes.SIGNUP}
                            color='primary'
                            sx={{
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            Inscrivez vous
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
