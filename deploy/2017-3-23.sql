ALTER TABLE `nh_open_myvideo`
ADD COLUMN `video_id`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '视频编号' AFTER `id`;

ALTER TABLE `nh_open_myvideo`
ADD COLUMN `preview_url`  varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '预览地址' AFTER `video_url`;


CREATE TABLE `nh_video_material` (
`id`  int NOT NULL ,
`video_id`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '视频编号' ,
`dl_url`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '资源包地址' ,
PRIMARY KEY (`id`)
)
;

ALTER TABLE `nh_video_material`
ADD COLUMN `insert_dt`  timestamp NULL ON UPDATE CURRENT_TIMESTAMP AFTER `dl_url`;

ALTER TABLE `nh_video_material`
MODIFY COLUMN `id`  int(11) NOT NULL AUTO_INCREMENT FIRST ;

ALTER TABLE `nh_video_material`
MODIFY COLUMN `dl_url`  varchar(1001) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '资源包地址' AFTER `video_id`;

