#!/user/bin/env node

import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

var argv = process.argv.slice(2);
//console.log(args)

//help text

if (process.argv.indexOf('-h') > -1) {
	console.log('Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE')
	console.log('	 -h            Show this help message and exit.')
	console.log('	 -n, -s        Latitude: N positive; S negative.')
	console.log('	 -e, -w	       Longitude: E positive; W negative.')
	console.log('	 -z	       Time zone: uses tz.guess() from moment-timezone by default.')
	console.log('	 -d 0-6	       Day to retrieve weather: 0 is today; defaults to 1.')
	console.log('	 -j	       Echo pretty JSON from open-mateo API and exit.')
	proccess.exit(0);
}

//declare latitude
let latitude = '35'

if (process.argv.indexOf('-n') > -1) {
	latitude = arg[process.argv.indexOf('-n') -1]
	if (latitude > 90 || latitude <-90) {
		process.exit(1);
	}
}

if (process.argv.indexOf(-s) > -1) {
	latitude = argv[process.argv.indexOf('-s') -1] * -1;
	if (latitude > 90 || latitude < -90) {
		process.exit(1);
	}
}


//declare longitude
let longitude = '79'

if (process.argv.indexOf('-w') > -1) {
	longitude = argv[process.argv.indexOf('-w') -1];
	if(longitude > 180 || longitude < -180) {
		process.exit(1);
	}
}

if (process.argv.indexOf('-e') > -1) {
	longitude = arg[process.argv.indexOf('-e') -1] * 1;
	if (longitude > 180 || longitude < -180) {
		process.exit(1);
	}
}

//Declare timezone
var timezone = moment.tz.guess();

if (process.argv.indexOf('-z') > -1) {
	timezone = argv[process.argv.indexOf('-z') -1];
}

//Make a request

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&timezone=' + timezone);

//Get the data from the request

const data = await response.json();

//print data

if (process.argv.indexOf('-j') > -1) {
	console.log(data);
	process.exit(0);
}

//Days to retrieve weather
var days = 1;

if (process.argv.indexOf('-d') > -1) {
	days = argv[process.argv.indexOf('-d') - 1];
}

if (days == 0) {
	if (data.daily.precipitation_hours[days] == 0) {
		console.log('No need to wear galoshes')
	} else {
		console/log('Wear your galoshes')
	}
	console.log('today.')
	process.exit(0);
} else if (days > 1) {
	if (data.daily.precipitation_hours[days] == 0) {
		console.log('No need to wear galoshes')
	} else {
		console.log('Wear your galoshes')
	}
	console.log("in " + days + "days.")
	process.exit(0);
} else {
	if (data.daily.precipitation_hours[days] == 0) {
		console.log('No need to wear galoshes')
	} else {
		console.log('Wear your galoshes')
	}
	console.log("tomorrow.")
	process.exit(0);
}

//error
process.exit(1);
