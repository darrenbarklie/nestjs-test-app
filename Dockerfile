# build environment
FROM node:16-alpine as react-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 8080
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]


# ----------------------

# FROM node:16-alpine

# # Create app directory
# WORKDIR /app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# # Install package dependencies
# RUN npm install

# # If you are building your code for production
# # RUN npm ci --only=production

# # Bundle app source
# COPY . .

# # Expose PORT
# # EXPOSE 3000

# # Run app
# # CMD ["node", "dist/main"]
# CMD [ "npm", "run", "build" ]
