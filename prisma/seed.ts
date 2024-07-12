import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({ data: {} });
  const user2 = await prisma.user.create({ data: {} });

  console.log('Created users:', user1, user2);

  const payment1 = await prisma.payment.create({
    data: {
      externalId: randomUUID(),
      userId: user1.id,
      amount: 100.5,
      status: 'success',
      date: new Date(),
    },
  });

  const payment2 = await prisma.payment.create({
    data: {
      externalId: randomUUID(),
      userId: user1.id,
      amount: 75.25,
      status: 'failed',
      date: new Date(),
    },
  });

  console.log('Created payments:', payment1, payment2);

  const payment3 = await prisma.payment.create({
    data: {
      externalId: randomUUID(),
      userId: user2.id,
      amount: 200.0,
      status: 'success',
      date: new Date(),
    },
  });

  console.log('Created payment:', payment3);

  const balance1 = await prisma.balance.create({
    data: {
      userId: user1.id,
      amount: 100.5,
    },
  });

  const balance2 = await prisma.balance.create({
    data: {
      userId: user2.id,
      amount: 200.0,
    },
  });

  console.log('Created balances:', balance1, balance2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
