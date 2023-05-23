// MUI
import { Box, Divider, Typography, useTheme } from '@mui/material';
// App
import { useAppSelector } from '@/apps/front/hooks';
import { checkEvenNumber } from '@/apps/front/utils/number/number.utils';

export const PreviousChapterChoices = () => {
    // Hooks
    const theme = useTheme();

    // Store
    const { previousChapter } = useAppSelector((state) => state.chapterGenerator)
    const {storyData} = useAppSelector(state => state.storyInProgress);
    
    const selectedChoice = checkEvenNumber(storyData.currentChapter[1])

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
            <Box>
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
                        Les choix du précédent chapitre
                    </Typography>
                </Divider>
                <Box sx={{ mt: 4, display: 'flex', width: '100%', gap: 4 }}>
                    {previousChapter.allChoices.length === 0 ? (
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                textAlign='center'
                                sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
                            >
                                Aucun choix pour ce chapitre
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            {previousChapter.allChoices.map((choice, i) => (
                                <Box
                                    key={`choice-${i + 1}`}
                                    sx={{ 
                                        flex: 1,
                                        p: 4,
                                        border: selectedChoice === i ? `2px solid ${theme.palette.primary.main}` : 'none',
                                        borderRadius: '25px'

                                    }}
                                >
                                    <Box
                                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}
                                    >
                                        <Typography
                                            textAlign='center'
                                            sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}
                                        >
                                            {`Le choix ${i + 1}`}
                                        </Typography>
                                    </Box>
                                    <Typography textAlign='center' sx={{
                                        mt: 2,
                                    }}>{choice}</Typography>
                                </Box>
                            ))}
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
