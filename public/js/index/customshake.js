/**
 * Created by zhou on 2017/3/21.
 */
$().ready(function(){
    customCont.init();
})
customCont = new Vue({
    el: ".customCont",
    data: {
        customBg:"/img/open/custombg,jpg",
        progressColor:"white",
        inputText:"讯鸟年度盛会",
        textColor:"white",
        logo:"/img/newlogo.png",
        inputVal:"1",
        SpeedData:{
            i:"0",
            width:"380",
            timer:"0",
        },
        TextData:{
            TextOpacity:"0",
            TextTimer:"0"
        },
        ImgData:{
            ImgOpacity:"0",
            ImgTimer:"0"
        }
    },
    methods: {
        init:function () {
            this.RedioEvent();
            this.CancelEvent();
            this.PrevView();
            this.UploadImg();
            this.ChoiceColor();
            this.SaveData();
            if($("#custom_bg").val()){
                this.ReData();
            }
            this.CheckedEvent(customCont.inputVal);
        },
        ChoiceColor:function () {
            $('#picker').colpick({
                layout:'hex',
                submit:0,
                onChange:function (hsb,hex,rgb,el) {
                    $(el).find("div[class='customIn_block']").css('background-color', '#'+hex);
                    customCont.progressColor = '#'+hex;
                }
            });
            $('#pickerText').colpick({
                layout:'hex',
                submit:0,
                onChange:function (hsb,hex,rgb,el) {
                    $(el).find("div[class='customIn_block']").css('background-color', '#'+hex);
                    customCont.textColor = '#'+hex;
                }
            });
        },
        RedioEvent:function () {
            $(".cuRadio").click(function () {
                var input = $(this).parent().find("input[type='radio']");
                if(input.is(':checked')==false){
                    input.prop('checked',true);
                    customCont.inputVal = input.val();
                    customCont.CheckedEvent(customCont.inputVal);
                }
            })
        },
        CheckedEvent:function (val) {
            switch (val)
            {
                case "1":
                    $("#picker").parent().find("div[class='pickZhe']").hide();
                    $("#pickerText").parent().find("div[class='pickZhe']").show();
                    $(".inputText").attr("readonly","readonly");
                    $(".inputText").css({border:"1px solid #dcdddd",color:"#dcdddd"});
                    $(".upBtn").css({color: "white",background: "#EFEFEF",border: "1px solid #EFEFEF"});
                    $(".upBtn").unbind("click");

                    $("#picker").parent().parent().removeClass("colorh");
                    $(".inputText").parent().addClass("colorh");
                    $(".upBtn").parent().addClass("colorh");
                    break;
                case "2":
                    $("#picker").parent().find("div[class='pickZhe']").show();
                    $("#pickerText").parent().find("div[class='pickZhe']").hide();
                    $(".inputText").removeAttr("readonly");
                    $(".inputText").css({border:"1px solid #AAA",color:"#595957"});
                    $(".upBtn").css({color: "white",background: "#EFEFEF",border: "1px solid #EFEFEF"});
                    $("#picker").parent().parent().addClass("colorh");
                    $(".inputText").parent().removeClass("colorh");
                    $(".upBtn").parent().addClass("colorh");
                    $(".upBtn").unbind("click");
                    break;
                case "3":
                    $("#picker").parent().find("div[class='pickZhe']").show();
                    $("#picker").parent().parent().css("color","#ddd");
                    $("#pickerText").parent().find("div[class='pickZhe']").show();
                    $(".inputText").attr("readonly","readonly");
                    $(".inputText").css({border:"1px solid #dcdddd",color:"#dcdddd"});
                    $(".upBtn").css({color: "#595957",background: "#DCDDDD",border: "1px solid #DCDDDD"});
                    $("#picker").parent().parent().addClass("colorh");
                    $(".inputText").parent().addClass("colorh");
                    $(".upBtn").parent().removeClass("colorh");
                    customCont.UploadImg();
                    break;
                default:
                    $("#picker").parent().find("div[class='pickZhe']").show();
                    $("#pickerText").parent().find("div[class='pickZhe']").show();
                    $(".inputText").attr("readonly","readonly");
                    $(".inputText").css({border:"1px solid #dcdddd",color:"#dcdddd"});
                    $(".upBtn").css({color: "white",background: "#EFEFEF",border: "1px solid #EFEFEF"});

                    $("#picker").parent().parent().addClass("colorh");
                    $(".inputText").parent().addClass("colorh");
                    $(".upBtn").parent().addClass("colorh");
            }
        },
        CancelEvent:function () {
            $(".cancel").click(function () {
                var sequence = $("#sequence").val();
                window.location.href = "/application/index/shake?sequence="+sequence;
            })
        },
        ShakeMove:function () {
            if(customCont.SpeedData.i > customCont.SpeedData.width){
                return customCont.SpeedData.i = 0;
            }
            if(customCont.SpeedData.i / customCont.SpeedData.width <= 1){
                customCont.SpeedData.timer = setTimeout("customCont.ShakeMove()",10)
                customCont.shakeAdd(customCont.SpeedData.i);
                customCont.SpeedData.i++;
            }
        },
        shakeAdd:function (i) {
            $(".customYao").css("width",i);
            var bai = Math.round(i*100 / customCont.SpeedData.width);
            $(".customLoading").html(bai+"%");
        },
        TextOpacity:function (x) {
            $(".textCont").css("opacity",x/100);
            var bai = Math.round(x * 100 / 100);
            $(".textLoading").html(bai+"%");
        },
        TextTimer:function () {
            if(customCont.TextData.TextOpacity > 100){
                return customCont.TextData.TextOpacity = 0;
            }
            if(customCont.TextData.TextOpacity / 100 <= 1){
                customCont.TextData.TextTimer = setTimeout("customCont.TextTimer()",10)
                customCont.TextOpacity(customCont.TextData.TextOpacity);
                customCont.TextData.TextOpacity++;
            }
        },
        ImgOpacity:function (y) {
            $(".imgSrc").css("opacity",y/100);
            var bai = Math.round(y * 100 / 100);
            $(".imgLoading").html(bai+"%");
        },
        ImgTimer:function () {
            if(customCont.ImgData.ImgOpacity > 100){
                return customCont.ImgData.ImgOpacity = 0;
            }
            if(customCont.ImgData.ImgOpacity / 100 <= 1){
                customCont.ImgData.ImgTimer = setTimeout("customCont.ImgTimer()",10)
                customCont.ImgOpacity(customCont.ImgData.ImgOpacity);
                customCont.ImgData.ImgOpacity++;
            }
        },
        PrevView:function () {
            $("#preview").click(function () {
                customCont.clearTimeout();
                switch (customCont.inputVal)
                {
                    case "1":
                        customCont.ShakeMove();
                        break;
                    case "2":
                        customCont.TextTimer();
                        break;
                    case "3":
                        customCont.ImgTimer();
                        break;
                    default:
                }
            })
        },
        clearTimeout:function () {
            clearTimeout(customCont.SpeedData.timer);
            clearTimeout(customCont.TextData.TextTimer);
            clearTimeout(customCont.ImgData.ImgTimer);
        },
        UploadImg:function () {
            $(".customBtn").click(function () {
                $(".uploadZhe").show();
                uploadPic.init(1);
            })
            $(".uploadC").click(function () {
                $("#uploadPicFile").click();
            })
            $(".upBtn").click(function () {
                $(".uploadZhe").show();
                uploadPic.init(2);
            })
        },
        SaveData:function () {
            $("#saveData").click(function () {
                var sequence = $("#sequence").val();
                var customBgSrc = $(".customLeft").css("background-image").replace('url("',"").replace('")',"");
                var speedColor = $("#picker .customIn_block").css("background-color");
                var inputChecked = $(".cuInput:checked").val();
                var inputText = $(".inputText").val();
                var textColor = $("#pickerText .customIn_block").css("background-color");
                var imgSrc = $(".imgSrc").attr("src");
                $.ajax({
                    type:'POST',
                    url: "/application/index/customSave",
                    datatype:"JSON",
                    data:{
                        "sequence":sequence,
                        "custom_bg":customBgSrc,
                        "custom_pattern":inputChecked,
                        "custom_color":speedColor,
                        "shake_text":inputText,
                        "shake_text_color":textColor,
                        "shake_img_url":imgSrc
                    },
                    success: function(ret){
                        ret=JSON.parse(ret);
                        if(ret.result==0){
                            var callback =function(){
                                window.location = "/application/index/shake?sequence="+sequence;
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
        ReData:function () {
            customCont.customBg = $("#custom_bg").val();
            customCont.progressColor = $("#custom_color").val();
            customCont.inputText = $("#shake_text").val();
            customCont.textColor = $("#shake_text_color").val();
            customCont.logo = $("#shake_img_url").val();
            customCont.inputVal = $("#custom_pattern").val();
            $(".customLeft").css("background-image","url("+customCont.customBg+")");
        }
    }
})