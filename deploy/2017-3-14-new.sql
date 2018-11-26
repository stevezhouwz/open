/*
--
--Table structure for table `nh_music`
--id:           	int               自增(主键)
--sequence:     	varchar(50)       开幕编号
--music_id:     	varchar(50)      音乐id
--music_url:     	varchar(1000)    音乐路径
--music_name:      varchar(255)      音乐名字
--insert_dt             varchar(50)       插入时间
--
*/
CREATE TABLE `nh_music` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sequence` varchar(50) DEFAULT NULL,
  `music_id` varchar(50) NOT NULL,
  `music_url` varchar(1000) DEFAULT NULL,
  `music_name` varchar(255) DEFAULT NULL,
  `insert_dt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `music` (`music_id`,`music_url`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*
--
--Table structure for table `nh_custom_shake`
--id:           	int               自增(主键)
--sequence:     	varchar(50)       开幕编号
--custom_bg:     	varchar(50)      自定义背景
--custom_pattern:     	varchar(50)    选择模式（进度条、文字、图片）
--music_name:      varchar(255)      音乐名字
--insert_dt             varchar(50)       插入时间
--
*/
CREATE TABLE `nh_custom_shake` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sequence` varchar(50) DEFAULT NULL,
  `custom_bg` varchar(1000) DEFAULT NULL,
  `custom_pattern` varchar(50) DEFAULT NULL,
  `custom_color` varchar(50) DEFAULT NULL,
  `shake_text` varchar(100) DEFAULT NULL,
  `shake_text_color` varchar(50) DEFAULT NULL,
  `shake_img_url` varchar(1000) DEFAULT NULL,
  `insert_dt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sequence` (`sequence`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/**
--Table structure for table `nh_open_info`
-- music_id    varchar(50)       音乐id
 */
ALTER TABLE `nh_open_info`
ADD COLUMN `music_id`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL AFTER `video_id`;

ALTER TABLE `nh_own_video`
ADD COLUMN `video_type`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 0 AFTER `sequence`;

ALTER TABLE `nh_open_info`
ADD COLUMN `down_nav`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 0 COMMENT '倒计时区别默认还是个人' AFTER `down_type`;

ALTER TABLE `nh_open_info`
ADD COLUMN `down_id`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '写入个人素材库的视频id' AFTER `music_id`;

ALTER TABLE `nh_open_myvideo`
ADD COLUMN `video_id`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '视频编号' AFTER `id`;

ALTER TABLE `nh_open_myvideo`
ADD COLUMN `preview_url`  varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '预览地址' AFTER `video_url`;

DROP TABLE IF EXISTS `nh_video_material`;
CREATE TABLE `nh_video_material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_id` varchar(50) DEFAULT NULL COMMENT '视频编号',
  `dl_url` varchar(1000) DEFAULT NULL COMMENT '资源包地址',
  `insert_dt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;


ALTER TABLE `nh_video_material`
ADD COLUMN `insert_dt`  timestamp NULL ON UPDATE CURRENT_TIMESTAMP AFTER `dl_url`;

ALTER TABLE `nh_video_material`
MODIFY COLUMN `id`  int(11) NOT NULL AUTO_INCREMENT FIRST ;

update nh_open_myvideo set preview_url=
concat(SUBSTRING_INDEX(video_url, '.mp4', 1), '_preview.mp4')


