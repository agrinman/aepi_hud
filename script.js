function getPrediction() {
	var url = "";
	if (isDaytime() == true) {
		url = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mit&s=commsher&r=boston";
	} else {
		url = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=mit&s=bays155&r=saferidebostone";
	}
	
	var contentHandler = new DefaultHandler2();
	
	var predictionCount = 0;
	document.getElementById("firstPrediction").innerHTML = "";
	document.getElementById("secondPrediction").innerHTML = "";
	document.getElementById("thirdPrediction").innerHTML = "";

	contentHandler.startElement = function(namespaceURI, localName, qName, atts) {
		if (qName == "prediction") {

			if (predictionCount == 0) {
				document.getElementById("firstPrediction").innerHTML  = atts.getValue("minutes");
			} else if (predictionCount == 1) {
		    	document.getElementById("secondPrediction").innerHTML = "     " + atts.getValue("minutes");				
			} else if (predictionCount == 2) {
		    	document.getElementById("thirdPrediction").innerHTML  = "     " + atts.getValue("minutes");				
			}
			
			predictionCount += 1;
		}
	};    	
	
	var saxParser = XMLReaderFactory.createXMLReader();
	
	saxParser.setHandler(contentHandler);
	
	var data = httpGet(url);
	data = data.replace('<?xml version="1.0" encoding="utf-8" ?>', "");
	saxParser.parseString(data);
	
	if (predictionCount == 0) {
		document.getElementById("firstPrediction").innerHTML = "n/a";
	}
	
	//debug
/*
	document.getElementById("firstPrediction").innerHTML = "12";
	document.getElementById("secondPrediction").innerHTML = "32";
	document.getElementById("thirdPrediction").innerHTML = "45";
*/

	document.getElementById('bus').style.display = 'block';
	document.getElementById('about').style.display = 'block';
	
	t = setTimeout(function(){getPrediction()}, 20000);
	
}

function getWeather(data) {
	var conditionCode = weatherCode(data.current_observation.icon_url);
	var temp = data.current_observation.temp_f;
	
	
	document.getElementById("icon").innerHTML = conditionCode;
	document.getElementById("temp").innerHTML = temp + "°";
}

function weatherCode(url) {
	var matcher = /\/(\w+).gif$/;
    var code = matcher.exec(url);
    if (code) {
      code = code[1];
    } else {
      // We can't find the code
      code = null;
    }
    switch(code) {

      case "chanceflurries":
      case "chancesnow":
        return "p";

      case "/ig/images/weather/flurries.gif":
        return "]";

      case "chancesleet":
        return "4";

      case "chancerain":
        return "7";

      case "chancetstorms":
        return "x";

      case "tstorms":
      case "nt_tstorms":
        return "z";

      case "clear":
      case "sunny":
        return "v";

      case "cloudy":
        return "`";

      case "flurries":
      case "nt_flurries":
        return "]";

      case "fog":
      case "hazy":
      case "nt_fog":
      case "nt_hazy":
        return "g";

      case "mostlycloudy":
      case "partlysunny":
      case "partlycloudy":
      case "mostlysunny":
        return "1";

      case "sleet":
      case "nt_sleet":
        return "3";

      case "rain":
      case "nt_rain":
        return "6";

      case "snow":
      case "nt_snow":
        return "o";

      // Night Specific

      case "nt_chanceflurries":
        return "a";

      case "nt_chancerain":
        return "8";

      case "nt_chancesleet":
        return "5";

      case "nt_chancesnow":
        return "[";

      case "nt_chancetstorms":
        return "c";

      case "nt_clear":
      case "nt_sunny":
        return "/";

      case "nt_cloudy":
        return "2";

      case "nt_mostlycloudy":
      case "nt_partlysunny":
      case "nt_partlycloudy":
      case "nt_mostlysunny":
        return "2";
        
    }

}

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send();
    return xmlHttp.responseText;
}

function isDaytime() {
	var h = (new Date()).getHours();
	
	if (h > 4 && h < 18) {
		return true;
	}
	
	return false;
}

function startTime() {
	var today = new Date();
	
	var h = today.getHours() % 12;
	
	if (h == 0) {
		h = 12;
	}
	
	var m = correctTime(today.getMinutes());
	var s = correctTime(today.getSeconds());
	
	document.getElementById("timestamp").innerHTML=h+":"+m+":"+s;
	
	t = setTimeout(function(){startTime()}, 500);
}

function correctTime(t) {
	

	if (t < 10) {
		t = "0" + t;
	}
	
	return t;
}