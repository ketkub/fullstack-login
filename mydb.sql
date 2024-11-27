-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 26, 2024 at 06:28 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mydb`;

-- Table structure for table `promotions`
CREATE TABLE IF NOT EXISTS `promotions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `users`
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` VARCHAR(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fname` VARCHAR(100) COLLATE utf8mb4_general_ci NOT NULL,
  `lname` VARCHAR(100) COLLATE utf8mb4_general_ci NOT NULL,
  `role` ENUM('admin','user') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `profile_picture` VARCHAR(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert data into `users`
INSERT INTO `users` (`email`, `password`, `fname`, `lname`, `role`, `profile_picture`) VALUES
('ket@gmail.com', '$2b$10$wxwQbkxEFmKVTQd182tygeFaCkjmS7vRR7VKOS5TFeHje0ac9AeYe', 'โกเมศ', 'เวียงสมุทร', 'user', NULL),
('man@gmail.com', '$2b$10$6Yef0xkCk6vkeZUfB8JQH.uDa28Qi9DEmfxd30WDadMG39KyK1EV2', 'กฤษดา', 'สวาศรี', 'admin', NULL),
('64010914607@msu.ac.th', '$2b$10$QRycrQe2DvZt2IrLccV8suqjF3wkiSsKBUV9MjNVghLT1hxdSUo6u', 'kitsada', 'Swasri', 'user', NULL),
('pon123@gmail.com', '$2b$10$y5J9.dITtdTWE7qc.Bs8bugyTZ9q5ygRRzGFmWBNYiQViVHVwwuvu', 'pon', 'pan', 'user', NULL);

COMMIT;
