import React from "react"
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { PersistGate } from 'redux-persist/integration/react';
import configureMockStore from "redux-mock-store";

import { persistor } from '../../redux/store';

// Componente para ajustes na biblioteca de teste

// Setado um estado mock para o Redux, permitindo
// melhores testes relacionados aos estados
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  pokemons: {
    status: 'success',
    pokemons: [
      {
        name: 'Pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/'
      }
    ],
    selected: {
      name: 'Pikachu',
      sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
      },
      stats: [
        {
          base_stat: 35,
          stat: {
            name: 'HP'
          }
        }
      ],
      types: [
        {
          type: {
            name: 'Electric'
          }
        }
      ],
      chain: {
        species: {
          name: 'Pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon/25/'
        }
      },
      height: 4
    },
    favorites: [
      {
        name: 'Pikachu',
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
        },
        stats: [{
          base_stat: 35,
          stat: {
            name: 'HP'
          }
        }],
        types: [{
          type: {
            name: 'Electric'
          }
        }],
        height: 4
      }
    ]
  }
});

// Adicionado os componentes Provider, BrowserRouter e PersistGate no wrapper de testes,
// assim tornando desnecessário englobar eles em cada um dos testes
const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          {children}
        </PersistGate>
      </BrowserRouter>
    </Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }