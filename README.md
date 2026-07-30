# Pokemon RPG

Aplicação em React que reimagina a Pokédex como um mini RPG top-down: o jogador explora um mapa dividido em 4 quadrantes (grama, cemitério, água e caverna), cada um associado a tipos específicos de Pokémon, e captura os Pokémons sorteados via consumo da [PokeAPI](https://pokeapi.co/).

Projeto desenvolvido como teste técnico para processo seletivo.

## 🚀 Tecnologias utilizadas

- **React** (Vite) — biblioteca principal da interface
- **Tailwind CSS** — estilização utilitária
- **Zustand** — gerenciamento de estado global do jogo
- **Axios** — consumo da PokeAPI
- **PokeAPI** — fonte dos dados de Pokémon (sprites, tipos, stats)

## ✨ Funcionalidades

- **Mapa interativo por quadrantes** — 4 áreas clicáveis (grama, cemitério, água, caverna), cada uma associada a um conjunto de tipos de Pokémon que podem aparecer ali
- **Movimentação do personagem** — o Ash se move até o quadrante clicado, com animação de transição
- **Encontro de Pokémon** — busca um Pokémon aleatório (dentre os tipos do quadrante) na PokeAPI, com tempo mínimo de busca simulado e balão de "Procurando..."
- **Modal de encontro** — captura o Pokémon, continua procurando outro no mesmo quadrante, ou volta para o mapa
- **Pokédex (inventário)** — lista os Pokémons capturados com sprite, tipo, HP, altura e peso; permite remover qualquer um
- **Limite de captura** — máximo de 6 Pokémons na Pokédex, com aviso visual ao tentar capturar além do limite
- **Notificações (toast)** — feedback visual ao capturar ou remover um Pokémon
- **Responsividade paisagem/retrato** — o mapa (canvas fixo) é escalado dinamicamente via `transform: scale()` para preencher qualquer tamanho de tela, com uma composição de mapa própria para orientação retrato (celular/tablet)
- **Acessibilidade básica** — atributos `alt` descritivos em todas as imagens e `aria-label`/`role="dialog"` nos modais

## 🗂️ Estrutura do projeto

```
src/
├── components/
│   ├── GameMap/            → mapa principal, escala e detecção de clique
│   ├── EncounterModal/      → modal de encontro (capturar/continuar/voltar)
│   ├── PokedexButton/       → botão flutuante que abre a Pokédex
│   ├── PokedexModal/        → modal com a lista de Pokémons capturados
│   ├── PokedexEmptyState/  → estado vazio da Pokédex
│   ├── PokedexFullWarning/ → aviso de Pokédex cheia
│   ├── PokemonListItem/    → card individual de um Pokémon capturado
│   ├── SearchBalloon/      → balão de "Procurando Pokémon..."
│   └── Toast/              → notificações de sucesso/erro
├── data/
│   ├── mapLayout.js        → configs de mapa (paisagem/retrato), quadrantes e posições
│   └── typeColors.js       → mapa de cores por tipo de Pokémon
├── hooks/
│   ├── useOrientation.js   → detecta orientação da tela (retrato/paisagem)
│   └── useScreenScale.js   → calcula a escala do mapa para a tela atual
├── services/
│   └── pokeApi.js          → chamadas à PokeAPI
└── store/
    └── gameStore.js        → estado global do jogo (Zustand)
```

## ▶️ Como rodar localmente

```bash
# Clonar o repositório
git clone https://github.com/Victorsilvazz/PokemonRPG.git
cd pokedex-app

# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev
```

O projeto abre por padrão em `http://localhost:5173`.

## 🧠 Decisões técnicas

- **Zustand em vez de Context API**: com várias telas/componentes precisando ler e atualizar o mesmo estado (posição do jogador, Pokémon atual, lista de capturados), o Zustand evita o boilerplate de Provider/Context e mantém a lógica de jogo centralizada num único arquivo (`gameStore.js`).
- **Mapa como canvas fixo + `transform: scale()`**: em vez de recalcular posições em porcentagem para cada tamanho de tela, o mapa é tratado como um canvas de tamanho fixo (1920×1080 em paisagem, 1080×1920 em retrato) e escalado como um todo — isso mantém a lógica de posicionamento simples (coordenadas absolutas) e funciona em qualquer resolução.
- **Duas configs de mapa (paisagem/retrato)**: como a arte do mapa não pode simplesmente esticar de paisagem para retrato sem distorcer, o projeto usa duas imagens e dois conjuntos de coordenadas (`QUADRANTS_LANDSCAPE`/`QUADRANTS_PORTRAIT`), escolhidos dinamicamente via `getMapConfig()`.
- **Sistema de "search token"**: buscas de Pokémon são assíncronas (chamada à PokeAPI + tempo mínimo simulado). Um contador (`searchToken`) na store invalida buscas que ficam obsoletas — por exemplo, se o jogador girar a tela no meio de uma busca — evitando que um Pokémon de um quadrante que não existe mais apareça na tela.

## 📄 Licença

Projeto desenvolvido para fins de avaliação em processo seletivo.
