#This is an example webapp.io configuration for NodeJS
FROM mcr.microsoft.com/playwright:v1.23.0-focal

RUN apt-get update && \
    apt-get -y install apt-transport-https ca-certificates curl software-properties-common && \
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable" && \
    apt-get update && \
    apt  -y install python3 python3-pip awscli && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash && \
    apt install -y nodejs && \
    rm -f /etc/apt/sources.list.d/nodesource.list

# RUN mkdir /ms-playwright && mkdir /tmp/pw && cd /tmp/pw && npm init -y && npm i playwright && DEBIAN_FRONTEND=noninteractive npx playwright install-deps && rm -rf /tmp/pw && chmod -R 777 /ms-playwright

# # install docker compose (easily starts required docker containers)
RUN curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" \
    -o /usr/local/bin/docker-compose

RUN npm install -g yarn pm2
RUN apt -y install unzip

COPY . .



# # RUN mkdir db && curl "$SCHEMA_OBJ_URL" > db/schema.sql

RUN yarn
RUN yarn setup:ee


ENV STANDALONE_APP_URL=https://$GIT_BRANCH.test-app.crusher.dev \
    NEXT_PUBLIC_INTERNAL_BACKEND_URL=https://$GIT_BRANCH.test-app.crusher.dev/server \
    NEXT_PUBLIC_CRUSHER_MODE=enterprise \
    CRUSHER_ENV=production \
    FILE_SERVER_PROXY=https://$GIT_BRANCH.test-app.crusher.dev/output/

RUN NEXT_PUBLIC_INTERNAL_BACKEND_URL="$NEXT_PUBLIC_INTERNAL_BACKEND_URL" NODE_OPTIONS=--max-old-space-size=8096 sh scripts/build/build-all.sh

RUN rm -R packages && mkdir packages && cp -R output/* packages/

# RUN sudo chmod +x /usr/local/bin/docker-compose
RUN cp ./configs/.env.layerci .env

# # Start postgres and redis
# RUN REPEATABLE STANDALONE_APP_URL="$STANDALONE_APP_URL" docker-compose -f docker/ee/docker-compose.yml up --build -d --force-recreate postgres redis

# RUN node setup/dbMigration.js
RUN cp ./ecosystem.config.sample.js ecosystem.config.js


RUN BACKGROUND pm2 start

# # # To wait for server to starts

# # RUN BACKGROUND node scripts/waitTillCrusherLoaded.js --url="https://$GIT_BRANCH.test-app.crusher.dev/server" && curl --location --request POST 'https://backend.crusher.dev/projects/258/tests/actions/run' \
# #     --header 'Content-Type: application/x-www-form-urlencoded' \
# #     --cookie "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjgyIiwidGVhbV9pZCI6MjE5LCJpYXQiOjE2NTI1MDgzODgsImV4cCI6MTY4NDA0NDM4OH0.FVPHPheotR_ib9lqQkaDkrU0TGqgME0ZCdoyWV7Q-7c" \
# #     --data-urlencode "githubRepoName=$GIT_REPO_FULL" \
# #     --data-urlencode "host=https://$GIT_BRANCH.test-app.crusher.dev" \
# #     --data-urlencode "githubCommitId=$GIT_COMMIT"

