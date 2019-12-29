$(function(){
	var $width = $(window).width(); //获取屏幕宽度
	$(".slider-pics img").width($width); //图片占满屏幕宽度
	$(".slider-circle").width($width); //轮播图导航也占满屏幕宽度
//左上角菜单按钮隐藏显示控制
	$("#menuBtn").on('click',function(){
		if(!$("#menuBtn").hasClass("open")){
			$("#menu").css({'display':'block','z-index':'10'});
			$("#menuBtn").addClass("open");
		}
		else{
			$("#menuBtn").removeClass("open");
			$("#menu").css({'display':'none'});
		}
	})
//轮播图
	function play(preIndex,currentIndex){ //参数是要切换的图片编号
		$('.slider-pics').eq(preIndex).fadeOut(500).parent().children().eq(currentIndex).fadeIn(1000);
		$('.slider-item').removeClass('slider-item-selected');//移除轮播导航小圆点被选中的类，被选中的小圆点是白色背景
		$('.slider-item').eq(currentIndex).addClass('slider-item-selected');//让当前小圆点被选中
	}
	//调用上一切换函数
	var currentIndex = 0;
	var length = $('.slider-pics').length;
	function pre(){
		var preIndex = currentIndex;
		currentIndex = (--currentIndex + length) % length;
		play(preIndex,currentIndex);
	}
	function next(){
		var preIndex = currentIndex;
		currentIndex = ++currentIndex % length;
		play(preIndex,currentIndex);
	}

	//定时器控制自动轮播
	var interval, hasStarted = false;
	function start(){
		if(!hasStarted){
			hasStarted = true;
			interval = setInterval(next,3000);//间隔3秒调用一次next
		}
	}
	function stop(){
		clearInterval(interval); //定时停止
		hasStarted = false;
	}
	start();

	//轮播图切换控制
	$('.slider-pics:not(:first)').hide();//隐藏第一张以外的图片
	$('.slider-item:first').addClass('slider-item-selected');//给第一张添加被选中类，小圆点背景变白色
	$('.slider-button').hide();//隐藏左右两侧按钮

	//鼠标移入移出图片时，定时、按钮显示控制
	$('.slider-pics, .slider-pre, .slider-next').hover(function(){
		//hover(mouseenter,mouseout) hover的两个参数，鼠标进入和鼠标移出
		stop();//鼠标进入，并滑过图片、左右两侧按钮时，清除定时
		$(".slider-button").show();//显示左右按钮
	},function(){
		//鼠标移出后，按钮隐藏，开始定时
		$('.slider-button').hide();
		start();
	})

	//导航小圆点控制
	$('.slider-item').hover(function(){
		stop();
		var preIndex = $(".slider-item").filter(".slider-item-selected").index();//筛选有被选中类的元素，获取编号
		currentIndex = $(this).index();//把鼠标移入的点编号赋值给currentIndex
		play(preIndex,currentIndex);
	},function(){
		start();
	});
    
    //左右两侧按钮绑定事件
	$('.slider-pre').on('click',function(){
		pre();
	})
	$('.slider-next').on('click',function(){
		next();
	})

})