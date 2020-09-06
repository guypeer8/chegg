export const setCursor = cursor => 
  ({ type: 'SET_CURSOR__HOME_PAGE', payload: { cursor } });

export const setAccount = account => 
  ({ type: 'SET_ACCOUNT__HOME_PAGE', payload: { account } });

export const setFollowers = followers => 
  ({ type: 'SET_FOLLOWERS__HOME_PAGE', payload: { followers } });