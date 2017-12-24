export let update = (accountsAPI) => {

	let currentState = {
		loggedInUser: accountsAPI.checkLogin()
	}
	
	return currentState;
};