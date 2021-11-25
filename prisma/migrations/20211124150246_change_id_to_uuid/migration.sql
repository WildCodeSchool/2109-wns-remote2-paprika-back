/*
  Warnings:

  - The primary key for the `comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `document` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `project_role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `role_on_project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_TaskToUser` DROP FOREIGN KEY `_tasktouser_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_TaskToUser` DROP FOREIGN KEY `_tasktouser_ibfk_2`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_task_id_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `document_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `role_on_project` DROP FOREIGN KEY `role_on_project_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `role_on_project` DROP FOREIGN KEY `role_on_project_project_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `role_on_project` DROP FOREIGN KEY `role_on_project_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `task_project_id_fkey`;

-- AlterTable
ALTER TABLE `_TaskToUser` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `comment` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `user_id` VARCHAR(191) NOT NULL,
    MODIFY `task_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `document` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `project_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `project` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `project_role` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `role_on_project` DROP PRIMARY KEY,
    MODIFY `user_id` VARCHAR(191) NOT NULL,
    MODIFY `project_id` VARCHAR(191) NOT NULL,
    MODIFY `project_role_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`, `project_id`);

-- AlterTable
ALTER TABLE `task` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `project_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `document` ADD CONSTRAINT `document_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_on_project` ADD CONSTRAINT `role_on_project_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_on_project` ADD CONSTRAINT `role_on_project_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_on_project` ADD CONSTRAINT `role_on_project_project_role_id_fkey` FOREIGN KEY (`project_role_id`) REFERENCES `project_role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TaskToUser` ADD FOREIGN KEY (`A`) REFERENCES `task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TaskToUser` ADD FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
