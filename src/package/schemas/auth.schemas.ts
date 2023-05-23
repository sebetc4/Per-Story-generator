import * as yup from 'yup';
import { SignInReq } from '../types/request.types';

export const signInSchema: yup.ObjectSchema<SignInReq> = yup.object().shape({
    email: yup.string().strict(false).trim().email('L\'adresse email n\'est pas valide').required('L\'adresse email est requise'),
    password: yup.string().required('Le mot de passe est requis').min(6, 'Le mot de passe ne doit pas faire moins de 6 caractère').max(40, 'Le mot de passe ne doit pas faire plus de 40 caractères'),
});

export const signUpSchema: yup.ObjectSchema<SignInReq> = yup.object().shape({
    email: yup.string().strict(false).trim().email('L\'adresse email n\'est pas valide').required('L\'adresse email est requise'),
    password: yup.string().required('Le mot de passe est requis').min(6, 'Le mot de passe ne doit pas faire moins de 6 caractère').max(40, 'Le mot de passe ne doit pas faire plus de 40 caractères'),
});