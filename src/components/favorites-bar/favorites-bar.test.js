import React from 'react';
import { render, cleanup } from '../../utils/test/test-utils';

import FavoritesBar from '../favorites-bar/favorites-bar.component';

afterEach(cleanup)

// Testes relacionados ao componente FavoritesBar

// Verifica se a página foi renderizada e o título exibido
test('render favorites bar', () => {
  const { getByTestId  } = render(<FavoritesBar />)
    
  expect(getByTestId('title')).toHaveTextContent('FAVORITOS')
});

// Verifica se os slots de favoritos são renderizados
test('render one favorite', () => {
  const { getByTestId  } = render(<FavoritesBar />)
    
  expect(getByTestId('character')).toHaveTextContent('Pikachu')
});