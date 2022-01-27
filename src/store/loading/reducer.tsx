import {loadingActionTypes} from './actions';

const loadingState = {
    isLoading: false
};

export const loadingReducer = (
    state = loadingState,
    {
        type,
        payload
    }: { type: keyof typeof loadingActionTypes; payload?: boolean }
) => {
    switch (type) {
        case loadingActionTypes.SET_IS_LOADING:
            return {...state, isLoading: Boolean(payload)};
        default:
            return state;
    }
};
