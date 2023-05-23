import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type StoryTitleModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    storyTitle: string;
    setStoryTitle: (value: string) => void;
    handleValid: () => void;
};

export const StoryTitleModal = ({ isOpen, handleClose, storyTitle, setStoryTitle, handleValid }: StoryTitleModalProps) => {
    
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <DialogTitle>Titre de l'histoire</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entre un titre pour votre histoire. Vous pourrez le modififier ultérieurement.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='storyTyle'
                        label='Titre de l"histoire'
                        type='text'
                        fullWidth
                        variant='standard'
                        value={storyTitle}
                        onChange={(e) => setStoryTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button 
                    onClick={handleValid}
                    disabled={storyTitle.trim() === ''}
                    >Valider</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
