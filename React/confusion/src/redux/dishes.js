import * as Action_Types from './ActionTypes';

export const Dishes = (state = {
    isLoading: true,
    errMess: null,
    dishes: []
}, action) => {
    switch(action.type) {
        case Action_Types.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};

        case Action_Types.DISHES_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []};

        case Action_Types.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};