# Move the file in the project directory before build the image


FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

RUN cd ../../

# Instal app dependencies
COPY package.json ./

RUN npm install

# add source code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]