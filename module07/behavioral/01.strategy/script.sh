docker run \
  --name postgres \
  -e POSTGRES_USER=csevero \
  -e POSTGRES_PASSWORD="senha1234" \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker logs postgres
docker exec -it postgres psql --username csevero --dbname heroes

CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);


#mongo

docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=csevero \
  -e MONGO_INITDB_ROOT_PASSWORD=severo1234 \
  -p 27017:27017 \
  -d \
    mongo:4

docker logs mongodb