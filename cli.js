#!/user/bin/env node

import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

const args = minimist(process.argv.slice(2))
//console.log(args)

//help text

if (args.h) {
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

if (args.n) {
	latitude = args.n
}

if (args.s) {
	latitude = -args.s
}


//declare longitude
let longitude = '79'

if (args.e) {
	longitude = args.e
}

if (args.w) {
	longitude = -args.w
}

//Declare timezone
var timezone = moment.tz.guess();

if (args.z) {
	timezone = args.z;
}

if (args.t) {
	timezone = args.t;
}

//Make a request

const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&hourly=temperature_2m,precipitation&daily=precipitation_hours&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=" + timezone);

//Get the data from the request

const data = await response.json();

//print data

if (args.j) {
	console.log(data);
}

//Days to retrieve weather
const days = args.d

if (days == 0) {
	if (data.daily.precipitation_hours[days] == 0) {
		console.log("No need to wear galoshes")
	} else {
		console/log("Wear your galoshes")
	}
	console.log("today.")
} else if (days > 1) {
	if (data.daily.precipitation_hours[days] == 0) {
		console.log("No need to wear galoshes")
	} else {
		console.log("Wear your galoshes")
	}
	console.log("in " + days + "days.")
} else {
	if (data.daily.precipitation_hours[days] == 0) {
		console.log("No need to wear galoshes")
	} else {
		console.log("Wear your galoshes")
	}
	console.log("tomorrow.")
}
