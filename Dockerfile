# Stage1: client Build
FROM node:lts-slim AS client-build
WORKDIR /usr/src
COPY client/ ./client/
RUN cd client && yarn install && yarn build

# Stage2: API Build
FROM node:lts-slim AS server-build
WORKDIR /usr/src
COPY server/ ./server/
RUN cd server && yarn install && yarn build
RUN ls

# Stage3: Packagign the app
FROM node:lts-slim
WORKDIR /root/
COPY --from=client-build /usr/src/client/build ./client/build
COPY --from=server-build /usr/src/server/dist .
RUN ls

EXPOSE 4000

CMD ["node", "api.bundle.js"]