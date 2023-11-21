import { prisma } from "@/lib/prisma";
import { type Task } from "@/types"

const API_URL = 'http://localhost:3000/api/restapi';

export const fetchTasks = async (randomType: string, taskCount: string): Promise<Task[]> => {
    const response = await fetch(`${API_URL}?type=${randomType}&count=${taskCount}`, { method: "GET" });

    if (!response.ok) {
        throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
    }

    const result = await response.json() as { success: boolean; data: Task[] };
    console.log(`Tasks fetched successfully: `, result.data);
    return result.data;
};



// const prismaa = new PrismaClient();

// export const fetchTasksfromP = async (): Promise<Task[]> => {
//   try {
//     const tasksFromPrisma = await prisma.task.findMany();
//     console.log(tasksFromPrisma);
//     return tasksFromPrisma;
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     throw error; // Rethrow the error to handle it at the calling site
//   } finally {
//     await prisma.$disconnect(); // Disconnect from the Prisma client to avoid resource leaks
//   }
// };


export default {
    fetchTasks
}