// MUI
import { Box, Divider, Typography, useTheme } from '@mui/material';
// App
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';
import { CustomAutoResize } from '@/apps/front/components';
import { setGeneratedChapterSummary, setModifiedChapterSummary } from '@/store';

export const Summary = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    // Store
    const { modifiedData } = useAppSelector((state) => state.chapterModification);

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
                    Le résumé
                </Typography>
            </Divider>
            <CustomAutoResize
                placeholder={"Le résumé de l'histoire..."}
                minRows={8}
                maxRows={12}
                onChange={(e) => dispatch(setModifiedChapterSummary(e.target.value))}
                value={modifiedData.summary!}
            />
        </Box>
    );
};
