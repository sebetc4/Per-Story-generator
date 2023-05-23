import { BaseTextFieldProps, Box, Grid, TextField, TextFieldProps, Typography, useTheme } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

type CustomTextField = TextFieldProps & {
    name: string;
    register: UseFormRegisterReturn;
    errorMessage: string | null;
};

export const CustomTextField = ({ name, register, errorMessage, ...props }: CustomTextField) => {
    const theme = useTheme();
    return (
        <Box sx={{ width: '100%' }}>
            <TextField
                required
                id={`${name}-input`}
                variant='outlined'
                fullWidth
                {...register}
                error={!!errorMessage}
                helperText={errorMessage}
                {...props}
                color={'primary'}
            />
        </Box>
    );
};
