
/* first the page reads from the cookies if present, otherwise forces the user to create a new "profile"
then it populates a set of data arays from the object which is populated in turn by the cookies
next it writes to the page if there is any data in the arrays*/
$(document).ready(function(){
	$(window).unload(function(){bakeCookies()});
	//first set up our data arrays
	Projectnames = [];
	Projectdates = [];
	Projecttypes = [];
	Instructornames = [];
	Instructoremails = [];
	Instructortel = [];
	Projectdescrip = [];
	dataobj={name: "test",};
	//then pull from cookies if they are present.
	$(window).load(function(){if(dataobj.pnames!=""){
	eatCookies();
	arrayUpdate();
	};});
	
	function arrayUpdate() {
		Projectnames = dataobj.pnames.split('|');
		Projectdates = dataobj.pdates.split("|");
		Projecttypes = dataobj.ptypes.split("|");
		Instructornames = dataobj.inames.split("|");
		Instructoremails = dataobj.iemails.split("|");
		Instructortel = dataobj.itels.split("|");
		Projectdescrip = dataobj.pdes.split("|");
	
	
	}
	function eatCookies() {
	//process the cookies of the page and populate an object with the cookies values
	var ca = document.cookie.split(';');
	for(i=0; i<ca.length;  i++){
		var ckv=ca[i];
		ckv=ckv.trim();
		ckVar = ckv.split('=');
		dataobj[ckVar[0]]=ckVar[1];
	};
	
	function bakeCookies(){
		//turn the arrays into joined strings and save them into cookies expiring in one 
		//year
		//this sets the cookies to expire naturally in one year, will be refeshed 
		//everytime time the user visits the page, hopefully.
				var d = new Date();
    			d.setTime(d.getTime() + (365*24*60*60*1000));
    			var expires = "expires="+d.toUTCString();
				
				pnames = Projectnames.join("|");
				document.cookie = "pnames=" + pnames +"; " + expires;
				
				pdates = Projectdates.join("|");
				document.cookie = "pdates=" + pdates + "; " + expires;
				
				ptypes = Projecttypes.join("|");
				document.cookie = "ptypes=" + ptypes + "; " + expires;
				
				inames = Instructornames.join("|");
				document.cookie = "inames=" + inames + "; " + expires;
				
				iemails = Instructoremails.join("|");
				document.cookie = "iemails=" + iemails + "; " + expires;
				
				itels = Instructortel.join("|");
				document.cookie = "itels=" + itels + "; " + expires;
				
				pdes = Projectdescrip.join("|");
				document.cookie = "pdes=" + pdes + "; " + expires;
				
				//write the data to the appropiate displays
				arrayUpdate();
				dataWrite();
	}
				
	function pageWrite() {
	//this takes the data arrays and populates the html with the data
	
}
	//update all the arrays from the dataobj after pulling from the cookies.
	
	
	$('#accordion').accordion();
	$('#tabs').tabs();
	$('#duedate').datepicker();
	pageWrite();
	
	
	
	$('#submit').click(function(){scrape();});
	
	
	//validation rules first
	function scrape(){
		//testing alert
		
		//alert("hi");
		$('#create').validate({
			rules: {
				pName: {
					required: true,
					minlength: 2,
					maxlength: 20
				},
				duedate: {
					required: true,
					date: true,
					minlength: 8,
				},
				typeSelect: {
					required: true,
				},
				iName: {
					required: true,
					minlength: 2,
					maxlength: 15,
				},
				iEmail: {
					email: true,
				},
				iTel: {
					number: true,
					minlength: 10,
				},
				pdes: {
					required: true	
					},
				},//end rules
			
				
			success: function(label){
				label.remove();
			
			},//end success
			
			submitHandler: function(){
				//read the fields, push them to the arrays, write the arrays to cookies, 
				//then fire the write to display function
				var temp = $('#pName').val();
				Projectnames.push(temp);
				//alert(Projectnames.valueOf());
				temp = $('#duedate').val();
				Projectdates.push(temp);
				//alert(Projectdates.valueOf());
				temp = $('#typeSelect').val();
				Projecttypes.push(temp);
				//alert(Projecttypes.valueOf());
				temp = $('#iName').val();
				Instructornames.push(temp);
				//alert(Instructornames.valueOf());
				temp = $('#iEmail').val();
				Instructoremails.push(temp);
				//alert(Instructoremails.valueOf());
				temp = $('#iTel').val();
				Instructortel.push(temp);
				//alert(Instructortel.valueOf());
				temp = $('#pdes').val();
				Projectdescrip.push(temp);
				//alert(Projectdescrip.valueOf());
				
				//deal with potential null values in the two optional fields by replaceing 				//any null values with a space, to prevent any errors when written to a 
				//cookie and then read back
				for(i=0; i<Instructoremails.length; i++){
					if(Instructoremails[i] == ""){Instructoremails[i] = " ";
					};
				};
				for(i=0;i<Instructortel.length;i++){
					if(Instructortel[i] == ""){Instructortel[i]=" "}
				}
				//alert(Instructoremails.valueOf());
				//alert(Instructortel.valueOf());
				
				//couldnt resist
				bakeCookies();
				
				
				
				},//end submithandler
		});//end validate
		
		
		
			
		
		
	} //end scrape
		
	

	
	

}
	
	

	
	
	
	
	
	
	
	


//and populate the project object from the cookie arrays and then write to the display
// 














});//end program