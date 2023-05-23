// Librairies
import { ChangeEvent } from 'react';
// MUI
import { Box, Divider, Typography, useTheme } from '@mui/material';
// App
import { CustomAutoResize } from '@/apps/front/components';
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';
import { setGeneratedChapterChoices, setModifiedChapterChoices } from '@/store';

export const Choices = () => {
    // Hooks
    const theme = useTheme();
    const dispatch = useAppDispatch();

    // Store
    const {modifiedData} = useAppSelector((state) => state.chapterModification);

    const handleChangeChoice = (e: ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const { value } = e.target;
        dispatch(setModifiedChapterChoices({ choice: value, index }));
    };
    return (
        <Box
        component='section'
            sx={{
                width: '100%',
                maxWidth: modifiedData.allChoices.length === 3 ? '1200' : '900px',
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
                    Les choix
                </Typography>
            </Divider>
            <Box sx={{ display: 'flex', gap: 6 }}>
                {modifiedData.allChoices.map((_, i) => (
                    <Box
                        key={`choice-${i + 1}`}
                        sx={{ flex: 1 }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                            <Typography
                                textAlign='center'
                                sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                            >
                                {`Choix ${i + 1}`}
                            </Typography>
                        </Box>
                        <CustomAutoResize
                            placeholder={`Le ${i === 0 ? 'premier' : i === 1 ? 'deuxième' : 'troisième'} choix...`}
                            minRows={4}
                            maxRows={8}
                            value={modifiedData.allChoices[i]}
                            onChange={(e) => handleChangeChoice(e, i)}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
