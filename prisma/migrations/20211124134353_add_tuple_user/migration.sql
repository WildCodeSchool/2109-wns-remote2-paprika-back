-- AlterTable
ALTER TABLE `project` MODIFY `timing` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `task` MODIFY `timing` VARCHAR(191) NULL,
    MODIFY `status` ENUM('OPEN', 'INPROGRESS', 'DONE') NULL DEFAULT 'OPEN',
    MODIFY `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NULL DEFAULT 'LOW';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `work` VARCHAR(191) NULL;
