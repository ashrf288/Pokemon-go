#!/bin/sh

echo "Running database migrations..."
npx prisma migrate dev 

# Check if the migration was successful
if [ $? -eq 0 ]; then
  echo "Migration was successful!"
  
  # Start your application if the migration was successful
  npm run start:dev
  # create admin user
  npm run seed
else
  echo "Migration failed!"
  exit 1
fi
