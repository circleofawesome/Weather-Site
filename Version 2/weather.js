//my API key: 8a7dcab387bf046722ebf262af30f9fa

var zipcode;
$(document).ready(function() {
  var zip;
  var country;
  var city;
  var temp;
  var condition;
  var icon;
  var tempF;
  var tempC;

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
    }
  });
  tempF=k_to_far(temp);
  tempC=k_to_cel(temp);
  $("div.temperature").replaceWith("<div class='col-md-12 temperature'>"+tempF+"&deg;<span class='unit'>F</span></div>");
  $("div.location").replaceWith("<div class='col-md-12 location'>"+city+", "+country+"</div>");
  $("div.status").replaceWith("<div class='col-md-12 status'>"+condition+"</div>");
});