# Resize Photo Challenge

## Problema

Dado uma lista de imagens em uma estrutura json ​http://54.152.221.29/images.json.
Consumir e gerar de acordo com os tamanhos específicados small (320x240), medium (384x288) and large (640x480).

Escrever um web-service, utilizando banco noSQL (MongoDB) e retornar uma lista de urls e suas imagens.

## Implementação

A aplicação foi desenvolvida em Node.js com MongoDB, utilizand o framework Nest.js para prover uma API, a preferência deste framework é pela quantidade de ferramentas disponibilizadas e a simplicidade que torna um microserviço robutos e sustentável.
O serviço está publicado em dois Docker Container, visando escalabilidade e praticidade.
Há também uma representação da API usando Swagger o que facilita o teste.

## Execução

Executar o script `create.sh` para criação dos containers e execução

ou 

```
docker-compose up -d
``` 

## Desinstalação

Executar o script `remove.sh` para remove os containers.

ou 

```
docker-compose down --rmi local
``` 

## MongoDB

Existem duas formas de carregar a base dados, caso seja executado sem o Docker, o script abaixo npm carrega os dados.

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