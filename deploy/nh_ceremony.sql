CREATE DATABASE IF NOT EXISTS `nh_ceremony` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
use nh_ceremony;
/*
--
--Table structure for table `nh_open_cover`
--id:           	int               自增(主键)
--sequence:     	varchar(50)       开幕编号
--load_cover:     	varchar(100)      摇一摇封面
--load_name:     	varchar(100)      摇一摇名字
--countdown_cover:      varchar(100)      倒计时封面
--countdown_name:       varchar(100)      倒计时名字
--video_cover		varchar(100)      视频编辑封面
--video_name		varchar(100)      视频编辑名字
--insert_dt             varchar(50)       插入时间
--
*/

CREATE TABLE `nh_open_cover` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sequence` varchar(50) DEFAULT NULL,
  `load_cover` varchar(1000) DEFAULT NULL,
  `load_name` varchar(1000) DEFAULT NULL,
  `countdown_cover` varchar(1000) DEFAULT NULL,
  `countdown_name` varchar(1000) DEFAULT NULL,
  `video_cover` varchar(1000) DEFAULT NULL,
  `video_name` varchar(1000) DEFAULT NULL,
  `insert_dt` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=625 DEFAULT CHARSET=utf8;

/*
--
--Table structure for table `nh_open_info`
--id:           	int              自增(主键)
--sequence:     	varchar(50)      开幕编号
--comp_id:      	varchar(50)      企业编号
--meet_id:      	varchar(50)      年会编号
--num:          	int(11)     	 摇一摇次数（默认50）
--shake_type:      	varchar(50)      启用文字图片(二选一)
--loading_url    	varchar(100)     摇一摇url
--countdown_url:    	varchar(100) 倒计时url
--down_type:      	varchar(50)      倒计时类型
--patter       	    varchar(50)      字体模式
--video_src:       	varchar(100)    视频url
--video_content:       	varchar(100)    视频插入的文字
--sort                  text             播放顺序
--insert_dt             varchar(50)      插入时间
--video_id                               视频id
*/
CREATE TABLE `nh_open_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sequence` varchar(50) DEFAULT NULL,
  `comp_id` varchar(50) DEFAULT NULL,
  `meet_id` varchar(50) DEFAULT NULL,
  `num` int(11) DEFAULT '50',
  `shake_type` varchar(50) DEFAULT NULL,
  `loading_url` varchar(1000) DEFAULT NULL,
  `countdown_url` varchar(512) DEFAULT NULL,
  `down_type` varchar(50) DEFAULT NULL,
  `patter` varchar(255) DEFAULT NULL,
  `video_src` varchar(1000) DEFAULT NULL,
  `video_content` text,
  `sort` text,
  `insert_dt` varchar(50) DEFAULT NULL,
  `video_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=617 DEFAULT CHARSET=utf8;

/*
--
--Table structure for table `nh_open_myvideo`
--id:           	int               自增(主键)
--video_url:            varchar(100)      视频url
--video_cover:          varchar(100)      视频封面
--video_type:           int(11)           视频类型（1->开场视频，5->5s倒计时，10->10s倒计时）
--video_name            varchar(255)      视频名字
--patter                varchar(50)       视频模块类型(1、2、3、4、5)
--insert_dt:            varchar(50)       插入时间
--
*/
CREATE TABLE `nh_open_myvideo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_url` varchar(300) DEFAULT NULL,
  `video_cover` varchar(1000) DEFAULT NULL,
  `video_type` int(11) DEFAULT NULL,
  `video_name` varchar(255) DEFAULT NULL,
  `patter` varchar(50) DEFAULT NULL,
  `insert_dt` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8;

CREATE TABLE `nh_own_video` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `comp_id` varchar(50) DEFAULT NULL COMMENT '企业id',
  `sequence` varchar(50) DEFAULT NULL COMMENT 'sequence',
  `video_id` varchar(50) DEFAULT NULL COMMENT '视频id',
  `video_cover` varchar(1000) DEFAULT NULL COMMENT '视频封面',
  `video_url` varchar(1000) DEFAULT NULL COMMENT '视频地址',
  `video_name` varchar(1000) DEFAULT NULL COMMENT '视频名字',
  `video_status` varchar(50) DEFAULT NULL COMMENT '转码状态（0：未转码，1：已转码）',
  `insert_dt` varchar(50) DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8;

/*
--
--Table structure for table `nh_shake_wno`
--id:           	int               自增(主键)
--sequence:     	varchar(50)       开幕编号
--shake_url:     	varchar(255)      开幕地址
--shake_text:     	varchar(255)      开幕插入文字
--shake_img:     	varchar(100)      开幕插入图片地址
--shake_type:       varchar(50)        选择启用文字还是图片
--insert_dt         varchar(50)       插入时间
--
*/
CREATE TABLE `nh_shake_wno` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sequence` varchar(255) DEFAULT NULL,
  `shake_url` varchar(255) DEFAULT NULL,
  `shake_text` varchar(255) DEFAULT NULL,
  `shake_img` varchar(1000) DEFAULT NULL,
  `shake_type` varchar(50) DEFAULT NULL,
  `insert_dt` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1873 DEFAULT CHARSET=utf8;

INSERT INTO `nh_open_myvideo` VALUES ('1', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5sbinx.mp4', '/img/down/5sbinx.jpg', '5', '动画1', null, '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('2', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5sjins.mp4', '/img/down/5sjins.png', '5', '动画2', null, '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('3', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5slans.mp4', '/img/down/5slans.png', '5', '动画3', null, '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5szhengc.mp4', '/img/down/5szhengc.jpg', '5', '动画4', null, '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('5', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5szhonggf.mp4', '/img/down/5szhonggf.jpg', '5', '动画5', null, '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('6', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10shongs.mp4', '/img/down/10shongs.png', '10', '动画1', null, '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('7', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10sjins.mp4', '/img/down/10sjins.png', '10', '动画5', null, '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('8', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10sxiq.mp4', '/img/down/10sxiq.png', '10', '动画3', null, '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('9', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10szis.mp4', '/img/down/10szis.png', '10', '动画4', null, '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('10', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10szise.mp4', '/img/down/10szise.png', '10', '动画5', null, '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('11', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/start_1.mp4', '/img/down/start_1.png', '1', '时代前沿', '1', '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('12', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/start_2.mp4', '/img/down/start_2.png', '1', '燃烧岁月', '', '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('13', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/start_3.mp4', '/img/down/start_3.png', '1', '恢弘大气', '3', '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('14', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/start_4.mp4', '/img/down/start_4.png', '1', '喜庆新年', '4', '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('15', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/start_5.mp4', '/img/down/start_5.png', '1', '唯美水彩', '5', '2016-08-05 17:35:19');
INSERT INTO `nh_open_myvideo` VALUES ('22', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB6_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB6.jpg', '10', '动画6', null, '2016-12-23 22:05:14');
INSERT INTO `nh_open_myvideo` VALUES ('23', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB7_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB7.jpg', '10', '动画7', null, '2016-12-23 22:05:14');
INSERT INTO `nh_open_myvideo` VALUES ('24', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB8_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB8.jpg', '10', '动画8', null, '2016-12-23 22:05:14');
INSERT INTO `nh_open_myvideo` VALUES ('25', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB9_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB9.jpg', '10', '动画9', null, '2016-12-23 22:05:14');
INSERT INTO `nh_open_myvideo` VALUES ('26', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB10_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB10.jpg', '10', '动画10', null, '2016-12-23 22:05:14');
INSERT INTO `nh_open_myvideo` VALUES ('27', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB11_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB11.jpg', '10', '动画11', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('28', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB12_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB12.jpg', '10', '动画12', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('29', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB13_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB13.jpg', '10', '动画13', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('30', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB14_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB14.jpg', '10', '动画14', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('31', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB15_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB15.jpg', '10', '动画15', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('32', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB16_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB16.jpg', '10', '动画16', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('33', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB17_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB17.jpg', '10', '动画17', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('34', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB18_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB18.jpg', '10', '动画18', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('35', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB19_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB19.jpg', '10', '动画19', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('36', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB20_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB20.jpg', '10', '动画20', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('37', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB21_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB21.jpg', '10', '动画21', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('38', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB22_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB22.jpg', '10', '动画22', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('39', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB23_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB23.jpg', '10', '动画23', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('40', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB24_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB24.jpg', '10', '动画24', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('41', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB25_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB25.jpg', '10', '动画25', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('42', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB26_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB26.jpg', '10', '动画26', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('43', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB27_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB27.jpg', '10', '动画27', null, '2016-12-23 22:05:15');
INSERT INTO `nh_open_myvideo` VALUES ('44', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/%E5%8A%A8%E7%94%BB28_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/10s/pic/%E5%8A%A8%E7%94%BB28.jpg', '10', '动画28', null, '2016-12-23 22:05:16');
INSERT INTO `nh_open_myvideo` VALUES ('49', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB6_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB6.jpg', '5', '动画6', null, '2016-12-23 22:11:45');
INSERT INTO `nh_open_myvideo` VALUES ('50', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB7_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB7.jpg', '5', '动画7', null, '2016-12-23 22:11:45');
INSERT INTO `nh_open_myvideo` VALUES ('51', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB8_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB8.jpg', '5', '动画8', null, '2016-12-23 22:11:45');
INSERT INTO `nh_open_myvideo` VALUES ('52', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB9_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB9.jpg', '5', '动画9', null, '2016-12-23 22:11:45');
INSERT INTO `nh_open_myvideo` VALUES ('53', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB10_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB10.jpg', '5', '动画10', null, '2016-12-23 22:11:45');
INSERT INTO `nh_open_myvideo` VALUES ('54', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB11_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB11.jpg', '5', '动画11', null, '2016-12-23 22:11:45');
INSERT INTO `nh_open_myvideo` VALUES ('55', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB12_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB12.jpg', '5', '动画12', null, '2016-12-23 22:11:45');
INSERT INTO `nh_open_myvideo` VALUES ('56', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB13_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB13.jpg', '5', '动画13', null, '2016-12-23 22:11:45');
INSERT INTO `nh_open_myvideo` VALUES ('57', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB14_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB14.jpg', '5', '动画14', null, '2016-12-23 22:11:45');
INSERT INTO `nh_open_myvideo` VALUES ('58', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB15_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB15.jpg', '5', '动画15', null, '2016-12-23 22:11:45');
INSERT INTO `nh_open_myvideo` VALUES ('59', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB16_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB16.jpg', '5', '动画16', null, '2016-12-23 22:11:45');
INSERT INTO `nh_open_myvideo` VALUES ('60', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB17_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB17.jpg', '5', '动画17', null, '2016-12-23 22:11:45');
INSERT INTO `nh_open_myvideo` VALUES ('61', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB18_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB18.jpg', '5', '动画18', null, '2016-12-23 22:11:46');
INSERT INTO `nh_open_myvideo` VALUES ('62', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB19_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB19.jpg', '5', '动画19', null, '2016-12-23 22:11:46');
INSERT INTO `nh_open_myvideo` VALUES ('63', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB20_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB20.jpg', '5', '动画20', null, '2016-12-23 22:11:46');
INSERT INTO `nh_open_myvideo` VALUES ('64', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB21_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB21.jpg', '5', '动画21', null, '2016-12-23 22:11:46');
INSERT INTO `nh_open_myvideo` VALUES ('65', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB22_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB22.jpg', '5', '动画22', null, '2016-12-23 22:11:46');
INSERT INTO `nh_open_myvideo` VALUES ('66', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB23_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB23.jpg', '5', '动画23', null, '2016-12-23 22:11:46');
INSERT INTO `nh_open_myvideo` VALUES ('67', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB24_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB24.jpg', '5', '动画24', null, '2016-12-23 22:11:46');
INSERT INTO `nh_open_myvideo` VALUES ('68', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB25_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB25.jpg', '5', '动画25', null, '2016-12-23 22:11:46');
INSERT INTO `nh_open_myvideo` VALUES ('69', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB26_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB26.jpg', '5', '动画26', null, '2016-12-23 22:11:46');
INSERT INTO `nh_open_myvideo` VALUES ('70', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB27_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB27.jpg', '5', '动画27', null, '2016-12-23 22:11:46');
INSERT INTO `nh_open_myvideo` VALUES ('71', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB28_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB28.jpg', '5', '动画28', null, '2016-12-23 22:11:46');
INSERT INTO `nh_open_myvideo` VALUES ('72', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E5%86%B0%E7%82%B9%E9%9C%87%E6%92%BC%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E5%86%B0%E7%82%B9%E9%9C%87%E6%92%BC%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.jpg', '1', '冰点震撼（无字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('73', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB29_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB29.jpg', '5', '动画29', null, '2016-12-23 22:05:16');
INSERT INTO `nh_open_myvideo` VALUES ('74', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB30_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB30.jpg', '5', '动画30', null, '2016-12-23 22:05:16');
INSERT INTO `nh_open_myvideo` VALUES ('75', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB31_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB31.jpg', '5', '动画31', null, '2016-12-23 22:05:16');
INSERT INTO `nh_open_myvideo` VALUES ('76', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/%E5%8A%A8%E7%94%BB32_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/5s/%E5%8A%A8%E7%94%BB32.jpg', '5', '动画32', null, '2016-12-23 22:05:16');
INSERT INTO `nh_open_myvideo` VALUES ('78', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E5%86%B0%E7%82%B9%E9%9C%87%E6%92%BC%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E5%86%B0%E7%82%B9%E9%9C%87%E6%92%BC%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.jpg', '1', '冰点震撼（有字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('79', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E9%A3%9E%E9%BE%99%E5%9C%A8%E5%A4%A9%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E9%A3%9E%E9%BE%99%E5%9C%A8%E5%A4%A9%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.jpg', '1', '飞龙在天（无字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('80', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E9%A3%9E%E9%BE%99%E5%9C%A8%E5%A4%A9%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E9%A3%9E%E9%BE%99%E5%9C%A8%E5%A4%A9%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.jpg', '1', '飞龙在天（有字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('81', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E6%BF%80%E6%83%85%E6%BB%A1%E6%80%80%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E6%BF%80%E6%83%85%E6%BB%A1%E6%80%80%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.jpg', '1', '激情满怀（无字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('82', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E6%BF%80%E6%83%85%E6%BB%A1%E6%80%80%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E6%BF%80%E6%83%85%E6%BB%A1%E6%80%80%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.jpg', '1', '激情满怀（有字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('83', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E9%87%91%E8%89%B2%E7%B2%92%E5%AD%90%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E9%87%91%E8%89%B2%E7%B2%92%E5%AD%90%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.jpg', '1', '金色粒子（无字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('84', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E9%87%91%E8%89%B2%E7%B2%92%E5%AD%90%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E9%87%91%E8%89%B2%E7%B2%92%E5%AD%90%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.jpg', '1', '金色粒子（有字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('85', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E6%A2%A6%E5%90%AF%E8%88%AA%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E6%A2%A6%E5%90%AF%E8%88%AA%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.jpg', '1', '梦启航（无字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('86', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E6%A2%A6%E5%90%AF%E8%88%AA%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E6%A2%A6%E5%90%AF%E8%88%AA%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.jpg', '1', '梦启航（有字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('87', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E6%A2%A6%E5%89%8D%E8%A1%8C%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E6%A2%A6%E5%89%8D%E8%A1%8C%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.jpg', '1', '梦前行（无字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('88', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E6%A2%A6%E5%89%8D%E8%A1%8C%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E6%A2%A6%E5%89%8D%E8%A1%8C%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.jpg', '1', '梦前行（有字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('89', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E6%A2%A6%E6%83%B3%E5%92%8C%E5%B8%8C%E6%9C%9B%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E6%A2%A6%E6%83%B3%E5%92%8C%E5%B8%8C%E6%9C%9B%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.jpg', '1', '梦想和希望（无字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('90', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E6%A2%A6%E6%83%B3%E5%92%8C%E5%B8%8C%E6%9C%9B%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E6%A2%A6%E6%83%B3%E5%92%8C%E5%B8%8C%E6%9C%9B%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.jpg', '1', '梦想和希望（有字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('91', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E7%A2%B0%E6%92%9E%E7%9A%84%E8%8A%B1%E7%81%AB%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E7%A2%B0%E6%92%9E%E7%9A%84%E8%8A%B1%E7%81%AB%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.jpg', '1', '碰撞的花火（无字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('92', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E7%A2%B0%E6%92%9E%E7%9A%84%E8%8A%B1%E7%81%AB%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E7%A2%B0%E6%92%9E%E7%9A%84%E8%8A%B1%E7%81%AB%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.jpg', '1', '碰撞的花火（有字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('93', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E6%88%91%E4%BB%AC%E7%9A%84%E6%97%B6%E4%BB%A3%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89+_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E6%88%91%E4%BB%AC%E7%9A%84%E6%97%B6%E4%BB%A3%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.jpg', '1', '我们的时代（无字） ', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('94', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E6%88%91%E4%BB%AC%E7%9A%84%E6%97%B6%E4%BB%A3%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E6%88%91%E4%BB%AC%E7%9A%84%E6%97%B6%E4%BB%A3%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.jpg', '1', '我们的时代（有字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('95', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E4%B8%80%E8%B7%AF%E5%A5%8B%E8%BF%9B%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E4%B8%80%E8%B7%AF%E5%A5%8B%E8%BF%9B%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.jpg', '1', '一路奋进（无字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('96', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E4%B8%80%E8%B7%AF%E5%A5%8B%E8%BF%9B%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E4%B8%80%E8%B7%AF%E5%A5%8B%E8%BF%9B%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.jpg', '1', '一路奋进（有字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('97', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E4%B8%80%E8%B7%AF%E5%90%91%E5%89%8D%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E4%B8%80%E8%B7%AF%E5%90%91%E5%89%8D%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.jpg', '1', '一路向前（无字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('98', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E4%B8%80%E8%B7%AF%E5%90%91%E5%89%8D%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89+_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E4%B8%80%E8%B7%AF%E5%90%91%E5%89%8D%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.jpg', '1', '一路向前（有字） ', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('99', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E8%BF%8E%E6%88%98%E5%B7%85%E5%B3%B0%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E8%BF%8E%E6%88%98%E5%B7%85%E5%B3%B0%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.jpg', '1', '迎战巅峰（无字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('100', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E8%BF%8E%E6%88%98%E5%B7%85%E5%B3%B0%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E8%BF%8E%E6%88%98%E5%B7%85%E5%B3%B0%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.jpg', '1', '迎战巅峰（有字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('101', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E5%B1%95%E6%9C%9B%E6%9C%AA%E6%9D%A5%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E5%B1%95%E6%9C%9B%E6%9C%AA%E6%9D%A5%EF%BC%88%E6%97%A0%E5%AD%97%EF%BC%89.jpg', '1', '展望未来（无字）', null, null);
INSERT INTO `nh_open_myvideo` VALUES ('102', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/%E5%B1%95%E6%9C%9B%E6%9C%AA%E6%9D%A5%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89_h264.mp4', 'http://nhds.oss-cn-hangzhou.aliyuncs.com/default/openceremony/video/kc/pic/%E5%B1%95%E6%9C%9B%E6%9C%AA%E6%9D%A5%EF%BC%88%E6%9C%89%E5%AD%97%EF%BC%89.jpg', '1', '展望未来（有字）', null, null);
