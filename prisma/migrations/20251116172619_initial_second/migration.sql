/*
  Warnings:

  - Added the required column `onBoarded` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "onBoarded" BOOLEAN NOT NULL;
