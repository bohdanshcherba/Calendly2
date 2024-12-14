import { combineReducers } from '@reduxjs/toolkit';
import { reducer as AppReducer } from './app/reducer';

export const rootReducer = combineReducers({
  AppReducer,
});
