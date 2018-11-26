shakeB = new Vue({
	el:"#shbody",
	data:{
		shakeUrl:$("#loading").val(),
		num:"50"
	},
})

var shakeEvent = {
    init:function () {
        this.AudioEvent();
        this.ReSetData();
        this.HrefEvent();
        this.MusicRadioEvent();
    },
    AudioEvent:function () {
        $(".audioPlay").click(function () {
            var play = $(this).next('audio')[0];
            if($(this).hasClass("up")) {
                shakeEvent.StopMusic();
                $(this).removeClass("up");
                play.load();
                play.play();
                $(this).addClass("down");
            } else if($(this).hasClass("down")) {
                $(this).removeClass("down");
                play.pause();
                $(this).addClass("up");
            }
        })
    },
    StopMusic:function () {
        $('.audioPlay').each(function() {
            var pause = $(this).next('audio')[0];
            pause.pause();
            $(this).removeClass("down");
            $(this).addClass("up");
        });
    },
    ReSetData:function () {
        $(".musicRadio").each(function () {
            var val = $(this).find("input[type='radio']").val();
            var musicVal = $("#music_idd").val();
            if(val == musicVal){
                $(this).find("input[type='radio']").attr("checked",'checked');
            }
        })
    },
    HrefEvent:function () {
        $(".uploadCont").click(function () {
            var sequence = $("#sequence").val();
            window.location = "/application/index/customshake?sequence="+sequence;
        })
    },
    MusicRadioEvent:function () {
        $(".msRadio").click(function(){
            var input = $(this).parent().find("input");
            if(input.is(':checked')==false){
                $(".msRadio").removeAttr("checked");
                input.prop('checked',true);
            }
        })
    },
	UploadMusicSave:function () {
		var music_name = $(".width130").find("span").text();
		var music_url = $(".width130").find("audio").attr("src");
		var sequence = $("#sequence").val();
		var music_id = $(".width130").find("input").val();
		if(music_name && music_url){
            $.ajax({
                type: 'POST',
                url: "/application/index/musicSave",
                datatype: "JSON",
                data: {
                    "sequence": sequence,
                    "music_url": music_url,
                    "music_name": music_name,
					"music_id":music_id
                },
                success: function (ret) {
                	console.log(ret,"保存上传音乐");
                }
            })
		}
    }

}

function shake(){
	var that;
}
shake.prototype = {
	init:function(){
		that = this;
		this.bindEvent();
		this.save();
	},
	bindEvent:function(){
		var endcode = 0;
		$("#shakeNum").on("input",function (event) {
			var tx = event.srcElement || event.target;
			var start = tx.setSelectionRange?tx.selectionStart:1;
			event.target.value = event.target.value.replace(/[\u4e00-\u9fa5]/g,'');
			event.target.value = event.target.value.replace(/^0/g, '');
			event.target.value = event.target.value.replace(/[^\d]/g,'');
			var end = tx.setSelectionRange?tx.selectionStart:1;
			endcode = end;
			if(start<end){
				tx.setSelectionRange(start,start);
			}
		})

		$(".shRadio").click(function(){
			var input = $(this).parent().find("input");
			if(input.is(':checked')==false){
				if(input.val() == 0){
					if($("#custom_bg").val() ){
                        $(".shRadio").removeAttr("checked");
                        input.prop('checked',true);
                        return;
					}else {
                        input.prop('checked',false);
                        return;
                    }
				}else {
                    $(".shRadio").removeAttr("checked");
                    input.prop('checked',true);
				}
	    	}
		});
        $("#uploadMusic").hover(function(){
            $(".music_bubble").show();
        },function(){
            $(".music_bubble").hide();
        });

		$(".shakeImg").hover(function(){
			$(this).find("div[class='shakeZhe']").show();
		},function(){
			$(this).find("div[class='shakeZhe']").hide();
		});
        $(".shakeImg, .shakeWImg").find("i").hover(function () {
            $(this).next('p').show();
        },function () {
            $(this).next('p').hide();
        });
		$(".shakeWImg").hover(function(){
			$(this).find("div[class='shakeWZhe']").show();
		},function(){
			$(this).find("div[class='shakeWZhe']").hide();
		});
		
		$("#One").click(function(){
			$("#shakeOne").show();
            var music_url = $("#checkMusic").val();
			shakeMove(music_url);
		})
		$(".cancel").click(function(){
			var sequence = $("#sequence").val();
			window.location = "/application/index/index?sequence="+sequence;
		})
		
		$("#WBtn").click(function(){
			var sequence = $("#sequence").val();
			var shake = $(this).parent().parent().parent();
			var shakeUrl = shake.find("div[class='shakeRadio'] input[name='shake']").val();
			var cover = $(this).parent().parent().find("img[name='cover']").attr("src");
			var name = shake.find("span").html();

			window.location = "/application/index/customone?sequence="+sequence+"&shakeUrl="+shakeUrl+"&name="+name+"&cover="+cover;
		})

		$("#customPre").click(function () {
            var custom_pattern = $("#custom_pattern").val();
            var music_url = $("#checkMusic").val();
            customShake.PrevView(custom_pattern,music_url);
        })

		$("#WBtnTwo").click(function(){
			var sequence = $("#sequence").val();
			var shake = $(this).parent().parent().parent();
			var shakeUrl = shake.find("div[class='shakeRadio'] input[name='shake']").val();
			var cover = $(this).parent().parent().find("img[name='cover']").attr("src");
			var name = shake.find("span").html();
			window.location = "/application/index/customtwo?sequence="+sequence+"&shakeUrl="+shakeUrl+"&name="+name+"&cover="+cover;
		})

		$("#customShake").click(function () {
            var sequence = $("#sequence").val();
            window.location = "/application/index/customShake?sequence="+sequence;
        })
	},
	save:function(){
		$("#submit").click(function(){
			if(shakeB.num <= 0){
				return;
			}
			var num = $("#shakeNum").val();
			var sequence = $("#sequence").val();
			var checked = $(".shakeRadio input[name='shake']:checked");
			var shakeUrl = checked.val();
			var shakeName = checked.parent().find("span").html();
			var shakeCover = checked.parent().parent().children().find("img[name='cover']").attr("src");
			var music_id = $(".musicRadio").find("input[name='shakeMusic']:checked").val();
            var music_url = $(".musicRadio").find("input[name='shakeMusic']:checked").parent().find("audio[class='musicAudio']").attr("src");
            var music_name = $(".musicRadio").find("input[name='shakeMusic']:checked").parent().find("span").text();

            shakeEvent.UploadMusicSave();
            $.ajax({
	            type:'POST',
	            url: "/application/index/shakeSave",
	            datatype:"JSON",
	            data:{
	            	"num":num,
					"sequence":sequence,
					"shakeUrl":shakeUrl,
					"shakeName":shakeName,
					"shakeCover":shakeCover,
					"music_id":music_id,
					"music_url":music_url,
					"music_name":music_name
	            },
	            success: function(ret){
	                ret=JSON.parse(ret);
	                if(ret.result==0){
	                	var callback =function(){
	                		window.location = "/application/index/index?sequence="+sequence;
	                	}
	                	popupalert('保存成功','message',callback);
	                }
	            },
	            error:function(e){
	            	var callback =function(){
                		window.location.reload();
                	}
                	popupalert('网络错误','error',callback);
	            }     
	    	});
		})
		
	},
	dataBack:function(){
		
	}
}

$(function(){
	var obj = new shake();
	obj.init();
    shakeEvent.init();
})
