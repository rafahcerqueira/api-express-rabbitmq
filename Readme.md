## Projeto de API REST com Node.js, Express e MongoDB

Este é um projeto de API REST desenvolvido em Node.js, utilizando o Express e MongoDB. O projeto tem como objetivo a criação de uma API que consome uma API externa, salva logs em um banco de dados NoSQL e cria carros na API externa.

## Requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- Node.js
- Yarn
- Docker (para executar o banco de dados MongoDB em um contêiner Docker)

## Configuração do Banco de Dados (MongoDB)

Para usar o banco de dados MongoDB em um contêiner Docker, siga os passos abaixo:

1. Execute o seguinte comando para iniciar um contêiner Docker com o MongoDB:

```bash
docker run --name mongo-logs -d -p 27017:27017 mongo:latest
```

2. Para verificar se o contêiner está em execução, utilize o comando:

```bash
docker ps
```

3. Caso o contêiner não esteja em execução, você pode iniciá-lo com o seguinte comando:

```bash
docker start mongo-logs
```

## Configuração do RabbitMQ

Faça as configurações abaixo para executar o Rabbit que também é utilizado através do Docker

1. Execute o seguinte comando para baixar uma imagem do RabbitMQ:

```bash
docker pull rabbitmq
```

2. Agora vá em images no Docker e clique em iniciar no rabbitmq:

![Alt text](/img/image.png)

3. Agora insira essas informações e clique em RUN:

![Alt text](/img/image-1.png)

## Instalação das Dependências

1. Clone este repositório em sua máquina local:

```bash
git clone https://github.com/rafahcerqueira/api-express-rabbitmq
```

2. Acesse a pasta do projeto:

```bash
cd api-express-rabbitmq
```

3. Instale as dependências do projeto usando o Yarn:

```bash
yarn install
```

## Executando o Projeto

Com as dependências instaladas e o arquivo .env configurado, você pode iniciar o servidor da API com o seguinte comando:

```bash
yarn dev
```

## Endpoints da API

- **GET /api/listCars**: Retorna os dados da API externa no endpoint **GET /api/cars**.

- **POST /api/createCar**: Cria um novo registro na API externa no endpoint **POST /api/cars**. O corpo da requisição deve conter os dados do carro a ser criado.

- **GET /api/logs**: Consulta todos os registros salvos na tabela de logs do banco de dados.

**OBS.: Certifique-se que os containers do RabbitMQ e do MongoDB estão rodando!**
