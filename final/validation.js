// JavaScript Document

/*
	Cplew
	JS page for validation test
	12/4/2014
	
*/


$(document).ready(function() {
   
   $('#sub').click(function(){gotClicked();});
   
   
   function gotClicked() {
		$('#myForm').validate({
			rules: {
				name: {
					required: true,
					minlength: 2,
					maxlength: 10
					},
				email: {
					required: true,
					email: true,
				},
				tel: { 
					required: true,
					number: true,
					minlength: 10,
					maxlength: 15, 
				},
				red: { 
					},
				blue: {
					},
				green: {
					},
				yellow: {
					}},
			
				
			success: function(label){
				label.remove();
			
			},
			
			submitHandler: function() {
				var names = $(':checked').map(function(){
                   return $(this).val(); 
                }).get().join(", "); 
				
                
				$('#post').html("<p> Hello " + $('#name').val() + " you like the color(s) " + names ); 
			},
			
			
			
			});  
	   
	   
	   
	   
   }
   
   
    
});