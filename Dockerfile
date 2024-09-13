# Используем официальный образ Node.js
FROM node:16

# Установим рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json (если он есть)
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем проект
RUN npm run build

# Открываем порты (измените на нужные вам порты)
EXPOSE 3000 3001

# Запускаем приложение
CMD ["npm", "run", "dev"]