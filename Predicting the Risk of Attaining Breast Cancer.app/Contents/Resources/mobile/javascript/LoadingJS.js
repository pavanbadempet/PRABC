var styleCss = "<style>"+
	"@keyframes loadingAnimate{from {-webkit-transform: rotateY(0deg);-o-transform: rotateY(0deg);-ms-transform: rotateY(0deg);-moz-transform: rotateY(0deg);transform: rotateY(0deg);}to {-webkit-transform: rotateY(-180deg);-o-transform: rotateY(-180deg);-ms-transform: rotateY(-180deg);-moz-transform: rotateY(-180deg);transform: rotateY(-180deg);}}"+
	"@-webkit-keyframes loadingAnimate{from {-webkit-transform: rotateY(0deg);-o-transform: rotateY(0deg);-ms-transform: rotateY(0deg);-moz-transform: rotateY(0deg);transform: rotateY(0deg);}to {-webkit-transform: rotateY(-180deg);-o-transform: rotateY(-180deg);-ms-transform: rotateY(-180deg);-moz-transform: rotateY(-180deg);transform: rotateY(-180deg);}}"+
	".loadingRun{-webkit-animation : loadingAnimate 1.2s infinite;animation : loadingAnimate 1.2s infinite;}</style>";
$("body").append(styleCss);

window.waitForLoading = true;
var LoadingJS = function(){
	this.initConfig();
	this.initHtml();
	this.initCss();
	this.startLoading();
	
	this.onResize();
	var self = this;
	$(window).resize(function(){
		self.onResize();
	});
	
	window.setTimeout(function(){window.waitForLoading = false;},250);
}

LoadingJS.prototype = {
	
	initHtml : function(){
		this.stop = false;
		this.loadImageUrl = "<svg t=\"1525916222299\" class=\"icon\" style=\"\" viewBox=\"130 0 800 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2478\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"49\" height=\"56\"><defs><style type=\"text/css\"></style></defs><path d=\"M835.55027 48.761905C876.805122 48.761905 910.222223 81.441158 910.222223 121.753604L910.222223 902.095C910.222223 902.095 910.222223 942.409011 876.805 975.238095L113.777778 975.238095 113.777778 24.380952 88.888889 48.761905 835.55027 48.761905ZM64 0 64 24.380952 64 1024L960 1024C835.55027 1024 904.277615 1024 960 969.325498L960 54.49204C960 54.49204 904.277615 0 835.55027 0L88.888889 0 64 0Z\" p-id=\"2479\"></path><path d=\"M775.164361 219.428572C788.910114 219.428572 800.05325 208.512847 800.05325 195.047619 800.05325 181.582391 788.910114 170.666667 775.164361 170.666667L263.111111 170.666667C249.365357 170.666667 238.222222 181.582391 238.222222 195.047619 238.222222 208.512847 249.365357 219.428572 263.111111 219.428572L775.164361 219.428572Z\" p-id=\"2481\"></path><path d=\"M775.164361 365.714285C788.910114 365.714285 800.05325 354.798562 800.05325 341.333333 800.05325 327.868105 788.910114 316.952382 775.164361 316.952382L263.111111 316.952382C249.365357 316.952382 238.222222 327.868105 238.222222 341.333333 238.222222 354.798562 249.365357 365.714285 263.111111 365.714285L775.164361 365.714285Z\" p-id=\"2482\"></path><path d=\"M775.164361 536.380951C788.910114 536.380951 800.05325 525.465229 800.05325 512 800.05325 498.534771 788.910114 487.619049 775.164361 487.619049L263.111111 487.619049C249.365357 487.619049 238.222222 498.534771 238.222222 512 238.222222 525.465229 249.365357 536.380951 263.111111 536.380951L775.164361 536.380951Z\" p-id=\"2483\"></path></svg>";
		this.instance = $("<div></div>");
		this.image = $("<img src='" + this.loadingPicture + "'/>");
		this.title = $("<p></p>");
		
		this.bg = $("<div style='transform:scale(1)'></div>");

		if(this.loadingPicture) this.instance.append(this.image);

		this.initAnimationHtml();

		this.instance.append(this.title);
		this.bg.append(this.instance);
		$("body").append(this.bg);
	},

	initAnimationHtml : function(){

		this.loadBox = $("<div></div>");
		var img1 = $(this.loadImageUrl);
		var img2 = $(this.loadImageUrl);	
		this.img3 = $(this.loadImageUrl);
		this.img3.attr("class", "loadingRun");

		this.loadBox.css({
			"position":"relative",
			"perspective":"200px",
			"-webkit-transform-style":"preserve-3d",
			"-o-transform-style":"preserve-3d",
			"-ms-transform-style":"preserve-3d",
			"-moz-transform-style":"preserve-3d",
			"transform-style":"preserve-3d"
		});

		this.img3.css({
			"position" : "absolute" ,
			"left" : "50%" ,
			"z-index" : "-1" ,
			"-webkit-transform-origin" : "0 50%",
			"-o-transform-origin" : "0 50%",
			"-ms-transform-origin" : "0 50%",
			"-moz-transform-origin" : "0 50%",
			"transform-origin" : "0 50%",
			"fill" : this.loadingCaptionColor
		});

		img2.css({
			"position" : "absolute" ,
			"left" : "-50%" ,
			"-webkit-transform":"rotateY(180deg)",
			"-o-transform":"rotateY(180deg)",
			"-ms-transform":"rotateY(180deg)",
			"-moz-transform":"rotateY(180deg)",
			"transform":"rotateY(180deg)",
			"fill" : this.loadingCaptionColor
		});
		
		img1.css({
			"position" : "absolute" ,
			"left" : "50%",
			"fill" : this.loadingCaptionColor
		});

		this.loadBox.append(img1).append(img2).append(this.img3);
		this.instance.append(this.loadBox);
	},

	initConfig : function(){
		  this.loadingCaption, this.loadingCaptionColor, this.loadingPicture;
		  try{
		  	this.loadingCaption = bookConfig.loadingCaption ? bookConfig.loadingCaption : "Loading";
		  	this.loadingCaptionColor = bookConfig.loadingCaptionColor ? bookConfig.loadingCaptionColor : "#DDDDDD";
		  	this.loadingBackground = bookConfig.loadingBackground ? bookConfig.loadingBackground : "#1F2232";
		  	this.loadingPicture = bookConfig.loadingPicture ? bookConfig.loadingPicture : "";
		  }catch(err){
		  	this.loadingCaption = "Loading";
		  	this.loadingCaptionColor = "#BDBDBD";
		  	this.loadingBackground = "#1F2233";
		  	this.loadingPicture = "";
		  }
	},
	
	startLoading : function(){
		this.title.text($(document).attr("title"));
	},
	
	destroy : function(){
		if(global.isIE8()||global.isIE9()){
			this.bg.animate({"opacity":"0"},0.6,function(){
				this.img3.attr("class", "");
				$("body>style").html("");
				this.bg.remove();
				this.image.attr("src", "");
				$("body").css({"background-color" : ""});
			}.bind(this));
		}else{
			animateOnce(this.bg , {"opacity":"0"} , 0.6 ,function(){
				this.img3.attr("class", "");
				$("body>style").html("");
				this.bg.remove();
				this.image.attr("src", "");
				$("body").css({"background-color" : ""});
			}.bind(this));
		}
		
	},
	
	initCss : function(){
		$("html").css({
			"margin" : 0,
			"padding" : 0,
			"width" : "100%",
			"height" : "100%"
		});

		$("body").css({
			"margin" : 0,
			"padding" : 0,
			"width" : "100%",
			"height" : "100%",
			"position" : "fixed",
			"background-color" : this.loadingBackground
		});

		this.bg.css({
			"margin" : 0,
			"padding" : 0,
			"width" : "100%",
			"height" : "100%",
			"position" : "fixed",
			"background-color" : this.loadingBackground
		});

		this.instance.css({
			"width" : "100%",
			"height" : "100%",
			"color" : this.loadingCaptionColor,
			"text-align" : "center",
			"vertical-align" : "middle",
			"font-family" : "Tahoma",
		    "position" : "relative",

		});

		this.image.css({
			"position" : "absolute",
			"bottom" : "75%",
			"left" : "50%",
			"-webkit-transform" : "translate(-50% , 50%)",
		    "-moz-transform" : "translate(-50% , 50%)",
		    "-ms-transform" : "translate(-50% , 50%)",
		    "-o-transform" : "translate(-50% , 50%)",
			"transform" : "translate(-50% , 50%)",
			"margin-bottom" : "28px",
			"max-width" : "40%",
			"max-height" : "30%"
		});
		
		if(window.innerHeight <= 300) this.image.hide();
		
		var titleTran = "translate(-50%, 16px)";
		var loadingBoxTran = "translate(-50% , -56px)";
		
		// if(this.loadingPicture) {
			// var titleTran = "translate(-50%, 40px)";
			// var loadingBoxTran = "translate(-50% , -50%)";
		// }

		this.title.css({
			"font-family":"Arial",
		  	"font-size" : "24px",
		  	"position" : "absolute",
		  	"top" : "50%",
		  	"left" : "50%",
		  	"-webkit-transform" : titleTran,
		    "-moz-transform" : titleTran,
		    "-ms-transform" : titleTran,
		    "-o-transform" : titleTran,
			"transform" : titleTran,
		  	"margin" : 0,
		  	"padding" : 0
		});

		this.loadBox.css({
			"position" : "absolute",
			"width" : "49px",
			"height" : "56px",
			"left" : "50%",
			"top" : "50%",
			"-webkit-transform" : loadingBoxTran,
		    "-moz-transform" : loadingBoxTran,
		    "-ms-transform" : loadingBoxTran,
		    "-o-transform" : loadingBoxTran,
			"transform" : loadingBoxTran,
		  	"padding" : 0
		});
	},
	
	onResize : function(){}

}

var jsLoadingBar = new LoadingJS();