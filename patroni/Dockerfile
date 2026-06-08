FROM postgres:15

RUN apt-get update -y && \
    apt-get install -y python3 python3-pip python3-psycopg2 curl && \
    pip3 install --break-system-packages patroni[etcd] && \
    mkdir -p /data/patroni /etc/patroni

COPY patroni.yml /etc/patroni/patroni.yml

# Switch to a custom entrypoint that fixes permissions on the volume BEFORE starting patroni
RUN echo '#!/bin/bash\n\
chown -R postgres:postgres /data/patroni /etc/patroni\n\
chmod 0700 /data/patroni\n\
exec gosu postgres patroni /etc/patroni/patroni.yml\n\
' > /entrypoint.sh && chmod +x /entrypoint.sh

# Run as root so we can chown the mounted volume, then gosu drops privileges to postgres
USER root
CMD ["/entrypoint.sh"]
