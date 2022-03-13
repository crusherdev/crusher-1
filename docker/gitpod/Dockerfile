FROM gitpod/workspace-full-vnc:latest
ENV TRIGGER_REBUILD=5

# Install custom tools, redis, runtime, etc.
RUN sudo apt-get update \
    # window manager
    && sudo apt-get install -y jwm \
    # electron
    && sudo apt-get install -y libgtk-3-0 libnss3 libasound2 libgbm1 \
    # native-keymap
    && sudo apt-get install -y libx11-dev libxkbfile-dev \
    # keytar
    && sudo apt-get install -y libsecret-1-dev
USER root

# Install postgres
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql

USER gitpod

# Install Redis.
RUN sudo apt-get update  && sudo apt-get install -y  redis-server redis-tools  && sudo rm -rf /var/lib/apt/lists/*


RUN npm install -g pm2

RUN echo "bash /etc/mysql/mysql-bashrc-launch.sh" >> ~/.bashrc
