(function ($) {	
	const backToTopButton = document.querySelector(".back-to-top");	
	const scrollContainer = () => { return document.documentElement || document.body; };
			
	$(window).on('load', function() {
        $('#loader').addClass('loaded');
		document.body.scrollIntoView({ behavior: "smooth" });
		location.hash = "";
    });
	
	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
		baguetteBox.run('.tz-gallery');
		
		/******************** Load More ********************
		-- Set lightbox-container : Display - None;
		$(".lightbox-container").slice(0, 3).show();		
		$("body").on('click', '.load-more', function (e) {
			e.preventDefault();
			$(".lightbox-container:hidden").slice(0, 3).slideDown();
			if ($(".lightbox-container:hidden").length == 0) {
				$(".load-more").css('visibility', 'hidden');
			}
			$('html,body').animate({
				scrollTop: $(this).offset().top
			}, 1000);
		});	
		*****************************************************/

		$("body").on('click', '#form-submit', SendEmail);		
	});
	
	function onScroll(event){
		if (scrollContainer().scrollTop > 100) {
			backToTopButton.classList.remove("hideBackbutton");
		} else {
			backToTopButton.classList.add("hideBackbutton");
		}
		
	    var scrollpos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currlink = $(this);
	        var refelement = $(currlink.attr("href"));
	        if (refelement.position().top <= scrollpos && refelement.position().top + refelement.height() > scrollpos) {
	            $('.nav ul li a').removeClass("active");
	            currlink.addClass("active");
	        }
	        else{
	            currlink.removeClass("active");
	        }
	    });
	}
	
	function ShowMessage(msg){
		$('#dialog-message').text(msg);
		$('#myModal').modal('show');
	}
	
	function isValid() {
		//pattern="/(7|8|9)\d{9}/"
		var bodyData = "";
		var name = $("#name").val();
		var contactNumber = $("#contactNumber").val();
		var email = $("#email").val();
		var message = $("#message").val();
		if(name != ''){
			if(contactNumber != ''){
				if(message != ''){
					bodyData = "Name : " + name + "<br/>" + "Contact Number : " + contactNumber + "<br/>" + "Email : " + email + "<br/>" + "Message : " + message;
				}
				else{
					ShowMessage('Please, Enter you message!');
				}
			}
			else{
				ShowMessage('Please, Enter you Mobile Number!');
			}
		}
		else{
			ShowMessage('Please, Enter you Name!');
		}
		
		return bodyData;
	}
	
	function SendEmail() {
		var bodyData = isValid();
		if(bodyData != ""){
			var siteURL = "http://localhost/fitness/";
			$.ajax({
				dataType: "json",
				url: siteURL + "assets/Data.json",
				success: function(data) {
					Email.send({
						Host : data['Host'],
						From : data['From'],
						Username : data['From'],
						Password : data['Password'],
						To : data['To'],
						Subject : "Feedback",
						Body : bodyData
					}).then(msg => {
						if(msg == "OK"){
							ShowMessage('Your feedback sent successfully!');
						}
						else{
							ShowMessage('Failed to send your feedback! \n\n Try after sometime.');
						}
						$("input[type='text']").val('');
						$('textarea').val('');
					});
				}
			});
		}
	}

	$(".menu-trigger").on('click', function() {	
		$(this).toggleClass('active');
		$('.header-area .nav').slideToggle(400);
	});	
		
	$('.scroll-to-section').on('click', function() {
		$('.header-area .nav').slideUp(400);
		$(".menu-trigger").removeClass('active');
	});
})(window.jQuery);

function goBackToTop() { 
	document.body.scrollIntoView({ behavior: "smooth" }); 
}

function onlyNumberKey(evt) {
	var ASCIICode = (evt.which) ? evt.which : evt.keyCode
	if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
		return false;
	return true;
}