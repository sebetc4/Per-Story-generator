import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';
import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

type ImageSectionProps = {
    setImage: (image: string) => void
};

export const ImageSection = ({setImage}: ImageSectionProps) => {
    // Hooks
    const theme = useTheme();
    const dispatch = useAppDispatch();

    // Store
    const { modifiedData } = useAppSelector((state) => state.chapterModification);

    // State
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(modifiedData.image?.url || null);

    const handleChangeImage = (e: FormEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result as string);
                setImagePreview(reader.result);
            }
        };
        if (!e.currentTarget.files) {
            return;
        }
        reader.readAsDataURL(e.currentTarget.files[0]);
    };
    return (
        <Box
            component='section'
            sx={{
                width: '100%',
                maxWidth: '900px',
                backgroundColor: theme.palette.grey[400],
                p: 6,
                pt: 0,
                borderRadius: 6,
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;',
            }}
        >
            <Divider
                component='div'
                role='presentation'
                sx={{
                    '&::before, &::after': {
                        borderTopWidth: '3px',
                    },
                }}
            >
                <Typography
                    variant='h3'
                    component='h3'
                    sx={{
                        mt: 6,
                        mb: 6,
                    }}
                >
                    Illustration
                </Typography>
            </Divider>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                }}
            >
                {imagePreview && (
                    <Image
                        src={imagePreview as string}
                        alt='image'
                        width={350}
                        height={350}
                    />
                )}
                <Button
                    color='primary'
                    aria-label='upload picture'
                    component='label'
                    variant='contained'
                    endIcon={<PhotoCameraIcon />}
                >
                    <input
                        hidden
                        onChange={handleChangeImage}
                        accept='image/*'
                        type='file'
                    />
                    {imagePreview ? "Modifier l'image" : 'Ajouter une image'}
                </Button>
            </Box>
        </Box>
    );
};
