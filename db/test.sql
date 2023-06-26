/*
 Navicat Premium Data Transfer

 Source Server         : ynong_db
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : ynong_db

 Target Server Type    : MySQL
 Target Server Version : 50799
 File Encoding         : 65001

 Date: 23/03/2023 16:37:24
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for back_user
-- ----------------------------
CREATE TABLE `back_user`  (
  `manager_id` int NOT NULL AUTO_INCREMENT,
  `manager_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `manager_password` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `manager_nickname` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`manager_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci;

-- ----------------------------
-- Records of back_user
-- ----------------------------
BEGIN;
INSERT INTO `back_user` (`manager_id`, `manager_name`, `manager_password`, `manager_nickname`) VALUES (1, 'admin', '123456', '管理员');
COMMIT;

-- ----------------------------
-- Table structure for farm_info
-- ----------------------------
CREATE TABLE `farm_info`  (
  `farm_id` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `farm_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `farm_desc` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `farm_lan_lng` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `farm_area` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `farm_address` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `farm_images` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`farm_id`) USING BTREE,
  UNIQUE INDEX `farm_id`(`farm_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci;

-- ----------------------------
-- Records of farm_info
-- ----------------------------
BEGIN;
INSERT INTO `farm_info` (`farm_id`, `farm_name`, `farm_desc`, `farm_lan_lng`, `farm_area`, `farm_address`, `farm_images`) VALUES ('0nxGOl', '222222', '', '114.53414589018783,38.06284084828949', '123', '河北省石家庄市长安区育才街', ''), ('5t3ckQ', '前锋农场', '一个农场', '104.2118501386779,35.87014164087095', '13km²', '甘肃省兰州市榆中县', ''), ('EJbcN2', '西藏处的农场', '一个位于西藏的农场', '88.68744269928209,30.432905071364317', '12', '西藏自治区那曲市申扎县', ''), ('RxbDtL', '通渭', '111111', '105.26304933434687,35.19074387778039', '12', '甘肃省定西市通渭县', '');
COMMIT;

-- ----------------------------
-- Table structure for hotfarm
-- ----------------------------
CREATE TABLE `hotfarm`  (
  `farm_id` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `farm_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci;

-- ----------------------------
-- Records of hotfarm
-- ----------------------------
BEGIN;
INSERT INTO `hotfarm` (`farm_id`, `farm_name`) VALUES ('0nxGOl', '222222'), ('RxbDtL', '1111'), ('5t3ckQ', '前锋农场');
COMMIT;

-- ----------------------------
-- Table structure for land_info
-- ----------------------------
CREATE TABLE `land_info`  (
  `land_id` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `land_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `land_plants` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `farm_id` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `land_area` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`land_id`) USING BTREE,
  UNIQUE INDEX `land_id`(`land_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci;

-- ----------------------------
-- Records of land_info
-- ----------------------------
BEGIN;
INSERT INTO `land_info` (`land_id`, `land_name`, `land_plants`, `farm_id`, `land_area`) VALUES ('111111', '土块1', '西瓜，茄子', '5t3ckQ', '12'), ('X6FZxD', '土块3', '玉米', 'RxbDtL', '123');
COMMIT;

-- ----------------------------
-- Table structure for micro_lunbo
-- ----------------------------
CREATE TABLE `micro_lunbo`  (
  `farm_id` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `url` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `farm_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci;

-- ----------------------------
-- Records of micro_lunbo
-- ----------------------------
BEGIN;
INSERT INTO `micro_lunbo` (`farm_id`, `url`, `farm_name`) VALUES ('0nxGOl', 'https://dpweb.club:3000/1678696459803_201709130816253.jpg', '222222');
COMMIT;

-- ----------------------------
-- Table structure for order_table
-- ----------------------------
CREATE TABLE `order_table`  (
  `order_id` char(9) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `farm_id` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `order_timestamp` bigint NULL DEFAULT NULL,
  `order_price` int NULL DEFAULT NULL,
  `order_type` int NULL DEFAULT 0,
  `user_id` int NULL DEFAULT NULL,
  `land_id` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `order_desc` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`) USING BTREE,
  UNIQUE INDEX `order_id`(`order_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci;

-- ----------------------------
-- Records of order_table
-- ----------------------------
BEGIN;
INSERT INTO `order_table` (`order_id`, `farm_id`, `order_timestamp`, `order_price`, `order_type`, `user_id`, `land_id`, `order_desc`) VALUES ('111111111', 'RxbDtL', 1679213461913, 12000, 0, 1, 'X6FZxD', '备注内容'), ('222222222', 'RxbDtL', 1679213462913, 1000, 0, 1, 'X6FZxD', '无'), ('222333222', 'RxbDtL', 1679213462513, 1000, 0, 1, 'X6FZxD', '无'), ('222333333', 'RxbDtL', 1679213462513, 1000, 0, 1, 'X6FZxD', '无'), ('333333333', 'RxbDtL', 1679113462513, 1000, 0, 1, 'X6FZxD', '无');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
CREATE TABLE `user`  (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_nickname` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_avator` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`user_id`, `user_nickname`, `user_phone`, `user_avator`) VALUES (1, '叫什么昵称好呢', '13623456725', 'https://dpweb.club:3000/1679136776577_title.jpg'), (2, 'nn', '123', 'https://dpweb.club:3000/1679136776577_title.jpg');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
