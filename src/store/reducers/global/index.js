import produce from 'immer';
import initialState from '../../initial-state';

const globalReducer = (state = initialState.global, action) => produce(state, draft => {
  switch (action.type) {
    case 'SET_MODAL': {
      draft.modal = action.payload.modal;
      break;
    }
    case 'SET_RESOLUTION': {
      draft.resolution = action.payload.resolution;
      break;
    }
    default:
      return state;
  }
});

export default globalReducer;
