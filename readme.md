# Contador Terco BackEnd

O projeto esta utilizando Express.js

# Preparativos 

Para rodar localmente seguir os passos abaixo:
1. Instale o docker
2. abra o prompt de comando e digite: docker pull mongo 
3. apos baixar a imagem via prompt de comando digite o comando: docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=terco -e MONGO_INITDB_ROOT_PASSWORD=e296cd9f mongo
4. criar um arquivo .env
5. adicionar linha no arquivo: MONGODB_URI="mongodb://terco:e296cd9f@localhost:27017/admin"

# Rodando local

Apos baixar o projeto va na pasta inicial do projeto e no prompt de comando digite npm run dev, ao termino do build a aplicação estara disponivel no [endereço](http://localhost:8080/)

# Apos

Agora siga os passos para baixar o [front-end](https://github.com/AlanSiqma/contador-terco) da aplicação .
