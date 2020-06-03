FROM golang:1.13

# Expose port
ENV PORT 1971
ENV GOPATH /go
ENV GO111MODULE on
EXPOSE 1971

# Override the base log level (info)
ENV NPM_CONFIG_LOGLEVEL warn

# Update and install system dependencies
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs
RUN npm install -g yarn parcel

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
