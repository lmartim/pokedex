# Pokédex

Apresenta no animê Pokémon, uma Pokédex é um aparelho, que consegue analisar, obter e armazenar informações sobre diversos Pokémons.

## Instalação

A instalação é bem simples, utilizando o gerenciador [yarn](https://yarnpkg.com/).

```yarn
yarn install
```

## Uso

Para rodar o projeto localmente, basta dar um start.

```yarn
yarn start
```
Após iniciar a aplicação, ela pode ser acessada em [localhost:3000](http://localhost:3000). Caso não esteja abrindo neste caminho, verifique o terminal para conseguir verificar a rota correta.

## Tecnologias
As principais tecnologias utilizadas nesta aplicação foram:

* [ReactJS](https://reactjs.org/)
* [Redux](https://redux.js.org/) (Gerenciamento de estado)
* [Bulma](https://bulma.io/) (Responsivo)
* [styled-components](https://styled-components.com/) (CSS-in-JS)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) (Testes)

## API

Para a consulta de Pokémons, são consumidas diversas APIs da PokéAPI. Para mais informações, acesse a página [neste link](https://pokeapi.co/).

## Testes

Uma breve cobertura de testes foi realizada, bastando rodar um comando, para executá-los:

```yarn
yarn test
```

## Arquivo .env

Normalmente, o arquivo .env não é comitado, tendo as variáveis ajustadas no deploy, de acordo com o ambiente. Para fins de testes, está arquivo está sendo enviado no momento.

## Visual

Os estilos visuais, foram brevemente baseados na [Pokédex apresentada nos jogos Pokémon Sword & Shield](https://darylh.com/wp-content/uploads/2020/02/ezgif.com-optimize-1.gif)

## Utilizando

### Home

Assim que for iniciado, a aplicação irá trazer uma listagem de 16 Pokémons iniciais. Para alterar a listagem, basta usar as setas no botão "Box", na parte inferior da tela, ou utilizar o campo de busca, inserindo o nome, ou número, de um Pokémon no campo de pesquisa e clicando na lupa, para iniciar a buscar. Clicar em algum Pokémon, ou realizar uma busca, irá levar até a tela de detalhes.

### Detalhes

Na tela de detalhes, são exibidos alguns status do Pokémon selecionado, sua imagem e cadeia evolutiva. Na parte inferior, existe um botão, para voltar para a Home, e um campo de pesquisa. Nesta tela, também é possível favoritar o Pokémon, clicando no ícone de coração, próximo à imagem dele.

### Favoritos

Quando um Pokémon é favoritado, ele é exibido na sidebar de Favoritos, sendo possível clicar e ser direcionado até a página de detalhes do mesmo. Para remover um Pokémon dos favoritos, basta clicar novamente no ícone de coração, na tela de Detalhes.
