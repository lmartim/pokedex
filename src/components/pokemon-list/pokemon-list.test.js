import React from 'react';
import { render, cleanup, fireEvent } from '../../utils/test/test-utils';

import PokemonList from '../pokemon-list/pokemon-list.component';

afterEach(cleanup)

// Testes relacionados ao componente PokemonList

// Faz um setup, para conseguir se obter informações do Input
const setup = () => {
  const utils = render( <PokemonList /> )
  const input = utils.getByPlaceholderText('Pesquisar')
  return {
    input,
    ...utils,
  }
}

// Preenche o input de pesquisa
test('simulate fill input', async () => {
  const { input  } = setup()
  
  fireEvent.change(input, { target: { value: 'Pikachu' } })
  expect(input.value).toBe('Pikachu')
});