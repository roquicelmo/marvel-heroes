# Marvel Heroes

<div>
  <img src="https://img.shields.io/badge/Next.js-13+-black?logo=next.js" height="32" alt="Next.js Version">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" height="32" alt="React Version">
  <img src="https://img.shields.io/badge/License-MIT-green" height="32" alt="License">
</div>


## ✨ Funcionalidades

| Funcionalidade       | Descrição                                                                 |
|----------------------|---------------------------------------------------------------------------|
| 📜 Listagem de Heróis| Conheça todos os heróis Marvel
| 🔍 Busca por Nome    | Filtre heróis por nome                                                   |
| ⭐ Favoritos         | Armazena localmente seus personagens favoritos (Listagem e detalhe)      |
| 📱 Responsivo        | Design adaptável para todos os dispositivos                              |
| 📊 Paginação         | Navegação intuitiva entre páginas de resultados                          |
| 🎨 Detalhes Completos| Visualização detalhada com comics, séries e histórias                    |
| 🔠 Ordenação         | Ordene a visualização em A-Z ou Z-A


## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.


### 📋 Requisitos Obrigatórios
| Componente       | Versão Mínima | Como Verificar          |
|------------------|---------------|-------------------------|
| Node.js          | 18.x          | `node --version`        |
| npm              | 9.x           | `npm --version`         |
| Git              | 2.25+         | `git --version`         |
| Conta Marvel API | -             | [Portal Dev Marvel](https://developer.marvel.com/) |


### 🔧 Instalação

1 - Clone o repositório
```bash
git clone https://github.com/roquicelmo/marvel-heroes.git
```

2 - Instale as dependências
```bash
npm install
```

4 - Crie um arquivo na raiz do projeto chamado `env.local`

5 - Dentro do arquivo crie as seguintes variáveis
```bash
NEXT_PUBLIC_MARVEL_PUBLIC_KEY=sua_chave_publica
NEXT_PUBLIC_MARVEL_PRIVATE_KEY=sua_chave_privada
```

6 - Inicie o servidor
```bash
npm run dev
```


## 🛠 Tecnologias Utilizadas

* <img src="https://skillicons.dev/icons?i=react" height="18" />  React JS
* <img src="https://skillicons.dev/icons?i=nextjs" height="18" />  Next JS
* <img src="https://skillicons.dev/icons?i=tailwind" height="18" />  Tailwind CSS
* <img src="https://skillicons.dev/icons?i=vercel" height="18" />  Vercel
* <img src="https://skillicons.dev/icons?i=github" height="18" /> GitHub
* <img src="https://skillicons.dev/icons?i=git" height="18" /> Git



## 📂 Estrutura do Projeto

```bash
marvel-heroes/
├── app/                        # Roteamento do Next JS
│   ├── favorites/              # Página de Favoritos   
│   ├── heroes/                 # Rota principal (listagem)
│   │   ├── [id]/               # Rota Detalhe do Herói (Rota dinâmica)
│   │   └── page.js
│   └── layout.js               # Arquivo Global de Layout da aplicação
├── components/                 # Componentes reutilizáveis
│   ├── CardHero/
│   ├── Filters/
│   ├── Header/
│   ├── Pagination/
│   └── Accordion/
├── hooks/                      # Custom Hooks
│   └── useFavorites.js
├── services/                   # Lógica da API
│   └── marvelService.js
├── public/                     # Assets estáticos
└── styles/
```


## ✒️ Autor

* **Roquicelmo Reis** - Font End Developer - [LinkedIn](https://www.linkedin.com/in/roquicelmo-reis/)
