import * as ActionTypes from './actionTypes';

const initialState = {
	snowReport: {},
	forecast: {},
	updated: null,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.SET_SNOW_REPORT: {
			return {
				...state,
				snowReport: action.payload,
				updated: Date.now(),
			}
		}
		case ActionTypes.SET_FORECAST: {
			return {
				...state,
				forecast: action.payload,
				updated: Date.now(),
			}
		}
		default: {
			return initialState;
		}
	}
}