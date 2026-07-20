import "dotenv/config";
import { Router } from "express"
import {PrismaClient } from "../../generated/prisma/client"
import {PrismaPg} from "@prisma/adapter-pg"


const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({connectionString})
const prisma = new PrismaClient({adapter})

const router = Router();

router.get("/", async(req, res)=>{
    const { category, search } = req.query as { category?: string; search?: string };
    const transactions = await prisma.transaction.findMany({
      where: {
     
      }
    })
    try {
      const expenses = await prisma.expense.findMany({
      
      })
    } catch (error) {
        
    }
})