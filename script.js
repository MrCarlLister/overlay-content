var bgwrap = $( "html"); //ELEMENT ID OF PAGE WRAP TO BE FIXED WHEN OVERLAY IN PLACE
var fixedclass = 'fixed-while-overlay';// CLASS WITH POSITION:FIXED STYLING
var holdingvar = $( "#temp" ); // ELEMENT THAT HOLDS HTML BEFORE LAUNCHING COLORBOX
var getelement = $("#oc_elementid").val(); // ELEMENT FROM EXTERNAL PAGE TO 'GET'
var getclickclass = $("#oc_elementclass").val();
var url;
var homeUrl = site.theme_path;
var globalurl = document.URL; //GET URL OF PAGE, ON PAGE LOAD

function whatistheurl(file) {
    
    var extension = file.substr( (file.lastIndexOf('.') +1) );
    switch(extension) {
        case 'jpg':
        case 'png':
        case 'gif':
            // history.pushState(null, null, url);
            bgwrap.addClass(fixedclass);    
            $('#cboxContent').css('opacity', 0);
            var imgsrc = '<img src="' + url + '" />';
            holdingvar.html(imgsrc);
                
            $.colorbox.resize({
                maxWidth:"auto",
                width:80+'%'
            });

            $("#cboxContent").animate({"opacity": 1
            }, 400, function() {
                //do something after animating?
            });
        break;                         // the alert ended with pdf instead of gif.
        case 'zip':
        case 'rar':
            // alert('was zip rar');
        break;
        case 'pdf':
            // alert('was pdf');
        break;
        default:
        
            holdingvar.load( url + ' ' + getelement , function() {
            // $(getelement + ' a[href$=".png"]').addClass('image-overlay');
            $('#cboxContent').css('opacity', 0);
            $('#cboxLoadedContent').animate({scrollTop: 0}, 0);
            $("#cboxContent").animate({"opacity": 1
            }, 400, function() {
                //do something after animating?
                // holdingvar.html('');
            });
        });

            // alert('who knows');
    }
};
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
$(document).on('click', '#temp ' + getelement + ' a', function () {//BINDED BEFORE CREATION
    
       url = $(this).attr("href");
       history.pushState(null, null, url);
     	// alert('here');
        gaurl = url.replace(/^(?:\/\/|[^\/]+)*\//, "");
        _gaq.push(['_setAccount', 'UA-65650558-1']);
        _gaq.push(['_trackPageview', gaurl]);
        whatistheurl(url);
        
    return false;
})

.on('click', getclickclass, function() {//BINDED BEFORE CREATION
        url = $(this).attr("href");
        history.pushState(null, null, url);
        bgwrap.addClass(fixedclass);    

        holdingvar.load( url + ' ' + getelement , function() {
            $(getelement + ' a[href$=".png"]').addClass('image-overlay');
            $("#cboxContent").animate({"opacity": 1
            }, 400, function() {
                //do something after animating?
            });

        });
        holdingvar.html('');
    
    return false;
});

window.addEventListener("popstate", function(e) {

    $('#cboxContent').css('opacity', 0);
    $.colorbox.resize({
        innerWidth:"780px",
        innerHeight:'100%'
    });

    url = document.URL;
    gaurl = url.replace(/^(?:\/\/|[^\/]+)*\//, "");
    _gaq.push(['_setAccount', 'UA-65650558-1']);
    _gaq.push(['_trackPageview', gaurl]);
    whatistheurl(url);

    if(url == homeUrl) {
        $.colorbox.close();
    }; //END IF / ELSE
}); //END EVENTLISTENER

$(document).ready(function () {

    // $('a[href$=".gif"], a[href$=".jpg"], a[href$=".png"], a[href$=".bmp"]').addClass('tesssst');
    $(getclickclass).colorbox({
        fixed:true,
    	inline:true,
    	href:"#temp",
    	innerHeight: '100%',
    	top: '0px',
    	opacity:0.9,
    	innerWidth:"780px",
    	onOpen: function(){
        	$("#cboxContent").css("opacity", 0);

            

        },//onOpen

        onComplete: function(){ // FULLY LOADED

        },//onComplete

		onClosed:function(){// FUNCTION WHEN COLORBOX CLOSES
	        history.pushState(null, null, globalurl); //REVERTS URL TO ORIGINAL / BEFORE OVERLAY
	        bgwrap.removeClass('fixed-while-overlay'); //RETURNS BACKGROUND CONTENT TO UNFIXED STATE TO ALLOW SCROLLING
            url = globalurl.replace(/^(?:\/\/|[^\/]+)*\//, "");
            _gaq.push(['_setAccount', 'UA-65650558-1']);
            _gaq.push(['_trackPageview', url]);
	    }//onClosed

	});	
});