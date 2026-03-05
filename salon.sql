-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2026 at 10:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `salon`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `created_at`, `updated_at`) VALUES
(1, 'Šišanje i feniranje', '2026-01-22 11:18:54', '2026-01-22 11:18:54'),
(2, 'Farbanje kose', '2026-01-22 11:18:54', '2026-01-22 11:18:54'),
(3, 'Tehnike farbanja', '2026-01-22 11:18:54', '2026-01-22 11:18:54'),
(4, 'Nega kose', '2026-01-22 11:18:54', '2026-01-22 11:18:54'),
(5, 'Svečane frizure', '2026-01-22 11:18:54', '2026-01-22 11:18:54'),
(6, 'Muški program', '2026-01-22 11:18:54', '2026-01-22 11:18:54'),
(7, 'Brada i brijanje', '2026-01-22 11:18:54', '2026-01-22 11:18:54'),
(8, 'Muški paketi', '2026-01-22 11:18:54', '2026-01-22 11:18:54');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_01_12_160828_create_services_table', 1),
(5, '2026_01_12_225221_add_fields_to_users_table', 1),
(6, '2026_01_12_225914_create_categories_table', 1),
(7, '2026_01_12_230645_add_category_id_to_services_table', 1),
(8, '2026_01_12_232121_create_schedules_table', 1),
(9, '2026_01_12_232357_create_reservations_table', 1),
(10, '2026_01_13_202404_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '26fb93c5a958edee1c2c44d68a2a9d59bac35026b61586118ac1182a6ec9a430', '[\"*\"]', NULL, NULL, '2026-01-22 11:25:08', '2026-01-22 11:25:08'),
(2, 'App\\Models\\User', 1, 'auth_token', '981e70bcfef5f5aafa0611e175e112d4e1d9e7568aa254cf49bfc1ecc9b825a1', '[\"*\"]', NULL, NULL, '2026-01-22 11:36:14', '2026-01-22 11:36:14'),
(3, 'App\\Models\\User', 1, 'auth_token', '148e2e1e3f1c5653b7f52743fb0a371ce33ad90f86de029303bdbe7ad2dd5b4c', '[\"*\"]', NULL, NULL, '2026-01-22 11:39:12', '2026-01-22 11:39:12'),
(5, 'App\\Models\\User', 1, 'auth_token', 'caa26056e6b17ddf32c2c1369d16f7de532974606e5c4a0e5e0315957ff2b510', '[\"*\"]', '2026-01-22 12:35:54', NULL, '2026-01-22 12:33:32', '2026-01-22 12:35:54'),
(8, 'App\\Models\\User', 1, 'auth_token', 'd65bde4b854db97bb686d2df77c9fd7edd9e82334c9363178b1c43500001f9ba', '[\"*\"]', '2026-01-22 20:02:15', NULL, '2026-01-22 19:59:01', '2026-01-22 20:02:15'),
(11, 'App\\Models\\User', 4, 'auth_token', '91b0403ce29a5243adcc91ab81235b06a317d15868ed4e8ca69ddffb16a1fdbc', '[\"*\"]', NULL, NULL, '2026-01-23 12:25:30', '2026-01-23 12:25:30'),
(12, 'App\\Models\\User', 4, 'auth_token', '945132e0668cebff66a8c0c1c6735eeb16c76441f05635efc29ba371a855d41a', '[\"*\"]', NULL, NULL, '2026-01-23 12:25:56', '2026-01-23 12:25:56'),
(13, 'App\\Models\\User', 4, 'auth_token', '19805a01adfe704f7a82b74edb84a6c1bff6bb7fb6f70104e8e4454fed27760f', '[\"*\"]', NULL, NULL, '2026-01-23 12:32:17', '2026-01-23 12:32:17'),
(14, 'App\\Models\\User', 4, 'auth_token', '43131a6326df951c1fcc32571fc7c34de4ceddb1c105d012a005605b5b9c9f84', '[\"*\"]', '2026-01-24 12:18:33', NULL, '2026-01-24 10:58:55', '2026-01-24 12:18:33'),
(16, 'App\\Models\\User', 7, 'auth_token', '0d275657f82cb85a21a45ba7c641ec3eb0780777ea1ad134a900cec6522ad5ad', '[\"*\"]', NULL, NULL, '2026-01-24 12:25:15', '2026-01-24 12:25:15'),
(17, 'App\\Models\\User', 7, 'auth_token', 'ffdcf0c7ea3d916a3d46e96da58f0198c86ab57217c0453abd442227e80f1346', '[\"*\"]', '2026-01-24 12:31:53', NULL, '2026-01-24 12:25:49', '2026-01-24 12:31:53'),
(19, 'App\\Models\\User', 6, 'auth_token', '14a8ca88caedbf24c5215633965e1192b3dc8487057a7efb0fbb1e863f9a8e6e', '[\"*\"]', '2026-01-24 18:52:03', NULL, '2026-01-24 18:51:46', '2026-01-24 18:52:03'),
(20, 'App\\Models\\User', 6, 'auth_token', 'a1228ae063303d1b9b5bd27a31105101ae8a81c5bbf3daaf5b8d1d04b88ec434', '[\"*\"]', '2026-01-24 18:54:53', NULL, '2026-01-24 18:54:51', '2026-01-24 18:54:53'),
(21, 'App\\Models\\User', 6, 'auth_token', 'c3fcd813edd9fa533d7ec23195019165f2ea43247d55184228d5992cefaa264a', '[\"*\"]', '2026-01-24 19:01:58', NULL, '2026-01-24 19:01:56', '2026-01-24 19:01:58'),
(22, 'App\\Models\\User', 6, 'auth_token', '2058cc64c4eeecc16cc95d9b5f749efc99805c2251c81af64be9fb24e135d791', '[\"*\"]', '2026-01-24 19:30:45', NULL, '2026-01-24 19:04:17', '2026-01-24 19:30:45'),
(24, 'App\\Models\\User', 4, 'auth_token', 'da8b884ffb927c648f248560bd65236fbb7ba65dbea9ccadf21f45efcf6bf74d', '[\"*\"]', '2026-01-24 19:43:34', NULL, '2026-01-24 19:41:51', '2026-01-24 19:43:34'),
(25, 'App\\Models\\User', 6, 'auth_token', '0c277aab743b3d4af80c2cbfa0d29804ed393331bca03478b7b2d7595ae5cc40', '[\"*\"]', '2026-01-24 19:44:10', NULL, '2026-01-24 19:44:08', '2026-01-24 19:44:10'),
(26, 'App\\Models\\User', 9, 'auth_token', 'ae4c141349b5be0eeeb7fbc80e63d7acb7a0fba304af8ed5b3162d3af71660cd', '[\"*\"]', NULL, NULL, '2026-01-24 19:47:21', '2026-01-24 19:47:21'),
(27, 'App\\Models\\User', 9, 'auth_token', '6c53689d553f0db54ba3aaac412313a7ff3ce17da5bf7d0717f0bd46a054e8c9', '[\"*\"]', '2026-01-24 19:49:40', NULL, '2026-01-24 19:47:42', '2026-01-24 19:49:40'),
(28, 'App\\Models\\User', 6, 'auth_token', '0b9d0ff18f9f9553bc2e07a80809eabd1dfd714625ee40925fa9067a6b398d5d', '[\"*\"]', '2026-01-24 20:05:48', NULL, '2026-01-24 19:56:04', '2026-01-24 20:05:48'),
(29, 'App\\Models\\User', 4, 'auth_token', 'a90f2a18b359ff8e3d9a98f7f85743d62f3c239b99d07a4aa0c22faa6c505e45', '[\"*\"]', '2026-01-24 20:14:07', NULL, '2026-01-24 20:08:31', '2026-01-24 20:14:07'),
(31, 'App\\Models\\User', 4, 'auth_token', '7f84ab7a2b2473f3c76765f6b0f5455fc597692219a9e095cbaa94ce269c489a', '[\"*\"]', '2026-01-27 10:55:21', NULL, '2026-01-27 10:40:39', '2026-01-27 10:55:21'),
(32, 'App\\Models\\User', 4, 'auth_token', 'd348185540a59bfc7a0f394e806c65d5580df5b03940229a5841572bab8f92c4', '[\"*\"]', '2026-01-27 11:11:35', NULL, '2026-01-27 11:00:14', '2026-01-27 11:11:35'),
(34, 'App\\Models\\User', 6, 'auth_token', 'a17686b452858baf4da9b94eccd39256b2e6856d4f133053752bb64435d97e23', '[\"*\"]', '2026-01-27 15:48:21', NULL, '2026-01-27 15:47:55', '2026-01-27 15:48:21'),
(35, 'App\\Models\\User', 4, 'auth_token', 'c48bbf23c99d9211fd24c1c34bf966e2a16f49288ab35d5a547f923e525d2a2c', '[\"*\"]', '2026-01-31 18:37:09', NULL, '2026-01-31 18:33:33', '2026-01-31 18:37:09'),
(36, 'App\\Models\\User', 6, 'auth_token', '476885272d349a9b00170e051a1dfe4b35c0f3b4bc782cf11290cb5ada640b85', '[\"*\"]', '2026-01-31 18:48:27', NULL, '2026-01-31 18:48:25', '2026-01-31 18:48:27'),
(37, 'App\\Models\\User', 1, 'auth_token', 'eea6110e89dd42908c1fa62cee1d1031eb0fc8e6726511e25acb5a8f785f6e17', '[\"*\"]', '2026-02-03 18:19:54', NULL, '2026-01-31 18:50:54', '2026-02-03 18:19:54'),
(38, 'App\\Models\\User', 6, 'auth_token', '00b9bcd7d1058e02e939de18c0fefa2396881bf1be4c7da0df2feb9fa376d8a2', '[\"*\"]', '2026-02-03 18:21:01', NULL, '2026-02-03 18:20:38', '2026-02-03 18:21:01'),
(40, 'App\\Models\\User', 7, 'auth_token', '74c1d64b296a52783d25a68de03677bde15d78ca5fa5eb44fb3f6f867d72cc3f', '[\"*\"]', '2026-02-03 23:20:37', NULL, '2026-02-03 23:20:18', '2026-02-03 23:20:37'),
(41, 'App\\Models\\User', 1, 'auth_token', '730677d30fb3e37381d44c73d23cdfbb7aa2b9ff4d2b0df3c5038405bff81499', '[\"*\"]', '2026-02-06 15:35:38', NULL, '2026-02-03 23:29:46', '2026-02-06 15:35:38'),
(43, 'App\\Models\\User', 4, 'auth_token', 'd8c139ba7d84ad1572c810a6d434f836357a75b5726e7bda157bae105d411e84', '[\"*\"]', '2026-02-06 16:50:09', NULL, '2026-02-06 16:17:32', '2026-02-06 16:50:09'),
(45, 'App\\Models\\User', 6, 'auth_token', 'c4935e87c7238fe900a2d5f9c9cff1a2b2c7242b0423b3ed9bbfeed82a5f8c0b', '[\"*\"]', '2026-02-10 18:49:48', NULL, '2026-02-10 18:49:03', '2026-02-10 18:49:48'),
(46, 'App\\Models\\User', 7, 'auth_token', '5869ee617eefaa5b9a710263e0fb960671dd6517ef81667155abc7c1069c009d', '[\"*\"]', '2026-02-10 18:55:00', NULL, '2026-02-10 18:51:02', '2026-02-10 18:55:00'),
(47, 'App\\Models\\User', 11, 'auth_token', '764e5e6702305665e9a3a32c20f1dc4a177bc4913b0312917912044f44d0ada2', '[\"*\"]', NULL, NULL, '2026-02-10 18:57:14', '2026-02-10 18:57:14'),
(48, 'App\\Models\\User', 11, 'auth_token', '5fde7fd237e935aec0534481be10d3750800a6c6b45e656195089b015be5b059', '[\"*\"]', '2026-02-10 18:58:41', NULL, '2026-02-10 18:57:38', '2026-02-10 18:58:41'),
(50, 'App\\Models\\User', 6, 'auth_token', '4b278c4b033b7fe06c1107364a77ddced025ac9948f80340f911e3e5a6b3fb2d', '[\"*\"]', '2026-02-11 01:45:07', NULL, '2026-02-11 01:38:19', '2026-02-11 01:45:07'),
(51, 'App\\Models\\User', 4, 'auth_token', '62394dd6905054667ea51e05542af919289af9c94207445b225112f7f66227e1', '[\"*\"]', '2026-02-11 02:19:24', NULL, '2026-02-11 02:16:36', '2026-02-11 02:19:24'),
(52, 'App\\Models\\User', 1, 'auth_token', '1769551e3061d2736016fd9337bd23093ebaae85826752271af567c70e41ca99', '[\"*\"]', '2026-02-25 23:00:17', NULL, '2026-02-11 02:23:10', '2026-02-25 23:00:17'),
(53, 'App\\Models\\User', 6, 'auth_token', 'd88854847c522c34f0aa9717e595a73315a2c09de035a426afba11f8bcae52d9', '[\"*\"]', '2026-03-04 20:34:46', NULL, '2026-03-04 20:34:44', '2026-03-04 20:34:46');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `hairdresser_id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `status` enum('pending','confirmed','completed','cancelled','no_show') NOT NULL DEFAULT 'pending',
  `note` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `client_id`, `hairdresser_id`, `service_id`, `start_time`, `end_time`, `status`, `note`, `created_at`, `updated_at`) VALUES
(1, 4, 3, 1, '2026-01-27 10:30:00', '2026-01-27 11:15:00', 'confirmed', NULL, '2026-01-24 12:06:20', '2026-01-24 13:36:55'),
(2, 4, 3, 31, '2026-01-27 15:30:00', '2026-01-27 16:00:00', 'cancelled', NULL, '2026-01-24 12:10:41', '2026-01-24 12:18:33'),
(3, 7, 6, 14, '2026-01-30 15:00:00', '2026-01-30 15:20:00', 'completed', NULL, '2026-01-24 12:26:33', '2026-01-24 19:05:43'),
(4, 4, 6, 15, '2026-01-29 10:00:00', '2026-01-29 13:00:00', 'completed', NULL, '2026-01-24 19:42:45', '2026-02-10 18:49:32'),
(5, 4, 6, 13, '2026-01-30 12:00:00', '2026-01-30 15:00:00', 'confirmed', NULL, '2026-01-24 19:43:28', '2026-02-11 01:45:06'),
(6, 9, 5, 21, '2026-02-03 12:00:00', '2026-02-03 12:45:00', 'pending', NULL, '2026-01-24 19:49:35', '2026-01-24 19:49:35'),
(7, 4, 6, 9, '2026-02-26 12:00:00', '2026-02-26 14:00:00', 'pending', NULL, '2026-01-27 10:42:38', '2026-01-27 10:42:38'),
(8, 4, 6, 13, '2026-02-26 09:00:00', '2026-02-26 12:00:00', 'no_show', NULL, '2026-01-27 10:51:43', '2026-02-10 18:49:47'),
(9, 1, 6, 13, '2026-02-12 10:30:00', '2026-02-12 13:30:00', 'pending', NULL, '2026-02-03 18:19:46', '2026-02-03 18:19:46'),
(10, 4, 8, 4, '2026-03-05 12:30:00', '2026-03-05 13:20:00', 'pending', NULL, '2026-02-06 16:17:53', '2026-02-06 16:17:53'),
(11, 4, 8, 4, '2026-03-05 13:00:00', '2026-03-05 13:50:00', 'pending', NULL, '2026-02-06 16:18:02', '2026-02-06 16:18:02'),
(12, 4, 8, 4, '2026-03-05 12:30:00', '2026-03-05 13:20:00', 'pending', NULL, '2026-02-06 16:22:40', '2026-02-06 16:22:40'),
(13, 4, 8, 3, '2026-02-20 12:30:00', '2026-02-20 13:10:00', 'pending', NULL, '2026-02-06 16:23:03', '2026-02-06 16:23:03'),
(14, 4, 8, 4, '2026-02-13 12:30:00', '2026-02-13 13:20:00', 'pending', NULL, '2026-02-06 16:26:00', '2026-02-06 16:26:00'),
(15, 4, 3, 14, '2026-02-10 10:00:00', '2026-02-10 10:20:00', 'pending', NULL, '2026-02-06 16:33:04', '2026-02-06 16:33:04'),
(16, 4, 3, 6, '2026-02-24 11:30:00', '2026-02-24 13:00:00', 'pending', NULL, '2026-02-06 16:36:37', '2026-02-06 16:36:37'),
(17, 7, 3, 5, '2026-02-18 15:30:00', '2026-02-18 15:45:00', 'cancelled', NULL, '2026-02-10 18:54:27', '2026-02-10 18:54:59'),
(18, 7, 3, 5, '2026-02-18 15:30:00', '2026-02-18 15:45:00', 'pending', NULL, '2026-02-10 18:54:33', '2026-02-10 18:54:33'),
(19, 11, 8, 28, '2026-02-13 13:30:00', '2026-02-13 14:30:00', 'pending', NULL, '2026-02-10 18:58:30', '2026-02-10 18:58:30'),
(20, 1, 8, 2, '2026-03-27 09:00:00', '2026-03-27 09:30:00', 'pending', NULL, '2026-02-25 23:00:07', '2026-02-25 23:00:07');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `day_of_week` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `user_id`, `day_of_week`, `start_time`, `end_time`, `created_at`, `updated_at`) VALUES
(1, 3, 'Friday', '08:00:00', '16:00:00', '2026-01-22 19:33:23', '2026-01-22 19:33:23'),
(2, 3, 'Friday', '08:00:00', '16:00:00', '2026-01-22 19:34:19', '2026-01-22 19:34:19'),
(3, 3, 'Wednesday', '08:00:00', '16:00:00', '2026-01-22 19:47:17', '2026-01-22 19:47:17'),
(4, 3, 'Tuesday', '08:00:00', '16:00:00', '2026-01-22 19:47:44', '2026-01-22 19:47:44'),
(5, 5, 'Monday', '10:00:00', '16:00:00', '2026-01-24 12:21:19', '2026-01-24 12:21:19'),
(6, 5, 'Tuesday', '08:00:00', '16:00:00', '2026-01-24 12:21:36', '2026-01-24 12:21:36'),
(7, 6, 'Thursday', '08:00:00', '16:00:00', '2026-01-24 12:23:36', '2026-01-24 12:23:36'),
(8, 6, 'Friday', '08:00:00', '16:00:00', '2026-01-24 12:23:44', '2026-01-24 12:23:44'),
(9, 8, 'Saturday', '08:00:00', '16:00:00', '2026-01-24 19:39:02', '2026-01-24 19:39:02'),
(10, 8, 'Friday', '08:00:00', '16:00:00', '2026-01-24 19:39:12', '2026-01-24 19:39:12'),
(11, 8, 'Thursday', '08:00:00', '16:00:00', '2026-01-24 19:39:24', '2026-01-24 19:39:24'),
(12, 10, 'Monday', '08:00:00', '16:00:00', '2026-02-03 18:23:25', '2026-02-03 18:23:25'),
(13, 10, 'Thursday', '08:00:00', '16:00:00', '2026-02-03 18:23:38', '2026-02-03 18:23:38'),
(14, 10, 'Sunday', '08:00:00', '16:00:00', '2026-02-10 18:47:34', '2026-02-10 18:47:34');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `duration_minutes` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `price`, `duration_minutes`, `created_at`, `updated_at`, `category_id`) VALUES
(1, 'Žensko šišanje', 'Profesionalno šišanje prilagođeno vašem obliku lica.', 1300.00, 45, '2026-01-22 11:18:54', '2026-02-11 00:47:01', 1),
(2, 'Feniranje (kratka kosa)', 'Pranje i feniranje na ravno ili volumen.', 1200.00, 30, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 1),
(3, 'Feniranje (srednja kosa)', 'Oblikovanje kose srednje dužine uz negu.', 1500.00, 40, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 1),
(4, 'Feniranje (duga kosa)', 'Feniranje duge kose uz maksimalan sjaj.', 1800.00, 50, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 1),
(5, 'Feniranje sa peglom / loknama', 'Dodatno stilizovanje uz osnovnu uslugu feniranja.', 300.00, 15, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 1),
(6, 'Farbanje izrasta', 'Osvežavanje boje korena kose.', 2500.00, 90, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 2),
(7, 'Farbanje cele dužine (kratka kosa)', 'Ujednačavanje boje na celoj dužini kratke kose.', 3000.00, 100, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 2),
(8, 'Farbanje cele dužine (srednja kosa)', 'Ujednačavanje boje na celoj dužini srednje kose.', 3500.00, 110, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 2),
(9, 'Farbanje cele dužine (duga kosa)', 'Kompletna transformacija boje za dugu kosu.', 4000.00, 120, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 2),
(10, 'Pramenovi (kratka kosa)', 'Klasični pramenovi za kratku kosu.', 4000.00, 120, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 3),
(11, 'Pramenovi (srednja kosa)', 'Klasični pramenovi za postizanje prirodne dubine.', 5000.00, 150, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 3),
(12, 'Pramenovi (duga kosa)', 'Klasični pramenovi za dugu kosu.', 6000.00, 180, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 3),
(13, 'Balayage / Ombre / Air Touch', 'Najmodernije tehnike nijansiranja kose.', 6000.00, 180, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 3),
(14, 'Dubinska nega / maska', 'Intenzivna hidratacija i oporavak vlasi.', 800.00, 20, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 4),
(15, 'Keratinska nega', 'Dugotrajno ispravljanje i zaglađivanje kose.', 5000.00, 180, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 4),
(16, 'Botoks za kosu', 'Tretman za regeneraciju i volumen kose.', 4500.00, 90, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 4),
(17, 'Svečana frizura', 'Punđe, pletenice ili talasi za posebne prilike.', 3000.00, 60, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 5),
(18, 'Probna frizura', 'Probno stilizovanje pre važnog događaja.', 2000.00, 60, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 5),
(19, 'Mladenačka frizura', 'Ekskluzivna frizura za vaš najvažniji dan.', 5000.00, 120, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 5),
(20, 'Muško šišanje', 'Klasično muško šišanje uz pranje kose.', 1000.00, 30, '2026-01-22 11:18:54', '2026-01-22 14:27:45', 6),
(21, 'Fade / Skin fade', 'Precizno šišanje sa postepenim prelazom.', 1200.00, 45, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 6),
(22, 'Mašinica (jedna dužina)', 'Brzo šišanje mašinicom na istu dužinu.', 600.00, 15, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 6),
(23, 'Oblikovanje brade mašinicom', 'Sređivanje brade bez žileta.', 600.00, 20, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 6),
(24, 'Klasično brijanje (žilet)', 'Tradicionalno brijanje oštrim žiletom.', 1200.00, 30, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 7),
(25, 'Brijanje i oblikovanje brade', 'Kompletno sređivanje brade i kontura.', 1500.00, 40, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 7),
(26, 'Hot towel shave', 'Uživanje uz tople peškire i brijanje.', 1800.00, 45, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 7),
(27, 'Kompleksna korekcija brade', 'Potpuna promena oblika brade.', 2000.00, 50, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 7),
(28, 'Muško šišanje + brada', 'Kombinacija šišanja i osnovnog sređivanja brade.', 1800.00, 60, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 8),
(29, 'Fade + brada', 'Precizan fade uz kompletno sređivanje brade.', 2200.00, 70, '2026-01-22 11:18:54', '2026-01-22 11:18:54', 8),
(31, 'Uvijanje kose', 'Uvijanje kose na talase', 2000.00, 30, '2026-01-22 15:51:15', '2026-01-22 15:51:15', 5);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` enum('client','hairdresser','admin') NOT NULL DEFAULT 'client',
  `specialization` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `phone`, `role`, `specialization`, `bio`) VALUES
(1, 'Glavni', 'Administrator', 'admin@salon.com', NULL, '$2y$12$eLp.KJFZp5VSkKnsiGp8dOitODfbcbfgB5.JTMXBHkcPWd/j2o3BG', NULL, '2026-01-22 11:18:54', '2026-01-22 11:18:54', '0601234567', 'admin', NULL, NULL),
(3, 'Jovan', 'Ilic', 'jovicai@gmail.com', NULL, '$2y$12$EUb7148v2uzm0ECBvkkEpOTjiKE4yo5R9.owrFZMDmGcPHZvOH9Ze', NULL, '2026-01-22 19:33:10', '2026-01-22 19:33:10', '0623456789', 'hairdresser', 'Kolorista', NULL),
(4, 'Suzana', 'Tesovic', 'suzanatesovic03@gmail.com', NULL, '$2y$12$EIM7RskDEr5Ar.oVFsx4n.d69jXl6DImGVra0tcLqAdOaKIEgjzAu', NULL, '2026-01-23 12:25:30', '2026-01-23 12:25:30', NULL, 'client', NULL, NULL),
(5, 'Aleksa', 'Sekulic', 'aleks@gmail.com', NULL, '$2y$12$8jKczSThYZFji9wOjpo8P.nT2tVfsYdCoJH8XF9RgOCuGy7SJP3uq', NULL, '2026-01-24 12:20:57', '2026-01-24 12:20:57', '065436667', 'hairdresser', 'Muski frizer', NULL),
(6, 'Aleksa', 'Savic', 'aleksasavic@gmail.com', NULL, '$2y$12$Ovdl/1ZrXApn024teXyQD.0Zl9.mT.OWW3oqjEYrR6p24lv5P4Xi.', NULL, '2026-01-24 12:23:27', '2026-01-24 12:23:27', '0691234567', 'hairdresser', 'Specijalista za oporavak i negu kose', NULL),
(7, 'Valentina', 'Stankovic', 'valentinastankovic824@gmail.com', NULL, '$2y$12$HeLBUIgJCkcTSGSWutA.4O/Hvk7ta3mVCYA0amnTWKaFuoXXRJJz6', NULL, '2026-01-24 12:25:15', '2026-01-24 12:25:15', NULL, 'client', NULL, NULL),
(8, 'Rade', 'Stojicic', 'radest@gmail.com', NULL, '$2y$12$dLpfsyTBJdLO6iNQdcTQPePJhsPGY3.enodVQeLEOeBN5P2yRRdZi', NULL, '2026-01-24 19:38:55', '2026-01-24 19:38:55', '0625467890', 'hairdresser', 'Barber', NULL),
(9, 'Nikola', 'Todorovic', 'nikolatodorovic974@gmail.com', NULL, '$2y$12$TiqEsE5Qf/xrVkAD9ftjDujY.FxVCjI1u5xevvPkEbgk0bUF3bVVm', NULL, '2026-01-24 19:47:21', '2026-01-24 19:47:21', NULL, 'client', NULL, NULL),
(10, 'Andrej', 'Ruvidic', 'andrej@gmail.com', NULL, '$2y$12$Mk3IXYjJHin6vBIPNnI9weut5T6kpT2YmBSBgQdhd.Xz0165JzOcu', NULL, '2026-02-03 18:22:50', '2026-02-03 18:22:50', '0654768905', 'hairdresser', 'Muski frizer', NULL),
(11, 'Vojislav', 'Stankovic', 'voja@gmail.com', NULL, '$2y$12$4QhgQkMAGf/AEBlyyFz23uXgpHpz2kqn4wm0jSnMtF31G38yUuhSW', NULL, '2026-02-10 18:57:14', '2026-02-10 18:57:14', NULL, 'client', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservations_client_id_foreign` (`client_id`),
  ADD KEY `reservations_hairdresser_id_foreign` (`hairdresser_id`),
  ADD KEY `reservations_service_id_foreign` (`service_id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedules_user_id_foreign` (`user_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `services_category_id_foreign` (`category_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_hairdresser_id_foreign` FOREIGN KEY (`hairdresser_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
