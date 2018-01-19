# Resize Photos Challenge

## Problema

Dado uma lista de imagens em uma estrutura json ​http://54.152.221.29/images.json.
Consumir e gerar de acordo com os tamanhos small (320x240), medium (384x288) and large (640x480).

Escrever um web-service, utilizando banco NoSQL (MongoDB) e retornar uma lista de urls e suas imagens.

## Implementação

A aplicação foi desenvolvida em Node.js com MongoDB, utilizando o framework Nest.js para prover uma API, a preferência deste framework é pela quantidade de recursos disponíveis e a simplicidade que torna um microserviço robuto e sustentável.
O serviço está publicado em dois Docker Container, visando escalabilidade e praticidade.
Há também uma representação da API usando Swagger o que facilita o teste.

## Preparar o ambiente

Executar o script `create.sh` para criação dos containers e execução

ou 

```
docker-compose up -d
``` 
## MongoDB

Existem duas formas de carregar a base dados, caso seja executado sem o Docker, o script abaixo `npm` carrega os dados.

```
npm run seed
```

Caso seja executado por Docker existe um container específico para carregamento dos dados.

## Swagger

Url de acesso do swagger (local).

```
http://localhost:3000/api
```

## Urls para teste

- Tamanhos definidos

```
GET 
    http://localhost:3000/photo/image/b777_5/small
    http://localhost:3000/photo/image/b777_5/medium
    http://localhost:3000/photo/image/b777_5/large
```

- Tamanhos personalizados

```
GET
    http://localhost:3000/photo/image/b777_5/800x600
```

- Lista de fotos

```
GET
    http://localhost:3000/photo
```


- Json da foto

```
GET
    http://localhost:3000/photo/b777_5
```

## Remover o ambiente

Executar o script `remove.sh` para remove os containers.

ou 

```
docker-compose down --rmi local
``` 

## Execução da aplicação (Debug)

Para executar a aplicação no modo debug use o npm.

```
npm start
```

## Testes

Para executar os testes utilize o comando abaixo.

```
npm test
`` 
