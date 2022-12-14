#!/usr/bin/env node

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
	process.exit(0);
}

//Declare timezone
let timezone = moment.tz.guess()

if (args.z) {
	timezone = args.z
}

//declare latitude
let latitude = 1

if (args.n) {
	latitude = args.n
} else if (args.s) {
	latitude = -args.s
} else {
	console.log('latitude must be in range')
}


//declare longitude
let longitude = 1

if (args.e) {
	longitude = args.e
} else if (args.w) {
	longitude = -args.w
}else {
	console.log('longitude must be in range')
}


//Make a request

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=temperature_2m&daily=precipitation_hours&current_weather=true&timezone=' + timezone);

//Get the data from the request

const data = await response.json()


//Days to retrieve weather
let days = 1;

if (args.d) {
	days = args.d
}

if (args.d == 0) {
	days = 0
}

//print data

if (args.j) {
	console.log(data)
	process.exit(0);
} else {
	let result = ""
	if(data.daily.precipitation_hours[days] > 0) {
		console.log("You might need your galoshes");
	} else {
		console.log("You will not need your galoshes");
	}
	if (days == 0) {
		console.log("today.")
	} else if (days > 1) {
		console.log("in " + days + " days.")
	} else {
		console.log("tomorrow.")
	}
}



