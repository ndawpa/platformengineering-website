FROM ubuntu:24.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
    acl bash ca-certificates coreutils curl dnsutils file findutils gawk git grep iproute2 iputils-ping less procps python3 sed tar vim-tiny \
    && rm -rf /var/lib/apt/lists/*
CMD ["sleep", "infinity"]
