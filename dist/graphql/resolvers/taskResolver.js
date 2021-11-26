"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = {
    Query: {
        getAllTasks: () => __awaiter(void 0, void 0, void 0, function* () {
            const tasks = yield prisma.task.findMany();
            return tasks;
        }),
        getTask: (_, { taskId }) => __awaiter(void 0, void 0, void 0, function* () {
            const task = yield prisma.task.findUnique({
                where: {
                    id: taskId
                }
            });
            return task;
        }),
    },
    Mutation: {
        createTask: (_, { taskInput }) => __awaiter(void 0, void 0, void 0, function* () {
            const task = yield prisma.task.create({
                data: {
                    name: taskInput.name,
                    description: taskInput.description,
                    projectId: taskInput.projectId,
                }
            });
            return task;
        }),
        deleteTask: (_, { taskId }) => __awaiter(void 0, void 0, void 0, function* () {
            const deletedTask = yield prisma.task.delete({
                where: {
                    id: taskId
                }
            });
            return deletedTask;
        }),
        updateTask: (_, { updateTaskInput }) => __awaiter(void 0, void 0, void 0, function* () {
            const updatedTask = yield prisma.task.update({
                where: {
                    id: updateTaskInput.taskId
                },
                data: {
                    name: updateTaskInput.name || undefined,
                    description: updateTaskInput.description || undefined,
                    status: updateTaskInput.status,
                    priority: updateTaskInput.priority,
                    timing: updateTaskInput.timing
                }
            });
            return updatedTask;
        })
    }
};
//# sourceMappingURL=taskResolver.js.map