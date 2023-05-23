// MUI
import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// App
import { StoryTitle } from '@/types';
import { useState } from 'react';
import { ConfirmDeleteModal } from '../ConfirmDeleteModal/ConfirmDeleteModal';

type StoryChoiceProps = {
    selectedStory: string;
    allStoryTitles: StoryTitle[];
    handleChangeSelectedStory: (event: SelectChangeEvent) => void;
    handleDeleteStory: (index: string) => void;
};

export const StoryChoice = ({
    selectedStory,
    allStoryTitles,
    handleChangeSelectedStory,
    handleDeleteStory,
}: StoryChoiceProps) => {
    // State
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);

    const openDeleteStoryConfirmModal = () => setOpenConfirmDeleteModal(true);
    const closeDeleteStoryConfirmModal = () => setOpenConfirmDeleteModal(false);
    const confirmDeleStory = async () => {
        handleDeleteStory(selectedStory);
        closeDeleteStoryConfirmModal()
    }

    return (
        <>
            <Box component='section'>
                <Typography
                    variant='h2'
                    component='h2'
                >
                    Choix de l'histoire
                </Typography>
                <Box sx={{ mt: 6, display: 'flex', gap: 4 }}>
                    <Box sx={{ width: '400px' }}>
                        <FormControl fullWidth>
                            <InputLabel id='story-select-labell'>Histoire</InputLabel>
                            <Select
                                labelId='story-select-label'
                                id='story-select'
                                value={selectedStory}
                                label='Histoire'
                                onChange={handleChangeSelectedStory}
                            >
                                {allStoryTitles.map((storyTitle) => (
                                    <MenuItem
                                        key={storyTitle._id}
                                        value={storyTitle._id}
                                    >
                                        {storyTitle.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <IconButton
                        aria-label={"Supprimer l'histoire"}
                        color='primary'
                        size='large'
                        onClick={openDeleteStoryConfirmModal}
                    >
                        <DeleteIcon fontSize='inherit' />
                    </IconButton>
                </Box>
            </Box>
            <ConfirmDeleteModal
                open={openConfirmDeleteModal}
                handleClose={closeDeleteStoryConfirmModal}
                confirmDelete={confirmDeleStory}
            />
        </>
    );
};
