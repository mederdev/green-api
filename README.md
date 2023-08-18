## Test project

Тестовый проект на fastify

## Running the app
```bash
# run sh file to start all services
$ sh start.sh
```

## Описание 
```bash
master - принимает по http запросы и отправляет исполнителью

worker - обработает сообщении в RabbitMQ;

Связь между сервисов - RPC (request–response protocol)
```

## Тестирование
```bash
# После запуска сервера откройте swagger по роуту <localhost>:<port>/docs
```

PS: Не забудьте создать .env файл на основе example
