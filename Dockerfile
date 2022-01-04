FROM node:12-buster
RUN yarn global add gatsby-cli
WORKDIR /app
ADD . ./
RUN yarn
RUN gatsby build

COPY --from=build /app/public /pub