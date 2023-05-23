import React, { SyntheticEvent } from 'react';

import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import { closeAlert, removeAlert } from '@/store';
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';


function SlideTransition(props: SlideProps) {
    // Hooks
    const dispatch = useAppDispatch();

    return (
        <Slide
            {...props}
            direction='up'
            onExited={() => dispatch(removeAlert())}
        />
    );
}

export const AlertComponent = () => {
    // Hooks
    const dispatch = useAppDispatch();

    // Store
    const { open, type, message } = useAppSelector(state => state.alert);

    const handleClose = (e?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeAlert());
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
        >
            <Alert
                onClose={handleClose}
                severity={type || undefined}
                sx={{ width: '100%' }}
                variant='filled'
                elevation={6}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
