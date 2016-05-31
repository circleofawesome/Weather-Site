//my API key: 8a7dcab387bf046722ebf262af30f9fa

var zipcode;
$(document).ready(function() {
  var icons={
    "01d": "https://media.giphy.com/media/3oEjHC0EPatuO8RqRG/giphy.gif",
    "01n": "https://media.giphy.com/media/3oEjI1D86gVdNfVMis/giphy.gif",
    "02d": "https://media.giphy.com/media/l41YxkTa54X2NraBG/giphy.gif",
    "02n": "https://media.giphy.com/media/3oEjHTUHaEF3eTHSeI/giphy.gif",
    "03d": "https://media.giphy.com/media/l41YxkTa54X2NraBG/giphy.gif",
    "03n": "https://media.giphy.com/media/3oEjHTUHaEF3eTHSeI/giphy.gif",
    "04d": "https://media.giphy.com/media/l41YxkTa54X2NraBG/giphy.gif",
    "04n": "https://media.giphy.com/media/3oEjHTUHaEF3eTHSeI/giphy.gif",
    "09d": "https://media.giphy.com/media/3oEjHHBFNmau7mdH32/giphy.gif",
    "09n": "https://media.giphy.com/media/26gwpQhcBrXeVKeli/giphy.gif",
    "10d": "https://media.giphy.com/media/3oEjHHBFNmau7mdH32/giphy.gif",
    "10n": "https://media.giphy.com/media/26gwpQhcBrXeVKeli/giphy.gif",
    "11d": "https://media.giphy.com/media/3oEjHHBFNmau7mdH32/giphy.gif",
    "11n": "https://media.giphy.com/media/26gwpQhcBrXeVKeli/giphy.gif",
    "13d": "https://media.giphy.com/media/3oEjHZ8gUYX13HCewE/giphy.gif",
    "13n": "https://media.giphy.com/media/3o6EhX89ABsdUMRaGk/giphy.gif",
    "50d": "https://media.giphy.com/media/l41YxkTa54X2NraBG/giphy.gif",
    "50n": "https://media.giphy.com/media/3oEjHTUHaEF3eTHSeI/giphy.gif"
  }
  var zip;
  var country;
  var city;
  var temp;
  var condition;
  var icon;
  var tempF;
  var tempC;
  var time;
  var sunrise;
  var sunset;

  function k_to_cel(k){
    var cel=k-273;
    return Math.round(cel);
  }

  function k_to_far(k){
    var far=(k*(9.0/5.0))-459.67;
    return Math.round(far);
  }

  $.ajax({
    async: false,
    type: 'GET',
    url: 'http://freegeoip.net/json/',
    dataType: 'JSON',
    success: function(data) {
      zip = data.zip_code;
      console.log(zip);
    }
  });

  $.ajax({
    async:false,
    type: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&appid=8a7dcab387bf046722ebf262af30f9fa',
    dataType: 'JSON',
    success: function(data) {
      //console.log(data.weather[0].main);
      country = data.sys.country;
      city = data.name;
      temp = data.main.temp;
      condition = data.weather[0].main;
      icon=data.weather[0].icon;
      time=data.dt;
      sunrise=data.sys.sunrise;
      sunset=data.sys.sunset;
    }
  });

  if(time>sunrise&&time<sunset){
    //background image=day
    $("body").css("background-image","url('http://i.cubeupload.com/4JRyUP.jpg')");
  }
  else{
    //background image = night
    $("body").css("background-image","url('http://i.cubeupload.com/Yexe5P.jpg')");
  }

  tempF=k_to_far(temp);
  tempC=k_to_cel(temp);
  $("div.temperature").replaceWith("<div class='col-md-12 temperature'>"+tempF+"&deg;<span class='unit'>F</span></div>");
  $("div.location").replaceWith("<div class='col-md-12 location'>"+city+", "+country+"</div>");
  $("div.status").replaceWith("<div class='col-md-12 status'>"+condition+"</div>");
  //<div class="col-md-12 gif"><img src="https://media.giphy.com/media/3oEjHC0EPatuO8RqRG/giphy.gif"></div>
  $("div.gif").replaceWith("<div class='col-md-12 gif'><img class='img-responsive center-block' src='"+icons[icon]+"'></div>");
  //console.log(icons[icon]);

  $(".cel").on("click",function(){
    $("div.temperature").replaceWith("<div class='col-md-12 temperature'>"+tempC+"&deg;<span class='unit'>C</span></div>");
  });
  $(".far").on("click",function(){
    $("div.temperature").replaceWith("<div class='col-md-12 temperature'>"+tempF+"&deg;<span class='unit'>F</span></div>");
  });
});