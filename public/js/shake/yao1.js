function yao(){
	var that;
}

yao.prototype = {
	i:0,
	width:"",
	height:"",
	init:function(){
		that = this;
		that.click();
		
	},
	setCont:function(text){
		var cont="";
		cont+="<div class='zhe'></div>";
		cont+="<span class='span'></span>";
		$(".yaocont").html(cont);
		if(text){
			$(".span").html(text);
		}else{
			$(".span").html("讯鸟年会盛典");
		}
		that.getData();
	},
	getData:function(){
		var width = $(".span").width();
		var height = $(".span").height();
		that.width = width;
		var height = height +20;
		that.height = height;
		//that.click(width);
		$(".ybody").css("width",that.width);
		$(".yaocont").css("width",that.width);
		$(".yaocont").css("height",that.height);
		$(".zhe").css("width",that.width);
		$(".zhe").css("height",that.height);
		that.move();
	},
	click:function(){
		$("#preview").click(function(){
			
			$(".yaocont").html("");
			var text = $(".uploadCont").val(); 
			if(text){
				that.setCont(text);
				that.getData();
			}else{
				that.setCont();
			}
			
			//console.log();
		})
	},
	updataStyle:function(width,i){
		var wid = width-i;
		$(".zhe").css("width",wid);
		$(".zhe").css("left",i);
		var bai = Math.round(i*100 / width);
		$(".bai").html(bai+"%");
	
	},
	move:function(){
		if(that.i>that.width){
			$(".zhe").css("width","");
			return;
		}
		if(that.i/that.width<=1){
			setTimeout("that.move()",10)
			that.updataStyle(that.width,that.i);
		    that.i++;
			
		}
	}
}
$(function() {
	var obj = new yao();
		obj.init();
})