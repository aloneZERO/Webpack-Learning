CREATE DATABASE  IF NOT EXISTS `shopping` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `shopping`;
-- MySQL dump 10.13  Distrib 5.6.48, for Linux (x86_64)
--
-- Host: localhost    Database: shopping
-- ------------------------------------------------------
-- Server version	5.6.48

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_activities`
--

DROP TABLE IF EXISTS `t_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_activities` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL COMMENT 'activity title',
  `content` text NOT NULL COMMENT 'activity content',
  `time` datetime NOT NULL COMMENT 'activity time',
  `banner_url` varchar(400) NOT NULL COMMENT 'activity headUrl',
  `head_url` varchar(400) NOT NULL COMMENT 'activity headBigUrl',
  `jump_url` varchar(400) NOT NULL COMMENT 'activity jumpUrl',
  `is_now` int(1) NOT NULL COMMENT 'activity isNow',
  `show_banner` int(1) NOT NULL COMMENT 'activity showBanner',
  `create_date` datetime NOT NULL COMMENT 'Create time',
  `update_date` datetime DEFAULT NULL COMMENT 'Update time',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=100000 DEFAULT CHARSET=utf8 COMMENT='Activities table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_activities`
--

LOCK TABLES `t_activities` WRITE;
/*!40000 ALTER TABLE `t_activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_categories`
--

DROP TABLE IF EXISTS `t_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT 'Category name',
  `create_date` datetime NOT NULL COMMENT 'Create time',
  `update_date` datetime DEFAULT NULL COMMENT 'Update time',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=100000 DEFAULT CHARSET=utf8 COMMENT='Article category table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_categories`
--

LOCK TABLES `t_categories` WRITE;
/*!40000 ALTER TABLE `t_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_comments`
--

DROP TABLE IF EXISTS `t_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_comments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `gid` bigint(20) unsigned NOT NULL COMMENT 'Goods id',
  `uid` bigint(20) unsigned NOT NULL COMMENT 'User id',
  `content` text NOT NULL COMMENT 'Comment content',
  `create_date` datetime NOT NULL COMMENT 'Create time',
  `update_date` datetime DEFAULT NULL COMMENT 'Update time',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=100000 DEFAULT CHARSET=utf8 COMMENT='Comment table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_comments`
--

LOCK TABLES `t_comments` WRITE;
/*!40000 ALTER TABLE `t_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_goods`
--

DROP TABLE IF EXISTS `t_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_goods` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL COMMENT 'Article title',
  `description` varchar(400) NOT NULL COMMENT 'Article description',
  `content` text NOT NULL COMMENT 'Article content',
  `thumbnail` varchar(400) DEFAULT NULL COMMENT 'Article image',
  `cid` bigint(20) unsigned NOT NULL COMMENT 'Category id',
  `uid` bigint(20) unsigned NOT NULL COMMENT 'User id',
  `like_count` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT 'Like count',
  `comment_count` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT 'comment count',
  `visit_count` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT 'Visit count',
  `create_date` datetime NOT NULL COMMENT 'Create time',
  `update_date` datetime DEFAULT NULL COMMENT 'Update time',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=100000 DEFAULT CHARSET=utf8 COMMENT='Article table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_goods`
--

LOCK TABLES `t_goods` WRITE;
/*!40000 ALTER TABLE `t_goods` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_order_goods`
--

DROP TABLE IF EXISTS `t_order_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_order_goods` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `oid` bigint(20) unsigned NOT NULL COMMENT 'Order id',
  `gid` bigint(20) unsigned NOT NULL COMMENT 'Goods id',
  `create_date` datetime NOT NULL COMMENT 'Create time',
  `update_date` datetime DEFAULT NULL COMMENT 'Update time',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=100000 DEFAULT CHARSET=utf8 COMMENT='Comment table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_order_goods`
--

LOCK TABLES `t_order_goods` WRITE;
/*!40000 ALTER TABLE `t_order_goods` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_order_goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_orders`
--

DROP TABLE IF EXISTS `t_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uid` bigint(20) unsigned NOT NULL COMMENT 'User id',
  `create_date` datetime NOT NULL COMMENT 'Create time',
  `update_date` datetime DEFAULT NULL COMMENT 'Update time',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=100000 DEFAULT CHARSET=utf8 COMMENT='Order table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_orders`
--

LOCK TABLES `t_orders` WRITE;
/*!40000 ALTER TABLE `t_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_users`
--

DROP TABLE IF EXISTS `t_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL COMMENT 'Username',
  `password` varchar(100) NOT NULL COMMENT 'Password',
  `email` varchar(400) NOT NULL COMMENT 'Email address',
  `avatar` varchar(400) NOT NULL COMMENT 'User avatar',
  `name` varchar(50) DEFAULT NULL COMMENT 'name',
  `home_page` varchar(50) DEFAULT NULL COMMENT 'home_page',
  `brief_introduction` varchar(50) DEFAULT NULL COMMENT 'brief_introduction',
  `type` tinyint(1) unsigned DEFAULT NULL COMMENT 'User type, 0 means super adminstrator,1 means generar adminstrator, 2 means user',
  `create_date` datetime NOT NULL COMMENT 'Create time',
  `update_date` datetime DEFAULT NULL COMMENT 'Update time',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=100000 DEFAULT CHARSET=utf8 COMMENT='User table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_users`
--

LOCK TABLES `t_users` WRITE;
/*!40000 ALTER TABLE `t_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-13 19:31:51
