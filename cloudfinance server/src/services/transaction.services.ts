import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

console.log("DIRECT_URL:", process.env.DIRECT_URL);
const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

export const createTransaction = async () => {
  const transaction = await prisma.transactions.create({
    data: {
      user_id: "b04370e8-e00f-4baa-960e-5eb0976bd84f",
      description: "AWS EC2 Instance",
      category: "database",
      amount: 25.99,
      status: "Pending",
      name: "Monthly Server Cost",
    },
  });


  return transaction;
};

const run = async () => {
  try {
    const transaction = await createTransaction();
    console.log("Success", transaction);
  } catch (error) {
    console.error("Error:", error);
  }
};

run();
