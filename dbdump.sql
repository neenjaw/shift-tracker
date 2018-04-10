-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.14-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table tracker.assignments
CREATE TABLE IF NOT EXISTS `assignments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.assignments: ~7 rows (approximately)
DELETE FROM `assignments`;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` (`id`, `name`, `date_created`, `date_updated`) VALUES
	(26, 'A', '2018-03-07 22:55:14', '2018-03-07 22:55:14'),
	(27, 'B', '2018-03-07 22:55:22', '2018-03-07 22:55:22'),
	(28, 'C', '2018-03-07 22:55:38', '2018-03-07 22:55:38'),
	(29, 'A/B', '2018-03-07 22:55:46', '2018-03-07 22:55:46'),
	(30, 'B/C', '2018-03-07 22:55:58', '2018-03-07 22:55:58'),
	(31, 'A/B/C', '2018-03-07 22:56:08', '2018-03-07 22:56:08'),
	(32, 'float', '2018-03-07 22:56:18', '2018-03-07 22:56:18');
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;

-- Dumping structure for table tracker.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.categories: ~4 rows (approximately)
DELETE FROM `categories`;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`, `date_created`, `date_updated`) VALUES
	(1, 'RN', '2014-06-01 00:35:07', '2014-05-30 17:34:33'),
	(2, 'LPN', '2014-06-01 00:35:07', '2014-05-30 17:34:33'),
	(3, 'UC', '2014-06-01 00:35:07', '2014-05-30 17:34:54'),
	(5, 'NA', '2014-06-02 00:35:08', '2016-01-08 13:27:26');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Dumping structure for table tracker.mods
CREATE TABLE IF NOT EXISTS `mods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `display` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.mods: ~8 rows (approximately)
DELETE FROM `mods`;
/*!40000 ALTER TABLE `mods` DISABLE KEYS */;
INSERT INTO `mods` (`id`, `name`, `display`, `description`, `date_created`, `date_updated`) VALUES
	(19, 'burn', 'Burn', 'Assigned a patient with burn dressings.', '2018-03-07 08:48:00', '2018-04-10 09:18:08'),
	(20, 'evd', 'EVD', 'Assigned a patient with an EVD', '2018-03-07 08:48:00', '2018-04-10 09:19:36'),
	(21, 'crrt', 'CRRT', 'Assigned a CRRT', '2018-03-07 08:48:00', '2018-04-10 09:19:51'),
	(22, 'vent', 'Vent', 'Assigned a ventilated patient', '2018-03-07 08:48:00', '2018-04-10 09:20:27'),
	(23, 'double', 'Double', 'Assignment consisted of more than one patient.', '2018-03-07 08:48:00', '2018-04-10 09:20:43'),
	(24, 'admit', 'Admit', 'Admitted a patient during the shift.', '2018-03-07 08:48:00', '2018-04-10 09:20:59'),
	(25, 'codes', 'Code Pager', 'Assigned to the code blue reponse team.', '2018-03-07 08:48:00', '2018-04-10 09:21:29'),
	(27, 'vsick', 'Very Sick', 'Assigned a very sick patient (more than 3 IV infusions)', '2018-04-10 09:14:59', '2018-04-10 09:21:57');
/*!40000 ALTER TABLE `mods` ENABLE KEYS */;

-- Dumping structure for table tracker.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.roles: ~6 rows (approximately)
DELETE FROM `roles`;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `name`, `date_created`, `date_updated`) VALUES
	(1, 'bedside', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(2, 'charge', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(3, 'clinician', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(4, 'nursing attendant', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(5, 'outreach', '2018-03-06 23:23:10', '2018-03-06 23:27:59'),
	(6, 'unit clerk', '2018-03-06 23:23:10', '2018-03-06 23:27:59');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Dumping structure for table tracker.staff_members
CREATE TABLE IF NOT EXISTS `staff_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `category_id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_name` (`first_name`,`last_name`),
  KEY `staff_members_ibfk_1` (`category_id`),
  CONSTRAINT `staff_members_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.staff_members: ~8 rows (approximately)
DELETE FROM `staff_members`;
/*!40000 ALTER TABLE `staff_members` DISABLE KEYS */;
INSERT INTO `staff_members` (`id`, `first_name`, `last_name`, `category_id`, `active`, `date_created`, `date_updated`, `created_by`, `updated_by`) VALUES
	(19, 'Tim', 'Austin', 1, 1, '2018-03-09 14:00:13', '2018-03-24 15:55:57', 'tima', 'webuser'),
	(21, 'Dan', 'Cashen', 1, 1, '2018-03-12 21:20:23', '2018-03-12 21:20:23', 'tima', NULL),
	(22, 'Barry', 'Manilow', 1, 1, '2018-04-01 08:34:03', '2018-04-01 08:34:03', 'webuser', NULL),
	(23, 'Gary', 'Bogary', 1, 1, '2018-04-01 08:34:17', '2018-04-01 08:34:17', 'webuser', NULL),
	(24, 'Humphrey', 'Bogart', 1, 1, '2018-04-01 08:34:24', '2018-04-01 08:34:24', 'webuser', NULL),
	(25, 'Mr.', 'Potato', 1, 1, '2018-04-01 08:35:01', '2018-04-01 08:35:01', 'webuser', NULL),
	(26, 'Lpn', 'Thefirst', 2, 1, '2018-04-01 20:26:54', '2018-04-01 20:26:54', 'webuser', NULL),
	(28, 'Uc', 'Thefirst', 3, 1, '2018-04-01 20:27:14', '2018-04-01 20:27:14', 'webuser', NULL);
/*!40000 ALTER TABLE `staff_members` ENABLE KEYS */;

-- Dumping structure for table tracker.shifts
CREATE TABLE IF NOT EXISTS `shifts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shift_date` date NOT NULL,
  `shift_d_or_n` varchar(1) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_staff_shift` (`shift_date`,`staff_id`),
  KEY `shifts_ibfk_1` (`staff_id`),
  KEY `shifts_ibfk_2` (`role_id`),
  KEY `shifts_ibfk_3` (`assignment_id`),
  CONSTRAINT `shifts_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff_members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shifts_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `shifts_ibfk_3` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.shifts: ~19 rows (approximately)
DELETE FROM `shifts`;
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
INSERT INTO `shifts` (`id`, `shift_date`, `shift_d_or_n`, `staff_id`, `role_id`, `assignment_id`, `date_created`, `date_updated`, `created_by`, `updated_by`) VALUES
	(20, '2018-03-20', 'N', 19, 1, 28, '2018-03-12 09:47:17', '2018-03-24 09:21:04', 'arooter', NULL),
	(21, '2018-03-15', 'N', 21, 1, 28, '2018-03-12 21:21:22', '2018-03-22 08:32:08', 'tima', NULL),
	(22, '2018-03-21', 'N', 19, 2, 28, '2018-03-12 09:47:17', '2018-04-05 07:38:11', 'arooter', 'tima'),
	(23, '2018-03-19', 'D', 19, 1, 28, '2018-03-12 09:47:17', '2018-03-24 09:21:07', 'arooter', NULL),
	(24, '2018-03-18', 'D', 19, 1, 28, '2018-03-12 09:47:17', '2018-03-24 09:21:10', 'arooter', NULL),
	(25, '2018-03-12', 'D', 19, 2, 26, '2018-03-12 09:47:17', '2018-03-24 09:19:16', 'arooter', 'webuser'),
	(26, '2018-03-13', 'D', 19, 2, 26, '2018-03-12 09:47:17', '2018-03-24 09:19:29', 'arooter', 'webuser'),
	(27, '2018-03-14', 'N', 19, 3, 31, '2018-03-12 09:47:17', '2018-03-24 09:20:02', 'arooter', 'webuser'),
	(28, '2018-03-15', 'N', 19, 3, 31, '2018-03-12 09:47:17', '2018-03-24 09:20:14', 'arooter', 'webuser'),
	(29, '2018-03-24', 'N', 19, 1, 28, '2018-03-12 09:47:17', '2018-03-24 09:21:00', 'arooter', NULL),
	(58, '2018-04-02', 'D', 19, 3, 29, '2018-04-02 15:56:53', '2018-04-02 15:56:53', 'webuser', NULL),
	(59, '2018-04-02', 'D', 24, 2, 28, '2018-04-02 15:56:53', '2018-04-02 15:56:53', 'webuser', NULL),
	(60, '2018-04-02', 'D', 21, 5, 32, '2018-04-02 15:56:53', '2018-04-02 15:56:53', 'webuser', NULL),
	(61, '2018-04-02', 'D', 23, 1, 26, '2018-04-02 15:56:54', '2018-04-02 15:56:54', 'webuser', NULL),
	(62, '2018-04-05', 'D', 19, 3, 29, '2018-04-05 07:37:32', '2018-04-05 07:37:32', 'tima', NULL),
	(63, '2018-04-05', 'D', 24, 2, 28, '2018-04-05 07:37:32', '2018-04-05 07:37:32', 'tima', NULL),
	(64, '2018-04-05', 'D', 25, 5, 32, '2018-04-05 07:37:32', '2018-04-05 07:37:32', 'tima', NULL),
	(66, '2018-04-05', 'D', 28, 6, 31, '2018-04-05 07:37:32', '2018-04-05 07:37:32', 'tima', NULL),
	(67, '2018-04-05', 'D', 22, 1, 26, '2018-04-05 07:37:32', '2018-04-05 07:37:32', 'tima', NULL);
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;

-- Dumping structure for table tracker.shift_to_mod
CREATE TABLE IF NOT EXISTS `shift_to_mod` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shift_id` int(11) NOT NULL,
  `mod_id` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_shift_mod` (`shift_id`,`mod_id`),
  KEY `fk_mod_id` (`mod_id`),
  CONSTRAINT `fk_mod_id` FOREIGN KEY (`mod_id`) REFERENCES `mods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_shift_id` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.shift_to_mod: ~10 rows (approximately)
DELETE FROM `shift_to_mod`;
/*!40000 ALTER TABLE `shift_to_mod` DISABLE KEYS */;
INSERT INTO `shift_to_mod` (`id`, `shift_id`, `mod_id`, `date_created`, `date_updated`) VALUES
	(8, 20, 21, '2018-03-12 09:47:17', '2018-03-12 09:47:17'),
	(10, 20, 23, '2018-03-12 09:47:17', '2018-03-12 09:47:17'),
	(35, 21, 25, '2018-03-22 08:55:07', '2018-03-22 08:55:07'),
	(40, 21, 20, '2018-03-22 08:58:12', '2018-03-22 08:58:12'),
	(43, 20, 20, '2018-03-23 19:47:18', '2018-03-23 19:47:18'),
	(51, 26, 24, '2018-03-24 09:56:20', '2018-03-24 09:56:20'),
	(52, 26, 19, '2018-03-24 09:56:21', '2018-03-24 09:56:21'),
	(66, 67, 24, '2018-04-05 07:37:32', '2018-04-05 07:37:32'),
	(67, 20, 22, '2018-04-08 08:31:21', '2018-04-08 08:31:21'),
	(68, 29, 22, '2018-04-08 08:31:33', '2018-04-08 08:31:33');
/*!40000 ALTER TABLE `shift_to_mod` ENABLE KEYS */;

-- Dumping structure for table tracker.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- Dumping data for table tracker.users: ~3 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`, `active`, `admin`, `date_created`, `date_updated`, `created_by`, `updated_by`) VALUES
	(20, 'tima', '$2y$10$DPrHttiNIK4MrzJ/vKEHHemikdaCBYsKVWTYbHRuuRjfK/mlNnaPK', 1, 1, '2018-03-08 22:44:00', '2018-04-03 19:58:15', 'root', 'tima'),
	(21, 'root', '$2y$10$ihTu/fbECLvGkZR4bqIla.zyGCljlcdfwsDI5.JHJBTMQNZaEKip6', 1, 1, '2018-03-08 23:27:01', '2018-03-08 23:27:01', 'root', NULL),
	(31, 'danc', '$2y$10$xUoJnjQ/KVy1Qdik1ZHzK.i49JuJT4QK/ycbrPtDMNj.qhqCYzm7W', 1, 0, '2018-04-05 00:04:13', '2018-04-08 00:40:22', 'tima', 'tima');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
