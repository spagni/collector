import axios from 'axios';
import { FETCH_USER } from './types';

/*
Esto es un actionCreator. Normalmente deberia devolver un action (JS Object), pero redux Thunk nos permite acceder directamente al dispatcher
El parametro dispatch es una function asignada por Thunk una vez que se applica el middleware en src/index.js
*/
export const fetchUser = () =>
    dispatch => {
        axios
            .get('/api/currentUser')
                .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
    };