FROM node:10-alpine

WORKDIR /workspace
ADD . .
RUN "./docker_resources/build.sh"

FROM nginx:stable-alpine
COPY --from=0 /workspace/_site/ /usr/share/nginx/html/