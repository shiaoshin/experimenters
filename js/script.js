$(function(){
	/* Initialize */
	$('#navTip a').tooltip({placement:"bottom"});//ToolTip.js
	$('.carousel').carousel({interval:7000})//Carousel.js
	
	/* Global Variables*/
	var scrollTop = 0;
	var scrollTick = 0;
	var backScroll = 0;
	var scrollAbs = 0;
	
	/* Turn off Elements */
	var ani_title = $('#animation .col-sm-12');

	var ani_g_build = $('#animation .graphic.build');
	var ani_g_branch = $('#animation .graphic.branch');
	var ani_g_seek = $('#animation .graphic.seek');
	var ani_g_ar_1 = $('#animation .graphic.arr_1');
	var ani_g_ar_2 = $('#animation .graphic.arr_2');
	var ani_g_ar_3 = $('#animation .graphic.arr_3');
	var ani_g_fork = $('#animation .graphic.fork');
	var ani_g_recipe_1 = $('#animation .graphic.recipe.exp');
	var ani_g_recipe_2 = $('#animation .graphic.recipe.share:nth-of-type(1)');
	var ani_g_recipe_3 = $('#animation .graphic.recipe.share:nth-of-type(2)');

	var ani_t_recipe = $('#animation .txt.recipe');	
	var ani_t_build_a = $('#animation .txt.build div:nth-of-type(1)');
	var ani_t_build_b = $('#animation .txt.build div:nth-of-type(2)');
	var ani_t_branch_a = $('#animation .txt.branch div:nth-of-type(1)');
	var ani_t_branch_b = $('#animation .txt.branch div:nth-of-type(2)');
	var ani_t_seek_a = $('#animation .txt.seek div:nth-of-type(1)');
	var ani_t_seek_b = $('#animation .txt.seek div:nth-of-type(2)');
	
	var ani_all = [ani_title,ani_g_build,ani_g_branch,ani_g_seek,ani_g_ar_1,ani_g_ar_2,ani_g_ar_3,ani_g_fork,ani_g_recipe_1,ani_g_recipe_2,ani_g_recipe_3,ani_t_recipe,ani_t_build_a,ani_t_build_b,ani_t_branch_a,ani_t_branch_b,ani_t_seek_a,ani_t_seek_b];
	
	function bulkAction(arr,act,speed) {
		if(act == "hide"){
			for( i in arr){ arr[i].stop(true,true).hide(speed); }
		}else if(act == "show"){
			for( i in arr){	arr[i].show(speed);	}			
		}else if(act == "fadeIn"){
			for( i in arr){	arr[i].fadeIn(speed); }
		}else if(act == "fadeOut"){
			for( i in arr){	arr[i].fadeOut(speed); }
		}
	}
	bulkAction(ani_all,"hide",0);
	
	/* Scroll Anchors */
	var a1 = $('.anchor:nth-of-type(1)').position();
	var a2 = $('.anchor:nth-of-type(2)').position();
	var a3 = $('.anchor:nth-of-type(3)').position();
	var a4 = $('.anchor:nth-of-type(4)').position();
	var a5 = $('.anchor:nth-of-type(5)').position();
	var a6 = $('.anchor:nth-of-type(6)').position();
	var a7 = $('.anchor:nth-of-type(7)').position();
	var a8 = $('#meetup').position();
	var upLimit = a1.top;
	var lowLimit = a8.top;
	
	$(window).resize(function(){
		a1 = $('.anchor:nth-of-type(1)').position();
		a2 = $('.anchor:nth-of-type(2)').position();
		a3 = $('.anchor:nth-of-type(3)').position();
		a4 = $('.anchor:nth-of-type(4)').position();
		a5 = $('.anchor:nth-of-type(5)').position();
		a6 = $('.anchor:nth-of-type(6)').position();
		a7 = $('.anchor:nth-of-type(7)').position();
		a8 = $('#meetup').position();
		upLimit = a1.top;
		lowLimit = a8.top;
	});
	
	/* Section Builder */
	function section(name,height,upper,lower){
		this.name = name;
		
		var pos = $(name).position();
		var h = $(name).height();
		
		this.height = h;
		this.upper = pos.top
		this.lower = pos.top+h;
	}
	var sec_preface = new section("#preface");
	var sec_definition = new section("#definition");
	var sec_threeMode = new section("#threeMode");
	var sec_meetup = new section("#meetup");
	var sec_objective = new section("#objective");
	var sec_pitch = new section("#pitch");
	var sec_search = new section("#search");
	var sec_make = new section("#make");
	var sec_journal = new section("#journal");
	var sec_value = new section("#value");
	
	$(window).scroll(function(){
		
		/* 0. Get window position */
		scrollTick = $(window).scrollTop() - scrollTop;
		scrollTop = $(window).scrollTop();
		
		/* 1. Animation */
		//// Hide All ////
		if(scrollTop >= lowLimit || scrollTop <= upLimit) {
			bulkAction(ani_all,"hide",0);
		}
		
		//// Title ////
		if(scrollTop >= a1.top && scrollTop <= a7.top){
			ani_title.fadeIn(1000);
		}else{
			ani_title.fadeOut(1000);
		}
		
		//// Recipe Txt ////
		if(scrollTop >= a2.top && scrollTop <= a3.top){
			ani_t_recipe.fadeIn(500);
		}else{
			ani_t_recipe.fadeOut(500);
		}
		
		//// Recipe ////
		if(scrollTop >= a2.top && scrollTop <= a6.top){
			if(ani_g_recipe_1.text() == "Experiment"){
				ani_g_recipe_1.fadeIn(500,function(){
					ani_g_recipe_1.fadeOut(500,function(){
						ani_g_recipe_1.text("Recipe").fadeIn(500);
					});
				});
			}
		}else{
			ani_g_recipe_1.fadeOut(500,function(){
				ani_g_recipe_1.text("Experiment");
			});
		}
		
		//// 3 Modes_graph ////
		var ani_g_3m = [ani_g_build,ani_g_seek,ani_g_branch];
		if(scrollTop >= a3.top && scrollTop <= a7.top){
			ani_g_build.fadeIn(500,function(){
				ani_g_seek.fadeIn(500,function(){
					ani_g_branch.fadeIn(500);
				});
			});
		}else{
			bulkAction(ani_g_3m,"fadeOut",500);
		}
		
		//// Arrows_graph ////
		var ani_g_ar = [ani_g_ar_1,ani_g_ar_2,ani_g_ar_3];
		if(scrollTop >= a3.top && scrollTop <= a6.top){
			ani_g_ar_1.fadeIn(500,function(){
				ani_g_ar_3.fadeIn(500,function(){
					ani_g_ar_2.fadeIn(500);
				});
			});
		}else{
			bulkAction(ani_g_ar,"fadeOut",500);
		}
		
		//// 3 Modes_text_A ////
		var ani_t_3m_a = [ani_t_build_a,ani_t_seek_a,ani_t_branch_a];
		if(scrollTop >= a3.top && scrollTop <= a4.top){
			ani_t_build_a.fadeIn(500,function(){
				ani_t_seek_a.fadeIn(500,function(){
					ani_t_branch_a.fadeIn(500);
				});
			});			
		}else{
			bulkAction(ani_t_3m_a,"fadeOut",500);
		}
		
		//// 3 Modes_text_B ////
		var ani_t_3m_b = [ani_t_build_b,ani_t_seek_b,ani_t_branch_b];
		if(scrollTop >= a5.top && scrollTop <= a7.top){
			ani_t_build_b.fadeIn(500,function(){
				ani_t_seek_b.fadeIn(500,function(){
					ani_t_branch_b.fadeIn(500);
				});
			});			
		}else{
			bulkAction(ani_t_3m_b,"fadeOut",500);
		}
		
		//// Fork ////
		if(scrollTop >= a6.top && scrollTop <= a7.top){
			ani_g_fork.fadeIn(500);
			ani_g_recipe_2.fadeIn(500,function(){
				ani_g_recipe_2.animate({top:'20%',left:'65%'},500);
			})
			ani_g_recipe_3.fadeIn(500,function(){
				ani_g_recipe_3.animate({top:'65%',left:'65%'},500);
			})
		}else{
			ani_g_recipe_2.hide(0,function(){
				ani_g_recipe_2.css({top:'43%',left:'25%'})
			});
			ani_g_recipe_3.hide(0,function(){
				ani_g_recipe_3.css({top:'43%',left:'25%'})
			});
			ani_g_fork.fadeOut(500);
		}
		
		/* 2. Parallax Effects */
		if(scrollTop >= sec_preface.upper && scrollTop <= sec_preface.lower+500){
			/* var */ scrollAbs = Math.round((scrollTop - sec_preface.upper)/sec_preface.height*100);
			//var scrollRel = Math.round(scrollTick/sec_preface.height*100);
			//alert("scrollAbs= "+scrollAbs+"\nscrollRel= "+scrollRel);
			backScroll = "50% "+scrollAbs+"%";
			//backScroll = "50% "+Math.round(-scrollTop/7.5)+"px";
			$(sec_preface.name).css("background-position",backScroll);
		}
		if(scrollTop >= sec_definition.upper-500 && scrollTop <= sec_definition.lower+500){
			scrollAbs = Math.round((scrollTop - sec_definition.upper)/sec_definition.height*100);
			backScroll = "50% "+scrollAbs/2+"%";
			$(sec_definition.name).css("background-position",backScroll);
		}
		if(scrollTop >= sec_threeMode.upper-500 && scrollTop <= sec_threeMode.lower+500){
			scrollAbs = Math.round((scrollTop - sec_threeMode.upper)/sec_threeMode.height*100);
			backScroll = "50% "+scrollAbs+"%";
			$(sec_threeMode.name).css("background-position",backScroll);
		}
		if(scrollTop >= sec_meetup.upper-500 && scrollTop <= sec_meetup.lower+500){
			scrollAbs = Math.round((scrollTop - sec_meetup.upper)/sec_meetup.height*100);
			backScroll = "50% "+scrollAbs/2+"%";
			$(sec_meetup.name).css("background-position",backScroll);
		}
		if(scrollTop >= sec_objective.upper-500 && scrollTop <= sec_objective.lower+500){
			scrollAbs = Math.round((scrollTop - sec_objective.upper)/sec_objective.height*100);
			backScroll = "50% "+scrollAbs/1.8+"%";
			$(sec_objective.name).css("background-position",backScroll);
		}
		if(scrollTop >= sec_pitch.upper && scrollTop <= sec_pitch.lower+500){
			scrollAbs = Math.round((scrollTop - sec_pitch.upper)/sec_pitch.height*100);
			backScroll = "50% "+scrollAbs+"%";
			$(sec_pitch.name).css("background-position",backScroll);
		}
		if(scrollTop >= sec_search.upper && scrollTop <= sec_search.lower+500){
			scrollAbs = Math.round((scrollTop - sec_search.upper)/sec_search.height*100);
			backScroll = "50% "+scrollAbs+"%";
			$(sec_search.name).css("background-position",backScroll);
		}
		if(scrollTop >= sec_make.upper && scrollTop <= sec_make.lower+500){
			scrollAbs = Math.round((scrollTop - sec_make.upper)/sec_make.height*100);
			backScroll = "50% "+scrollAbs+"%";
			$(sec_make.name).css("background-position",backScroll);
		}
		if(scrollTop >= sec_journal.upper && scrollTop <= sec_journal.lower+500){
			scrollAbs = Math.round((scrollTop - sec_journal.upper)/sec_journal.height*100);
			backScroll = "50% "+scrollAbs+"%";
			$(sec_journal.name).css("background-position",backScroll);
		}
		/*if(scrollTop >= sec_value.upper && scrollTop <= sec_value.lower){
			scrollAbs = Math.round((scrollTop - sec_value.upper)/sec_value.height*100);
			backScroll = "50% "+scrollAbs+"%";
			$(sec_value.name).css("background-position",backScroll);
		}//not working...why?*/
	});
});