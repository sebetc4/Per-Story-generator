// MUI
import { Box, Divider, Typography, useTheme } from '@mui/material';
// App
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';
import { CustomAutoResize } from '@/apps/front/components';
import { setGeneratedChapterDescriprion } from '@/store';

export const Description = () => {
    // Hooks
    const theme = useTheme();
    const dispatch = useAppDispatch();

    // Hooks
    const { generatedData } = useAppSelector((state) => state.chapterValidation);

    return (
        <Box
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
                    Prompt de l'image
                </Typography>
            </Divider>
            <CustomAutoResize
                placeholder={"Le prompt de l'image..."}
                minRows={2}
                maxRows={4}
                onChange={(e) => dispatch(setGeneratedChapterDescriprion(e.target.value))}
                value={generatedData.description}
            />
        </Box>
    );
};
