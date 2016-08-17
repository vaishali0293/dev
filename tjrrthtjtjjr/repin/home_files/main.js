var isiOS = false;
var viewportSize;

var lastSlide = 1;
var slides = 5;
var run = 0;
var speed = [3000, 5400, 5400, 5400, 5400];
var workSlide = true;

function pageHeight() {
  var myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myHeight = window.innerHeight;
  } else if( document.documentElement && document.documentElement.clientHeight ) {
    //IE 6+ in 'standards compliant mode'
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && document.body.clientHeight) {
    //IE 4 compatible
    myHeight = document.body.clientHeight;
  }
	return myHeight;
}

function modoTeatro(val){
	var size = pageHeight();
	var where;
	if(val == true){
		$('#moduleSLIDER').animate({'height': size}, 750, 'easeInOutExpo');
		where = "#moduleSLIDER";
	} else if (val == false) {
		$('#moduleSLIDER').animate({'height': 541}, 450, 'easeInOutExpo');
		where = "#moduleTOP";
	}
    scrollWhere(where);
}

function scrollWhere(where){
		var target_offset = $(where).offset();
		var target_top = target_offset.top;
	    $('html, body').animate({scrollTop:target_top}, 500, 'easeInOutExpo');	
}

jQuery(document).ready(function($) {
								
	$('.sideText a').click(function(event){
		scrollWhere('#top');
		return false;
	});
	
	var viewport = $('meta[name="viewport"]');
	var nua = navigator.userAgent;
		
		if (nua.match(/iPad/i)) {
			viewport.attr('content', 'width=988');
			isiOS = true;
			viewportSize = 988;
		}
	
		if ((nua.match(/iPhone/i)) || (nua.match(/iPod/i))) {
			viewport.attr('content', 'width=494, minimum-scale=0.6, maximum-scale=1.0, user-scalable=no');
			isiOS = true;
			viewportSize = 494;
		}
		
		//Iniciamos el slider del home
		//Si el PAGER existe, es porque hay slider
		if ($("#moduleSLIDER #pager").length > 0){
			$('#c1').click(function(){ setSlider(1);});
			$('#c2').click(function(){ setSlider(2);});
			$('#c3').click(function(){ setSlider(3);});
			$('#c4').click(function(){ setSlider(4);});
			$('#c5').click(function(){ setSlider(5);});
			$('#c6').click(function(){ setSlider(5);});

			$("#pager").css({'width': 21 * slides});
			$("#pager").delay(600).animate({'opacity': 1}, 600);
			$('#c' + lastSlide).css({'background-color': "#00bbbd"});
			run = setInterval("nextSlide()", speed[lastSlide - 1]);
		}
		
		//Si existen los thumbs del portfolio
		//iniciamos las acciones de estos thumbs
		if ($("#wrapper .thumbs").length > 0){
			bindHovers();
		}
	});
	
	function pageWidth() {
		if(isiOS){
			return viewportSize;
		} else {
			return window.innerWidth != null? window.innerWidth: document.body != null? document.body.clientWidth:null;
		}
	}
	
	function setSlider(goto){
		//rotation speed and timer
		clearInterval(run);
		run = setInterval("nextSlide()", speed[goto - 1]);   
		 
		//grab the width and calculate left value
		var item_height = 541; 
		var top_value = item_height * (-1); 
		
		for (i = 1; i <= slides; i++){
			if(i != lastSlide && i != goto){
				var imageOther = '#images #s' + i;
				$(imageOther).css({'top': item_height});
				$(imageOther).css({'z-index': (996 - i)});
				
				var bulletOther = '#pager #c' + i;
				$(bulletOther).css({'background-color': "#333"});
			}
		}
		
		//image that moves out of slider
		var imageOut = '#images #s' + lastSlide;
		var imageIn = '#images #s' + goto;
		
		var bulletInactive = '#pager #c' + lastSlide;
		var bulletActive = '#pager #c' + goto;
		
		lastSlide = goto;
		
		//Preparamos para animar
		$(imageIn).css({'z-index': 998});
		$(imageOut).css({'z-index': 997});
		
		$(imageIn).css({'top': item_height});
		$(imageOut).css({'top': 0});
		
		//Actualizamos el bullet
		$(bulletInactive).css({'background-color': "#333"});
		$(bulletActive).css({'background-color': "#00bbbd"});
		
		//Slide animation
		//Movemos hacia arriba el nuevo slide"
		$(imageIn).animate({'top': 0}, 1200, 'easeInOutExpo');
		
		//Sacamos el slide anterior
		$(imageOut).animate({'top': top_value}, 900, 'easeInOutExpo');
		
		//Sacamos o ponemos el WE ARE YOUR segun el tipo de slide que viene
		//Si el proximo no es el SLIDE STANDAR
		$('.weareyour').css({'display': 'block'});
		if($(imageIn).attr("class") != "slide work"){
			if(workSlide){
				$('.weareyour').css({'top': item_height + 20});
				$('.weareyour').animate({'top': 0}, 500, 'easeInOutExpo');
				workSlide = false;
			}

		} else {
			workSlide = true;
			$('.weareyour').animate({'top': top_value}, 600, 'easeInOutExpo');			
			
		}
		
	}
	
	function nextSlide(){
		clearInterval(run);
		
		if(lastSlide < slides){
			var nextImg = lastSlide + 1;
		} else {
			var nextImg = 1;
		}
		
		setSlider(nextImg);
	}
        
        
        
        $(document).ready(function(){
            $(".navbar-collapse").click(function(){
                $("#menu ul li").toggle("slow")
            });
        })