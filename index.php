
<!doctype html>
<head>
  <meta http-equiv="refresh" content="180;url=http://aepi.mit.edu/hud">
  <meta charset="utf-8">

  <title>HUD</title>
  <link rel="stylesheet" href="style.css">
</head>

<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"> </script>
<script type="text/javascript" src="lib/jssaxparser/sax.js"></script>
<script type="text/javascript" src="lib/jssaxparser/DefaultHandlers.js"></script>
<script type="text/javascript" src="lib/spin.min.js"> </script>

<script type="text/javascript" src="script.js"> </script>

<script type="text/javascript">

function onload() {
		
	startTime();
	getPrediction();
	
}

</script> 


<script>
	//make the initial call for weather
	$.ajax({
	  url: "http://api.wunderground.com/api/dc203fba39f6674e/conditions/forecast/q/02215.json",
	  dataType : "jsonp",		
	  success: function(data) {
		  	getWeather(data);
	  }
	});
</script>

<script>
/*
	function() {
		//set the timer for update
		setInterval(function(){
				$.ajax({
				  url: "http://api.wunderground.com/api/dc203fba39f6674e/conditions/forecast/q/02215.json",
				  dataType : "jsonp",		
				  success: function(data) {
					  	getWeather(data);
				  }
				});
			
		},200000);
	
	}
*/
</script>

<body onload="onload();">

<!-- <div id="day"> Sunday 9/8/2013</div> -->
<div id="timestamp"></div>
<div id="timetag"></div>

<div id="spinner"></div>


<div id="weather"> 
	<p id="icon"> </p>
	<p id="temp"> </p>
	
</div>

<div id="bus" hidden="true">
	<img id="bus" src="assets/bus.png" width="250" height="250"/>
	<div id="predictions">
		<p id="firstPrediction"> </p>
		<p id="secondPrediction"> </p>
		<p id="thirdPrediction"> </p>	
	</div>
</div>

<div id="about" hidden="true">
<p>© MIT Alpha Epsilon Pi </p>
<p> Report problems to <a href="mailto:aepi-hudcomm@mit.edu">aepi-hudcomm at mit.edu</a></p>
</div>

</body>

</html>
