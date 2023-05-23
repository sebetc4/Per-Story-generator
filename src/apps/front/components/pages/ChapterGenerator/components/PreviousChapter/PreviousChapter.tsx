// MUI
import { Box, Divider, Typography, useTheme } from '@mui/material';
// App
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';

export const PreviousChapter = () => {
    // Hooks
    const theme = useTheme();

    // Store
    const { previousChapter } = useAppSelector((state) => state.chapterGenerator);

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
                    {previousChapter.title}
                </Typography>
            </Divider>
            <Box
                sx={{
                    mt: 6,
                    ml: 'auto',
                    mr: 'auto',
                    maxWidth: '900px',
                }}
            >
                <Typography>{previousChapter.text}</Typography>
            </Box>
        </Box>
    );
};
