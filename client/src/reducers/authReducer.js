import { FETCH_USER } from '../actions/types';

/*
Estados de la autenticacion
null: no sabemos si el usuario está logueado o no. Por ejemplo si tarda mucho el request al server, el estado va a ser null hasta que vuelva
false: Sabemos que el usuario no está logueado
User: El usuario está logueado
Definimos el estado default como null
*/
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}