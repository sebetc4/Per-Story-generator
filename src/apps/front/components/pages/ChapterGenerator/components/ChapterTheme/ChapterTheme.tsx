// Librairies
import { ChangeEvent } from 'react';
// MUI
import { Box, Divider, Switch, Typography, useTheme } from '@mui/material';
// App
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';
import { CustomAutoResize } from '@/apps/front/components/CustomAutoResize/CustomAutoResize';
import { setNextChapterTheme, toggleNextChapterThemeIsEnable } from '@/store';

// App

export const ChapterTheme = () => {
    // Hooks
    const theme = useTheme();
    const dispatch = useAppDispatch();

    // Store
    const { nextChapter } = useAppSelector((state) => state.chapterGenerator);

    const handleSwitchThemeIsEnable = () => {
        dispatch(toggleNextChapterThemeIsEnable());
    };
    const handleNextChapterTheme = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setNextChapterTheme(e.target.value));
    };

    return (
        <Box
            component='section'
            sx={{
                backgroundColor: theme.palette.grey[400],
                p: 6,
                borderRadius: 6,
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;',
            }}
        >
            <Divider
                textAlign='left'
                sx={{
                    '&::before, &::after': {
                        borderTopWidth: 3,
                    },
                }}
            >
                <Typography
                    component='h3'
                    variant='h3'
                    textAlign='center'
                >
                    Thème du chapitre
                </Typography>
            </Divider>
            <Box sx={{ mt: 6 }}>
                <CustomAutoResize
                    placeholder='Quelle est la thèmatique de ce chapitre...'
                    minRows={4}
                    maxRows={8}
                    disabled={!nextChapter.themeIsEnabled}
                    onChange={handleNextChapterTheme}
                    value={nextChapter.theme}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <Typography
                        sx={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            mr: 2,
                        }}
                    >
                        Ajouter un thème pour le chapitre
                    </Typography>
                    <Switch
                        checked={nextChapter.themeIsEnabled}
                        onChange={handleSwitchThemeIsEnable}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Box>
            </Box>
        </Box>
    );
};
