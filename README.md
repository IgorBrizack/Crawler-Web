# Crawler web Full Stack

O Crawler Web Full Stack é uma aplicação de raspagem de dados. A ideia por trás desse projeto é a de desenvolver um Web Scraper capaz de coletar dados do Mercado Livre e do Buscapé, armazenar esses dados no banco de dados e caso fosse feito uma nova busca para os itens antes pesquisados essas informações devem ser retornadas através dos dados pré existentes no banco de dados.

## 📋 Execute o projeto em sua máquina

Clone o repositório:

```
git clone git@github.com:IgorBrizack/Crawler-Web.git

cd Crawler-web

docker-compose up -d

cd backend

Crie o ambiente virtual Python e acesse:

- `python3 -m venv .venv && source .venv/bin/activate`

Instale as dependências

- `python3 -m pip install -r dev-requirements.txt`

Crie o arquivo .env no diretório principal do seu Backend,
insira MONGO_URL = "localhost:27017", isso permitirá que acesse o banco de dados.

Caso queira rodar o backend dentro do container, 
acesse o bash do container e execute `python3 main.py`

Caso queira rodar o backend fora do container, pare a execução do 
container e execute através do terminal dentro do diretório do backend o comando `python3 main.py`

Se o Frontend estiver rodando no container basta acessar localhost:3000

Se não siga os passos abaixo:

cd .. 

cd /frontend

- `npm install`

- `npm start`
```
<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Docker
 - Docker-compose

Caso não possua o docker e opte por rodar direto na sua máquina:

 - Deve possuir o MongoDB, Node.JS, Python3 instalando na máquina.

</details>

<details>
<summary><strong> ⚠️ ATENÇÃO!! ⚠️ </strong></summary><br />

 A aplicação pode demorar um pouco de responder caso seja acessado ao endpoit do deploy.

 1º motivo: A raspagem de dados e armazenamento podem demorar devido a distância dos servidores e execução da chamada da API.

 2º motivo: O container que hospeda o backend pode estar em standby, ele irá ativar novamente após a primeira chamada, isso pode levar alguns segundos.

 Acesso a aplicação:
 - https://crawler-web-frontend.vercel.app/

</details>

## 🛠️ Ferramentas Utilizadas & Deploy

- [Node.js](https://nodejs.org/en/)
- [Python3](https://www.python.org/)
- [MongoDB](https://www.mongodb.com/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Docker](https://www.docker.com/)
- [React](https://pt-br.reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Render](https://dashboard.render.com/)
- [Vercel](https://vercel.com/)

:beginner: Desenvolvido por [Igor Brizack](https://www.linkedin.com/in/igor-brizack/) 

