import * as Action_Types from './ActionTypes';

export const Leaders = (state = {
    isLoading: true,
    errMess: null,
    leaders: []
}, action) => {
    switch(action.type) {
        case Action_Types.ADD_LEADERS:
            return {...state, isLoading: false, errMess: null, leaders: action.payload};

        case Action_Types.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []};

        case Action_Types.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};