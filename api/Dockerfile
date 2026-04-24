FROM node:20-slim
WORKDIR /usr/src/app

# Dependencias del sistema para oracledb
RUN apt-get update && apt-get install -y libaio1 wget unzip && rm -rf /var/lib/apt/lists/*

# Oracle Instant Client 21.13 (Basic Light)
RUN wget -q --no-check-certificate --no-cookies \
    --header "Cookie: oraclelicense=accept-securebackup-cookie" \
    https://download.oracle.com/otn_software/linux/instantclient/2113000/instantclient-basiclite-linux.x64-21.13.0.0.0dbru.zip \
    -O /tmp/ic.zip && \
    unzip /tmp/ic.zip -d /opt/oracle && rm /tmp/ic.zip && \
    echo /opt/oracle/instantclient_21_13 > /etc/ld.so.conf.d/oracle.conf && ldconfig

ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_21_13

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["node", "index.js"]