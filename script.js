var bgwrap = $( "body"); //ELEMENT ID OF PAGE WRAP TO BE FIXED WHEN OVERLAY IN PLACE
var fixedclass = 'fixed-while-overlay';// CLASS WITH POSITION:FIXED STYLING
var holdingvar = $( "#temp" ); // ELEMENT THAT HOLDS HTML BEFORE LAUNCHING COLORBOX
var getelement = $("#oc_elementid").val(); // ELEMENT FROM EXTERNAL PAGE TO 'GET'
var getclickclass = $("#oc_elementclass").val();
var url;
var homeUrl = site.theme_path;
var globalurl = document.URL; //GET URL OF PAGE, ON PAGE LOAD


$(document).bind("cbox_complete", function(){
    var ahref = $.colorbox.element().attr("href");
    if (ahref) {
         ahref = ahref.replace(/^(?:\/\/|[^\/]+)*\//, "");
        _gaq.push(['_setAccount', 'UA-65650558-1']);
        _gaq.push(['_trackPageview', ahref]);

        // alert(ahref);
    }
});

// CONTROLL WHAT HAPPENS INSIDE THE COLORBOX
$(document).on('click', ' ' + getelement + ' a', function () {//BINDED BEFORE CREATION
     	url = $(this).attr("href");
     	history.pushState(null, null, url);
        url = url.replace(/^(?:\/\/|[^\/]+)*\//, "");
        _gaq.push(['_setAccount', 'UA-65650558-1']);
        _gaq.push(['_trackPageview', url]);
		holdingvar.load( url + " #themain" , function() {
			$('#cboxContent').css('opacity', 0);
			$('#cboxLoadedContent').animate({scrollTop: 0}, 0);
			$("#cboxContent").animate({"opacity": 1
			}, 400, function() {
				//do something after animating?
			});
		});
    return false;
})

.on('click', getclickclass, function() {//BINDED BEFORE CREATION
        url = $(this).attr("href");
        history.pushState(null, null, url);
        bgwrap.addClass(fixedclass);    

        holdingvar.load( url + ' ' + getelement , function() {
            $("#cboxContent").animate({"opacity": 1
            }, 400, function() {
                //do something after animating?
            });

        });
        holdingvar.html('');
    
    return false;
});

$(document).ready(function () {
    $(getclickclass).colorbox({
    	inline:true,
    	href:"#temp",
    	innerHeight: '90%',
    	bottom: '0px',
    	opacity:0.9,
    	innerWidth:"780px",
    	onOpen: function(){
        	$("#cboxContent").css("opacity", 0);

            window.addEventListener("popstate", function(e) {
                url = document.URL;

                if(url == homeUrl) {
                   location.reload();
                } else {
                    holdingvar.load( url + ' ' + getelement , function() {
                        $('#cboxContent').css('opacity', 0);
                        $('#cboxLoadedContent').animate({scrollTop: 0}, 0);
                        $("#cboxContent").animate({"opacity": 1
                        }, 400, function() {
                            //do something after animating?
                        });
                    });
                }; //END IF / ELSE
            }); //END EVENTLISTENER

        },//onOpen

        onComplete: function(){ // FULLY LOADED
            // var ahref = $.colorbox.element().attr("href");
            // _gaq.push(['_setAccount', 'UA-65650558-1']);
            // _gaq.push(['_trackPageview', ahref]);

            // alert(ahref);
            // var ahref = $.colorbox.element().attr("href");
            // _gaq.push(['_setAccount', 'UA-65650558-1']);
            // _gaq.push(['_trackPageview', ahref]);
            // THIS WILL BE USEFUL FOR TRACKING OVERLAY IN GOOGLE ANALYTICS; SEE http://www.jacklmoore.com/colorbox/faq/#faq-analytics
            // alert(ahref);

        },//onComplete

		onClosed:function(){// FUNCTION WHEN COLORBOX CLOSES
	        history.pushState(null, null, globalurl); //REVERTS URL TO ORIGINAL / BEFORE OVERLAY
	        $("body").removeClass('fixed-while-overlay'); //RETURNS BACKGROUND CONTENT TO UNFIXED STATE TO ALLOW SCROLLING
            globalurl = globalurl.replace(/^(?:\/\/|[^\/]+)*\//, "");
            _gaq.push(['_setAccount', 'UA-65650558-1']);
            _gaq.push(['_trackPageview', globalurl]);
	    }//onClosed

	});	
});