// MUI
import { Box, TextField, Typography, useTheme } from '@mui/material';
// App
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';
import { setGeneratedChapterTitle } from '@/store';

export const Title = () => {
    // Hooks
    const theme = useTheme();
    const dispatch = useAppDispatch();

    // Store
    const { generatedData } = useAppSelector((state) => state.chapterValidation);

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '900px',
                backgroundColor: theme.palette.grey[400],
                p: 6,
                borderRadius: 6,
                boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;',
                mt: 6,
                pl: 8,
                pr: 8,
            }}
        >
            <Typography
                textAlign={'center'}
                component='h3'
                variant='h3'
                sx={{ mr: 6 }}
            >
                Titre du chapitre:
            </Typography>
            <TextField
                value={generatedData.title}
                variant='standard'
                onChange={(e) => dispatch(setGeneratedChapterTitle(e.target.value))}
                InputProps={{
                    style: {
                        fontSize: '30px',
                        fontWeight: 'bold',
                    },
                }}
                sx={{ mt: 2 }}
                fullWidth
            />
        </Box>
    );
};
