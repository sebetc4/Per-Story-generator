// Libraries
import { useState } from 'react';
// MUI
import { Box, Divider, IconButton, TextField, Typography, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
// App
import { setAlert, setNextChapterAllRequiredWords } from '@/store';
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';

export const RequiredWords = () => {
    // Hook
    const theme = useTheme();
    const dispatch = useAppDispatch();

    // Store
    const { nextChapter } = useAppSelector((state) => state.chapterGenerator);

    const [word, setWord] = useState('');

    const addWord = () => {
        if (word.trim().length === 0) return;
        if (nextChapter.allRequiredWords.includes(word)) {
            dispatch(setAlert({ type: 'error', message: 'Ce mot est déjà présent dans la liste' }));
        } else {
            setWord('');
            dispatch(setNextChapterAllRequiredWords([...nextChapter.allRequiredWords, word]));
        }
    };

    const removeWord = (word: string) => {
        dispatch(setNextChapterAllRequiredWords(nextChapter.allRequiredWords.filter((w) => w !== word)));
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
                    Liste de mots à inclure
                </Typography>
            </Divider>
            <Box
                sx={{
                    mt: 6,
                    display: 'flex',
                    minWidth: '200px',
                    justifyContent: 'center',
                }}
            >
                <TextField
                    variant='standard'
                    label='Mot à inculre'
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                />
                <IconButton
                    sx={{ ml: 1 }}
                    color='primary'
                    onClick={addWord}
                >
                    <AddCircleIcon sx={{ fontSize: 40 }} />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                {nextChapter.allRequiredWords.map((word: string, i: number) => (
                    <Box
                        key={word}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mt: 2,
                            p: 1,
                            pl: 5,
                            borderRadius: 50,
                            boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;',
                            minWidth: '200px',
                            maxWidth: '400px',
                            backgroundColor: 'white',
                        }}
                    >
                        <Typography>{word}</Typography>
                        <IconButton
                            sx={{ ml: 2 }}
                            onClick={() => removeWord(word)}
                        >
                            <DeleteIcon
                                sx={{ fontSize: 30 }}
                                color='warning'
                            />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
