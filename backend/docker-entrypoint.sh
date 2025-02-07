#!/bin/sh

# Aguardar o banco de dados estar pronto
echo "Waiting for database to be ready..."
./wait-for-it.sh postgres -- echo "Database is ready!"

# Rodar as migrations
echo "Running database migrations..."
npm run migration:run

# Executar o comando passado para o container
exec "$@"