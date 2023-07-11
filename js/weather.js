var DAY = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var MONTH = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var convertIcon = {
	"01d": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-2.svg",
	"01n": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-2.svg",
	"02d": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-3.svg",
	"02n": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-3.svg",
	"03d": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-5.svg",
	"03n": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-5.svg",
	"04d": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-6.svg",
	"04n": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-6.svg",
	"09d": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-10.svg",
	"09n": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-10.svg",
	"10d": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-4.svg",
	"10n": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-4.svg",
	"13d": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-14.svg",
	"13n": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-14.svg",
	"11d": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-12.svg",
	"11n": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-12.svg",
	"50d": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-8.svg",
	"50n": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-8.svg"
	};
var divHtml="";
var direction = ["NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];


(function() {

	var Weather = {
		init: function() {
			divHtml = ""
			if($("#searchPlace").val() == ""){
				this.getLocation();
				this.showTime();
			}
			else{
				var loc = $("#searchPlace").val();
				var url1 = "q="+loc+"&units="+$("#units").val()+"&APPID=3acc16ffae9e45df92a064e41646355f";
				this.showTime();
				this.showCurrentCoverage(url1);
			}
			$("#findButton").unbind('click').click(function(){
				Weather.init();
			});
			$('#refresh').unbind('click').on('click', this.refresh);
		},

		cache: {
			showFahrenheit: true,
		},

		getLocation: function() {
      		var c = Weather.cache;
      
			$.getJSON('http://ip-api.com/json', function(json) {
				c.lat = json.lat;
				c.long = json.lon;
				var url = 'lat=' + c.lat + '&lon=' + c.long + '&units='+$("#units").val()+'&APPID=3acc16ffae9e45df92a064e41646355f';
				
				Weather.showCurrentCoverage(url);
			});
		},

		getInformation: function() {
			$.getJSON("");
		},

		/**

		this is other div
		<div class="forecast">
	        <div class="forecast-header">
	          <div class="day">Tuesday</div>
	        </div>
	        <!-- .forecast-header -->
	        <div class="forecast-content">
	          <div class="forecast-icon">
	            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-3.svg" alt="" width=48>
	          </div>
	          <div class="degree">23<sup>o</sup>C</div>
	          <small>18<sup>o</sup></small>
	        </div>
      	</div>
		**/

		/*
		<div class="today forecast">
	        <div class="forecast-header">
	          <div class="day">Monday</div>
	          <div class="date">6 Oct</div>
	        </div>
	        <!-- .forecast-header -->
	        <div class="forecast-content">
				<div class="location"><h3 id="city">New York</h3></div>
				<div class="degree">
					<div class="num" id="tempnow">-<sup>o</sup>C</div>
					<div class="forecast-icon">
					  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-1.svg" alt="" width=90>
					</div>
				</div>
				<span id="humidnow"></span>
				<span id="windnow"></span><!--Wind Here-->
				<span id="directionnow"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-compass.png" alt="">East</span>
	        </div>
	    </div>
		*/

		showOtherDiv: function(obj){
			var day = obj.day;
			var icon = obj.icon;
			icon = convertIcon[icon];
			var avgTemp = Math.round(obj.avgTemp);
			var small = Math.round(obj.min);
			var big = Math.round(obj.max);


			var myDate = new Date(day*1000);
			day = DAY[myDate.getDay()];

			var html = '<div class="forecast col-md-2 col-xs-12" style="padding-bottom:30px;"><div class="forecast-header"><div class="day">';
			html += day+'</div></div><div class="forecast-content"><div class="forecast-icon"><img src="';
			html += icon+'" alt="" width=48></div><div class="degree">';
			if($("#units").val() == "imperial"){
				html += avgTemp+'<sup>o</sup>F</div><div class = "row"><div class="col-md-12 col-md-offset-0 col-xs-offset-2 col-xs-4" style="padding:0px;"><small>min: ';
				html += small+'<sup>o</sup>F</small></div><div class="col-md-12 col-xs-4" style="padding:0px;"><small>max: '+big+'<sup>o</sup>F</small></div></div></div></div>';
			}else{
				html += avgTemp+'<sup>o</sup>C</div><div class = "row"><div class="col-md-12 col-md-offset-0 col-xs-offset-2 col-xs-4" style="padding:0px;"><small>min: ';
				html += small+'<sup>o</sup>C</small></div><div class="col-md-12 col-xs-4" style="padding:0px;"><small>max: '+big+'<sup>o</sup>C</small></div></div></div></div>';
			}
			return html;
		},

		showCurrentDiv: function(obj){
			var day = obj.day;
			var icon = obj.icon;
			icon = convertIcon[icon];
			var tempnow = obj.tempnow;
			var humidnow = obj.humidnow;
			var windnow = obj.windnow;
			var directionnow = obj.directionnow;
			var city = obj.city;
			var direct = "nowind";
			if(directionnow!=""){
				for(var i=0;i<direction.length;i++){
					if(directionnow > 11.25+i*22.5 && directionnow <= 11.25+(i+1)*22.5){
						direct = direction[i];
						break;
					}
				}
				if(direct == "nowind"){
					direct = "N";
				}
			}
			var myDate = new Date(day*1000);
			day = DAY[myDate.getDay()];
			var month = MONTH[myDate.getMonth()];
			var currentDay = myDate.getDate()<10? month+" 0"+myDate.getDate() : month+" "+myDate.getDate().toString();
			var html = '<div class="today forecast"><div class="forecast-header"><div class="day">';
			html += day+'</div><div class="date">';
			html += currentDay+'</div></div><div class="forecast-content"><div class="location"><h3 id="city">';
			html += city+'</h3></div><div class="degree"><div class="num" id="tempnow">';
			if($("#units").val() == "imperial"){
				html += tempnow+'<sup>o</sup>F</div><div class="forecast-icon"><img src="';
			}else{
				html += tempnow+'<sup>o</sup>C</div><div class="forecast-icon"><img src="';
			}
			html += icon + '" alt="" width=90></div></div><span id="humidnow"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-umberella.png" alt="">';
			html += humidnow + '</span><span id="windnow"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-wind.png" alt="">';
			html += windnow + '</span><span id="directionnow"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/665940/icon-compass.png" alt="">';
			html += direct+'</span></div></div>';

			return html;

		},

		getForecastCoverage : function(url){
			var c = Weather.cache;
			$.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?'+url, function(json) {
				var list = json.list;
				var html = "";
				for(var i=1; i< list.length; i++){
					var obj = {};
					obj.day = list[i].dt;
					obj.min = list[i].temp.min;
					obj.max = list[i].temp.max;
					obj.avgTemp = (list[i].temp.min+list[i].temp.max)/2
					obj.icon = list[i].weather[0].icon;
					html += Weather.showOtherDiv(obj);
				}
				divHtml += html;
				$(".forecast-container").html(divHtml);
			});
		},
		showCurrentCoverage: function(url) {
			var c = Weather.cache;
			$.getJSON('http://api.openweathermap.org/data/2.5/weather?'+url, function(json) {
				var obj = {};
				obj.day = json.dt;
				obj.icon = json.weather[0].icon;
				obj.tempnow = Math.round(json.main.temp);
				obj.humidnow = json.main.humidity;
				obj.windnow = json.wind.speed;
				obj.directionnow = json.wind.deg;
				obj.city = json.name;
				divHtml += Weather.showCurrentDiv(obj);
				Weather.getForecastCoverage(url);
			});
		},

		showTime: function() {
			var time = new Date();
			var hours = time.getHours();
			var minutes = time.getMinutes();

			// Display a zero before hours/minutes if below 10
			if ( hours < 10 ) {
				$('#time').html(minutes < 10 ? '0' + hours + ':0' + minutes : '0' + hours + ':' + minutes);
			} else {
				$('#time').html(minutes < 10 ? hours + ':0' + minutes : hours + ':' + minutes);
			}
		},

		changeUnit: function() {
			var c = Weather.cache;
      
      // Toggle temp unit type on click
			if ( c.showFahrenheit === false ) {
				$('#temp').html(c.fahrenheit);
				c.showFahrenheit = true;
			} else {
				$('#temp').html(c.celcius);
				c.showFahrenheit = false;
			}
      
      // Toggles the button knob
			$('#unit-toggle').toggleClass('toggle');
      // Creates the fade in effect on the temp text
			$('#temp').toggleClass('toggle');
		},

		refresh: function() {
			Weather.init();
		}
	};
	$("#units").bootstrapSwitch({
    onText: " °C ",
    offText: " °F ",
    onInit: function() {
      $("#units").val("imperial");
      Weather.init();
    },
    onSwitchChange: function() {
      if($("#units").val() == "metric"){
        $("#units").val("imperial");
      }else{
        $("#units").val("metric");
      }
      Weather.init();
    }
  });

})();


