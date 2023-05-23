import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


type ConfirmDeleteModalProps = {
    open: boolean
    handleClose: () => void
    confirmDelete : () => void
}

export const ConfirmDeleteModal = ({open, handleClose, confirmDelete}: ConfirmDeleteModalProps) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>{"Suppresion de l'histoire"}</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    Êtes-vous sûr de vouloir supprimer cette histoire et les chapitres qui lui sont associés?{' '}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button
                    onClick={confirmDelete}
                    autoFocus
                >
                    Supprimer
                </Button>
            </DialogActions>
        </Dialog>
    );
};
