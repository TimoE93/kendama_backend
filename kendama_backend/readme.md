Create an network for the nginx proxy and the application
```bash
docker network create nginx-proxy-network
```

Start nginx reverse proxy
```bash
docker run --restart always --detach --network nginx-proxy-network --name nginx-proxy --publish 80:80 --publish 443:443  --volume /etc/nginx/certs --volume /etc/nginx/vhost.d  --volume /usr/share/nginx/html --volume /var/run/docker.sock:/tmp/docker.sock:ro --volume /home/ubuntu/nginx_config_files/redirect.conf:/etc/nginx/conf.d/redirect.conf jwilder/nginx-proxy
```

Start the letsencrypt service
```bash
docker run --restart always --detach --network nginx-proxy-network --name nginx-proxy-letsencrypt --volumes-from nginx-proxy --volume /var/run/docker.sock:/var/run/docker.sock:ro --env "DEFAULT_EMAIL=example@test.com" jrcs/letsencrypt-nginx-proxy-companion
```

For further information about the reverse proxy, have a look here:
https://github.com/nginx-proxy/docker-letsencrypt-nginx-proxy-companion

Run the docker-compose file
```
services:
  rest_server:
    image: "kirb/kbe:latest"
    restart: always
    depends_on:
      - mongo
    command: node index.js
    environment:
      DATABASEUSER: ${DATABASEUSER}
      DATABASEPW: ${DATABASEPW}
      VIRTUAL_HOST: kendama-combo.com
      VIRTUAL_PORT: 3000
      MONGOURL: "@mongo:27017"
      LETSENCRYPT_HOST: kendama-combo.com
      LETSENCRYPT_EMAIL: example@mail.de
    networks:
      - nginx-proxy-network
  mongo:
    image: mongo
    restart: always
    ports:
      - 27000:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${DATABASEUSER}
      MONGO_INITDB_ROOT_PASSWORD: ${DATABASEPW}
    volumes:
      - kendama_test:/data/db
    networks:
      - nginx-proxy-network
volumes:
  kendama_test:
networks:
  nginx-proxy-network:
    external: true
```