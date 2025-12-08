# 1. Wybieramy obraz Node.js (LTS)
FROM node:20-alpine

# 2. Ustawiamy katalog roboczy w kontenerze
WORKDIR /usr/src/app

# 3. Instalacja build tools potrzebnych dla LightningCSS i innych paczek natywnych
RUN apk add --no-cache python3 make g++ bash

# 4. Kopiujemy package.json i package-lock.json / yarn.lock
COPY package*.json ./

# 5. Instalacja zależności (z opcją force dla wymuszenia rebuild optionalDependencies)
RUN npm install --force
RUN npm rebuild lightningcss

# 6. Kopiujemy cały projekt
COPY . .

# 7. Generujemy Prisma Client (dla Linux + Windows)
RUN npx prisma generate

# 8. Ustawiamy port, na którym Next.js będzie działał
EXPOSE 3000

# Enable .env file
ENV NODE_ENV=development

# 9. Komenda startowa dla development (hot reload)
CMD ["npm", "run", "dev"]