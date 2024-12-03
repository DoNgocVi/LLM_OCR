FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
# Copy file cấu hình nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy ứng dụng Vue đã build vào thư mục Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]