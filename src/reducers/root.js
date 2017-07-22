import { combineReducers } from 'redux';
import playerReducer from 'reducers/player';

const rootReducer = combineReducers({
  playerReducer,
});

export default rootReducer;
