-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ynong_db
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `back_user`
--

DROP TABLE IF EXISTS `back_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `back_user` (
  `manager_id` int NOT NULL AUTO_INCREMENT,
  `manager_name` varchar(10) DEFAULT NULL,
  `manager_password` varchar(16) DEFAULT NULL,
  `manager_nickname` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`manager_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `back_user`
--

/*!40000 ALTER TABLE `back_user` DISABLE KEYS */;
INSERT INTO `back_user` VALUES (1,'admin','123456','管理员');
/*!40000 ALTER TABLE `back_user` ENABLE KEYS */;

--
-- Table structure for table `farm_info`
--

DROP TABLE IF EXISTS `farm_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farm_info` (
  `farm_id` char(6) NOT NULL,
  `farm_name` varchar(10) DEFAULT NULL,
  `farm_desc` varchar(200) DEFAULT NULL,
  `farm_lan_lng` varchar(50) DEFAULT NULL,
  `farm_area` varchar(10) DEFAULT NULL,
  `farm_address` varchar(50) DEFAULT NULL,
  `farm_images` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`farm_id`),
  UNIQUE KEY `farm_id` (`farm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farm_info`
--

/*!40000 ALTER TABLE `farm_info` DISABLE KEYS */;
INSERT INTO `farm_info` VALUES ('0nxGOl','222222','','114.53414589018783,38.06284084828949','123','河北省石家庄市长安区育才街',''),('5t3ckQ','前锋农场','一个农场','104.2118501386779,35.87014164087095','13km²','甘肃省兰州市榆中县',''),('EJbcN2','西藏处的农场','一个位于西藏的农场','88.68744269928209,30.432905071364317','12','西藏自治区那曲市申扎县',''),('RxbDtL','通渭','111111','105.26304933434687,35.19074387778039','12','甘肃省定西市通渭县','');
/*!40000 ALTER TABLE `farm_info` ENABLE KEYS */;

--
-- Table structure for table `hotfarm`
--

DROP TABLE IF EXISTS `hotfarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotfarm` (
  `farm_id` char(6) DEFAULT NULL,
  `farm_name` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotfarm`
--

/*!40000 ALTER TABLE `hotfarm` DISABLE KEYS */;
INSERT INTO `hotfarm` VALUES ('0nxGOl','222222'),('RxbDtL','1111'),('5t3ckQ','前锋农场');
/*!40000 ALTER TABLE `hotfarm` ENABLE KEYS */;

--
-- Table structure for table `land_info`
--

DROP TABLE IF EXISTS `land_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `land_info` (
  `land_id` char(6) NOT NULL,
  `land_name` varchar(10) DEFAULT NULL,
  `land_plants` varchar(100) DEFAULT NULL,
  `farm_id` char(6) DEFAULT NULL,
  `land_area` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`land_id`),
  UNIQUE KEY `land_id` (`land_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `land_info`
--

/*!40000 ALTER TABLE `land_info` DISABLE KEYS */;
INSERT INTO `land_info` VALUES ('111111','土块1','西瓜，茄子','5t3ckQ','12'),('X6FZxD','土块3','玉米','RxbDtL','123');
/*!40000 ALTER TABLE `land_info` ENABLE KEYS */;

--
-- Table structure for table `micro_lunbo`
--

DROP TABLE IF EXISTS `micro_lunbo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `micro_lunbo` (
  `farm_id` char(6) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `farm_name` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `micro_lunbo`
--

/*!40000 ALTER TABLE `micro_lunbo` DISABLE KEYS */;
INSERT INTO `micro_lunbo` VALUES ('0nxGOl','https://dpweb.club:3000/1678696459803_201709130816253.jpg','222222');
/*!40000 ALTER TABLE `micro_lunbo` ENABLE KEYS */;

--
-- Table structure for table `order_table`
--

DROP TABLE IF EXISTS `order_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_table` (
  `order_id` char(9) NOT NULL,
  `farm_id` char(6) DEFAULT NULL,
  `order_timestamp` bigint DEFAULT NULL,
  `order_price` int DEFAULT NULL,
  `order_type` int DEFAULT '0',
  `user_id` int DEFAULT NULL,
  `land_id` char(6) DEFAULT NULL,
  `order_desc` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_table`
--

/*!40000 ALTER TABLE `order_table` DISABLE KEYS */;
INSERT INTO `order_table` VALUES ('111111111','RxbDtL',1679213461913,12000,0,1,'X6FZxD','备注内容'),('222222222','RxbDtL',1679213462913,1000,0,1,'X6FZxD','无'),('222333222','RxbDtL',1679213462513,1000,0,1,'X6FZxD','无'),('222333333','RxbDtL',1679213462513,1000,0,1,'X6FZxD','无'),('333333333','RxbDtL',1679113462513,1000,0,1,'X6FZxD','无');
/*!40000 ALTER TABLE `order_table` ENABLE KEYS */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_nickname` varchar(10) DEFAULT NULL,
  `user_phone` varchar(20) DEFAULT NULL,
  `user_avator` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'叫什么昵称好呢','13623456725','https://dpweb.club:3000/1679136776577_title.jpg'),(2,'nn','123','https://dpweb.club:3000/1679136776577_title.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-23 15:28:37
