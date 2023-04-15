-- CreateTable
CREATE TABLE `ShortLink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `url` VARCHAR(4000) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ShortLink_slug_key`(`slug`),
    INDEX `ShortLink_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
