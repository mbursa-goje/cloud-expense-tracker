import { PrismaClient } from "../../generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL})
const prisma = new PrismaClient({adapter});

export const  createTransaction = async() => {
    const transaction =  await prisma.transactions.create({
        data: {
            user_id: "e3c5d4d1-1234-5678-9012-abcdef123456",
            description: "AWS EC2 Instance",
            category: "Cloud",
            amount: 25.99,
            status: "pending",
            name: "Monthly Server Cost"
        },
    });

    return transaction;
}