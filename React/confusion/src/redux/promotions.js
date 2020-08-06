import * as Action_Types from './ActionTypes';

export const Promotions = (state = {
    isLoading: true,
    errMess: null,
    promotions: []
}, action) => {
    switch(action.type) {
        case Action_Types.ADD_PROMOS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case Action_Types.PROMOS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []};

        case Action_Types.PROMOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};