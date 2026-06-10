import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

interface User {
    id: string;
}

const createExpense = async () => {

  await prisma.expenses.deleteMany();

  const users = await prisma.$queryRaw<User[]>`select id from auth.users`
  for(const user of users){
    await prisma.expenses.create({
        data: {
            user_id: user.id,
            resourceName: "AWS EC2 Server Instance",
            category: "Computing",
            billingDate: new Date("2026-09-20").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"}),
            status: "Pending",
            monthlyCost: 45.98
        }
    })
  }
  await prisma.expenses.create({
    data: {
      user_id: "b04370e8-e00f-4baa-960e-5eb0976bd84f",
      resourceName: "AWS EC2 Production",
      category: "Database",
      billingDate: new Date("2025-06-11").toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"}),
      status: "Pending",
      monthlyCost: 23.98,
    },
  });
};

const run = async () => {
  try {
    const expense = await createExpense();
    console.log("Success:", expense);
  } catch (error) {
    console.error("Error:", error);
  } finally{
    await prisma.$disconnect();
  }
};

run()