FROM golang:1.14

ENV NODE_VERSION=12.18.0-1nodesource1
ENV YARN_VERION=^1.22.0
ENV PARCEL_VERSION=^1.12.0

# Expose port
ENV PORT 1971
ENV GOPATH /go
ENV GO111MODULE on
EXPOSE 1971

# Override the base log level (info)
ENV NPM_CONFIG_LOGLEVEL warn

# Update and install system dependencies
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get update && apt-get install -y --no-install-recommends nodejs=$NODE_VERSION \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
RUN npm install -g yarn@"$YARN_VERSION" parcel@"$PARCEL_VERSION"

# Build Caddy
RUN go get github.com/caddyserver/caddy/caddy

# Create workdir
RUN mkdir -p apollo-web
WORKDIR /apollo-web

# Install package dependencies
COPY package.json package.json
RUN yarn install
RUN yarn global add cross-env

# Copy project files into image
COPY . .

RUN yarn run build

ENTRYPOINT ["yarn"]
CMD ["run", "start:prod"]
