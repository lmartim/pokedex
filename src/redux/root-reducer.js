import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {pokemonsReducer} from './pokemons/pokemons.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['pokemons']
}

const rootReducer = combineReducers({
  pokemons: pokemonsReducer
});

export default persistReducer(persistConfig, rootReducer);