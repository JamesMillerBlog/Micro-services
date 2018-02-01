module.exports = {
	googleClientID: '357607132668-n18akdbfig1ma47fon9u6hc4b1ku2pkv.apps.googleusercontent.com',
	googleClientSecret: '47VhhX8Tii8pe_br8PUFS6OA',
	googleRedirectURI: 'http://localhost/auth/google/callback',
	sessionSecret: 'shhhhsecret',
	redisPort: 6379,
	redisHost: 'accounts-redis',
	redisPW: 'accountsdb',
	redisTTL: 1209600 // 2 weeks (calc below)
};

/*
	(60 seconds = 1 min) * 60 (minutes in an hour) = 3600 seconds (1 hours worth of seconds) 
	
	3600 * 24 (hours in a day) = 86400 (minutes in a day)

	86400 * 7 (days in a week) = 604800 (minutes in a week)

	604800 * 2 (weeks) = 1209600 (minutes in 2 weeks)
*/