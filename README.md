# Description

Based on educational material source: https://cursos.devtalles.com/courses/nextjs

## Run dev

1. Clone the repository.
2. Create a copy of ```.env.template``` and rename it to ```.env``` and change the environment variables.
3. Install dependencies ```npm install```
4. Start the database ```docker compose up -d```
5. Run Prisma migrations ```npx prisma migrate dev --name MeaningfulName```
6. Execute seed ```npm run seed```
7. Run the project ```npm run d```
8. Clean localStorage of the browser

## Run prod