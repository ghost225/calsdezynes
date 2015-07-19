/**************************************
 TITLE: Cplew N341 Final Project
 AUTHOR: cplew
 CREATE DATE:  12/6/14
 PURPOSE: A project/homework tracker, that tracks user data between sessions via cookies
 LAST MODIFIED ON: 12/12/14
 LAST MODIFIED BY: cplew
 MODIFICATION HISTORY: 12/8/14, 12/10/14, 12/12/14
 KNOWN ISSUES: 12/12/14 Projects due on the curernt date do not render to page. 
 For the Grader: Michele Roberts gave permission to leave off the slider widget, as my page has no practical need for one, and instead i make use of cookies.
*/







/* first the page reads from the cookies if present, otherwise forces the user to create a new "profile"
then it populates a set of data arays from the object which is populated in turn by the cookies
next it writes to the page if there is any data in the arrays*/
$(document).ready(function(){
	
	//first set up our data arrays
	Projectnames = [];
	Projectdates = [];
	Projecttypes = [];
	Instructornames = [];
	Instructoremails = [];
	Instructortel = [];
	Projectdescrip = [];
	dataobj={name: "Student",visits: 0,color:'default.css' };
	eatCookies();
	
	$('link').attr("href",dataobj.color);
	//then pull from cookies if they are present.
	$(window).load(function(){
		if(dataobj.visits!=0){
			$('#welcome').html("<h1>Welcome back " + dataobj.name + "!</h1>");
			eatCookies();
			arrayUpdate();
			pageWrite();
		}
		
	
	
	});
	//based on an example found here http://stackoverflow.com/questions/595228/how-can-i-delete-all-cookies-with-javascript by antnewbee
	function trashCookies(){
			var cookies = document.cookie.split(";");
			for(i=0;i<cookies.length; i++){
				var badcookies = cookies[i].split("=");
				burnCookies(badcookies[0]);
				
				}
			function burnCookies(name){
				var d = new Date();
				d.setDate(d.getDate() -1);
				
				var expirationdate = "; "+d;
				var val="";
				document.cookie = name + "=" +val+expirationdate;
				}
				var c = new Date()
				c.setDate(c.getDate() + 100);
				document.cookie = "color=default.css; "+c;
				window.location="";
	}
	//update all the arrays from the dataobj after pulling from the cookies.
	function arrayUpdate() {
		Projectnames = dataobj.pnames.split('|');
		Projectdates = dataobj.pdates.split("|");
		Projecttypes = dataobj.ptypes.split("|");
		Instructornames = dataobj.inames.split("|");
		Instructoremails = dataobj.iemails.split("|");
		Instructortel = dataobj.itels.split("|");
		Projectdescrip = dataobj.pdes.split("|");
	
	}//end arrayupdate
	
	function eatCookies() {
	//process the cookies of the page and populate an object with the cookies values
	var ca = document.cookie.split(';');
	for(i=0; i<ca.length;  i++){
		var ckv=ca[i];
		ckv=ckv.trim();
		ckVar = ckv.split('=');
		dataobj[ckVar[0]]=ckVar[1];
	};};//end eatcookies

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
				document.cookie = "color=" + dataobj.color +"; "+expires;
				document.cookie = "visits=" + dataobj.visits +"; " + expires;
				document.cookie = "name=" + dataobj.name +"; "+expires;
				//write the data to the appropiate displays
				
	}// end bake cookies
				
	function pageWrite() {
	$('#assignTab').html("");
	$('#quizTab').html("");
	$('#testTab').html("");
	//this takes the data arrays and populates the html with the data
	//this gets a bit complicated, also i cant get the items due on the current date to list out, but ther are no erros, it just doesnt work. 
	for(i=0; i<Projectnames.length; i++){
		var date = new Date(Projectdates[i]);
		var today = new Date();
		date1 = date.toDateString();
		today1 = today.toDateString();
		if(date1 == today1){$('#four').append("<div class='abox'><h3 style='color: red'>"+Projectnames[i]+"</h3><p>Due Date: " + Projectdates[i] + "<br>Instructor Name: " + Instructornames[i] + " Instructor's email: " + Instructoremails[i] + "Instructor's Phone: " + Instructortel[i] + "</p><p>Project Description: " + Projectdescrip[i])}else if(date < today){$('#three').append("<div class='abox'><h3 style='color: red'>"+Projectnames[i]+"</h3><p>Due Date: " + Projectdates[i] + "<br>Instructor Name: " + Instructornames[i] + " Instructor's email: " + Instructoremails[i] + "Instructor's Phone: " + Instructortel[i] + "</p><p>Project Description: " + Projectdescrip[i])}else{
		if(Projecttypes[i] == "Homework"){
				$('#assignTab').append("<div class='abox'><h3 style='color: red'>"+Projectnames[i]+"</h3><p>Due Date: " + Projectdates[i] + "<br>Instructor Name: " + Instructornames[i] + " Instructor's email: " + Instructoremails[i] + "Instructor's Phone: " + Instructortel[i] + "</p><p>Project Description: " + Projectdescrip[i])}else if(Projecttypes[i] == "Quiz"){
				$('#quizTab').append("<div class='abox'><h3 style='color: red'>"+Projectnames[i]+"</h3><p>Due Date: "+Projectdates[i]+"<br>Instructor Name: "+ Instructornames[i]+" Instructor's email: "+ Instructoremails[i]+ "Instructor's Phone: "+ Instructortel[i] + "</p><p>Project Description: "+ Projectdescrip[i])}else if(Projecttypes[i]=="Test/Exam"){
				$('#testTab').append("<div class='abox'><h3 style='color: red'>"+Projectnames[i]+"</h3><p>Due Date: "+Projectdates[i]+"<br>Instructor Name: "+ Instructornames[i]+" Instructor's email: "+ Instructoremails[i]+ "Instructor's Phone: "+ Instructortel[i] + "</p><p>Project Description: "+ Projectdescrip[i])
				};
	};}
	
	
	
	}//end pagewrite

	
	
	//init the widgets
	$('#accordion').accordion();
	$('#tabs').tabs();
	$('#duedate').datepicker();
	$('#user').autocomplete({source: autolist});
	$('#spinner').spinner({min:0,max:10});
	//button assignment
	$('#subuser').click(function(){userscrape();});
	$('#submit').click(function(){scrape();});
	$('#clear').click(function(){trashCookies();});
	
	
	function userscrape(){
		$('#newuser').validate({
		rules: {
			user: {
				required: true,
				minlength: 3,
				maxlength: 10,	
			},
			colorpicker: {
				required: true,
			},
		},
		success: function(label){
				label.remove();
		},
		submitHandler: function(){
			dataobj.visits = 56;
			dataobj.name = $('#user').val();
			dataobj.color = $('input[name=colorpicker]:checked').val()
			
			bakeCookies();
			$('#window').reload();
		},
		
		});//end validate
		
	}//end userscrape
	//this function is intended to help prevent users accidently entering multiple entries at once
	function Reset(){
		$('#pName').val("");
		$('#duedate').val("");
		$('#iName').val("");
		$('#iEmail').val("");
		$('#iTel').val("");
		$('#pdes').val("");
		}
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
				eatCookies();
				arrayUpdate();
				pageWrite();
				Reset();
				
				
				},//end submithandler
		});//end validate
		
		
		
			
		
		
	} //end scrape
	
	

// list for the autocomplete	
var autolist = ['Student', 'IU student', 'Purdue student', 'IUPUI master race Student',]	
	
	
	
	
	
	


//and populate the project object from the cookie arrays and then write to the display
// 














});//end program