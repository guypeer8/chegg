import produce from 'immer';
import initialState from '../../initial-state';

const homePageReducer = (state = initialState.homePage, action) => produce(state, draft => {
  switch (action.type) {
    case 'SET_CURSOR__HOME_PAGE': {
        draft.cursor = action.payload.cursor;
        break;
    }
    case 'SET_ACCOUNT__HOME_PAGE': {
        draft.account = action.payload.account;
        break;
    }
    case 'SET_FOLLOWERS__HOME_PAGE': {
        draft.followers = action.payload.followers;
        break;
    }
    default:
      return state;
  }
});

export default homePageReducer;
