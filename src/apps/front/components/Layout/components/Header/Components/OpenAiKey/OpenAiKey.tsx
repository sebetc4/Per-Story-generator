import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import KeyIcon from '@mui/icons-material/Key';
import { setOpenAiKey, setOpenAiKeyIsSaved } from '@/store';
import { setAlert } from '@/store';
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';
import { isValidOpenAiKey } from '@/apps/front/utils';

export const OpenAiKey = () => {
    /// Hooks
    const dispatch = useAppDispatch();
    // Store
    const { openAiKeyIsSaved } = useAppSelector((state) => state.openAiKey);

    // State
    const [openModal, setOpenModal] = useState(false);
    const [key, setKey] = useState('');

    useEffect(() => {
        const data = localStorage.getItem('key');
        if (typeof data !== 'string') return;
        const openAiKey = JSON.parse(data);
        if (!isValidOpenAiKey(openAiKey)) return;
        setKey(openAiKey);
        dispatch(setOpenAiKey(openAiKey));
        dispatch(setOpenAiKeyIsSaved(true));
    }, [dispatch]);

    const handleSaveKey = () => {
        if (typeof key === 'string' && isValidOpenAiKey(key)) {
            localStorage.setItem('key', JSON.stringify(key));
            dispatch(setOpenAiKeyIsSaved(true));
            dispatch(setOpenAiKey(key));
            dispatch(setAlert({ type: 'success', message: 'Clée enregistrée' }));
            setOpenModal(false)
        } else {
            dispatch(setAlert({ type: 'error', message: "Cette clée n'est pas valide" }));
            dispatch(setOpenAiKey(''));
            setKey('');
        }
    };

    const handleDeleteKey = () => {
        localStorage.removeItem('key');
        dispatch(setOpenAiKeyIsSaved(false));
        dispatch(setOpenAiKey(''));
        setKey('');
        dispatch(setAlert({ type: 'success', message: 'Clée supprimée' }));
        setOpenModal(false)
    };

    return (
        <>
            <Fab
                color={openAiKeyIsSaved ? 'success' : 'primary'}
                aria-label='add'
                onClick={() => setOpenModal(true)}
            >
                <KeyIcon />
            </Fab>
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
            >
                <DialogTitle>Clée OpenAI</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer une clé OpenAI valide avec des crédits afin de générer du contenu.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='openAiKey'
                        label='Clé OpenAI'
                        type='text'
                        fullWidth
                        variant='standard'
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>Annuler</Button>
                    <Button onClick={handleDeleteKey}>Suprimmer</Button>
                    <Button onClick={handleSaveKey}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
