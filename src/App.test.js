import React from 'react';
import { render, cleanup } from './utils/test/test-utils';
import App from './App';

afterEach(cleanup)

// Testes relacionados ao componente App

// Renderiza o componente App e faz uma checagem por snapshot
// É necessário a atualizaçãod o snapshot, caso tenha mudança no componente
test('render app', () => {
  const { asFragment } = render(<App />)
    
  expect(asFragment(<App />)).toMatchSnapshot()
});
