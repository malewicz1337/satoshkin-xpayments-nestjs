# XPayments - NestJS

## Setup

1. Clone the repository:
``` bash
git clone https://github.com/malewicz1337/xpayments-nestjs
cd xpayments-nestjs
```

2. Configure .env file:
```
cp .env.example .env
```

2.1. Modify variables if needed

3. Install dependencies:
``` bash
pnpm install
```

4. Start the Docker containers:
``` bash
docker compose up --build
```

5. Run Prisma migrations:
``` bash
npx prisma migrate dev --name init
```

6. Seed the database:
``` bash
pnpm run seed
```

7. Start the development server:
``` bash
pnpm run start:dev
```
The application should now be running at `http://localhost:3000` (or whatever port you've configured).

## Database

This project uses PostgreSQL. The connection details are in the `docker-compose.yml` file.


## ORM

We use Prisma as our ORM. The Prisma schema is located in `prisma/schema.prisma`.
