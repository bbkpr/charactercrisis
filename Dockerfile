FROM node:18

WORKDIR /app
COPY ./ ./
RUN npm ci
RUN npm run build

FROM nginx:stable-alpine as runtime

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /usr/share/nginx/html/

RUN apk add --no-cache bash
COPY ./.env.template /usr/share/nginx/html/.env.template
COPY ./env.sh /usr/share/nginx/html/env.sh
RUN chmod +x /usr/share/nginx/html/env.sh

EXPOSE 80

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
