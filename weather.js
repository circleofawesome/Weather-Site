//my API key: 8a7dcab387bf046722ebf262af30f9fa

var zipcode;
$(document).ready(function(){
	var zip;
	var country;
	var city;
	var temp;
	var condition;

	$.ajax({
		async:false,
		type:'GET',
		url:'http://freegeoip.net/json/',
		dataType:'JSON',
		success:function(data){
			zip=data.zip_code;
		}
	});

	$.ajax({
		type:'GET',
		url:'http://api.openweathermap.org/data/2.5/weather?zip='+zip+',us&appid=8a7dcab387bf046722ebf262af30f9fa',
		dataType:'JSON',
		success:function(data){
			//console.log(data.weather[0].main);
			country=data.sys.country;
			city=data.name;
			temp=data.main.temp;
			condition=data.weather[0].main;
		}
	});

});