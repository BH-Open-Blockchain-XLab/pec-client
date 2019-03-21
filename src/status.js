class Status{
  constructor(statusCode){
    const code = Number(statusCode);

    this.code = code;
    this.success = false;
	this.invalidSession = false;
	this.serverFault = false;
	this.info = "undefined code";

    const invalidSessions = [811, 825, 826, 827, 831, 832, 834];
	const infoMap = new Map([
	  [711, "Service in progress."],
	  [712, "Database connected."],
	  [713, "Global data fetched."],
	  [714, "Global data persisted into disk."],
	  [721, "User Signed up."],
	  [722, "User logged in."],
	  [723, "User account information fetched."],
	  [724, "User logged out."],
	  [725, "User still alive (heartbeat query)."],
	  [731, "Transaction pool information fetched."],
	  [732, "Transaction purchased."],
	  [733, "Transaction deliveried."],
	  [734, "Transaction still valid (tx verification)."],

	  [811, "Invalid session ID (fetching global data)."],
	  [812, "Global data persistence failed."],
	  [821, "Account name already been in use."],
	  [822, "Password not qualified."],
	  [823, "Account name does not exist."],
	  [824, "Incorrect password."],
	  [825, "Illegal session ID (account info)."],
	  [826, "User dead (heartbeat query)."],
	  [827, "Illegal session ID (log out)."],
	  [831, "Illegal session ID (pool info)."],
	  [832, "Illegal session ID (purchase)."],
	  [833, "Transaction not available (transaction validity query)."],
	  [834, "Illegal session ID (delivery)."],
	  [835, "Transaction purchased (tx verification)."],
	  [836, "Transaction undefined (tx verification)"],
      
	  [911, "Server port already been in use."],
	  [912, "Database connection failed."]
	]);

    if (code >= 700 && code < 800){
      this.success = true;
	} 
	if(code >= 900 && code < 1000){
	  this.serverFault = true;
	}

	if (invalidSessions.includes(code)){
      this.invalidSession = true;
	}
	if (infoMap.get(code)){
	  this.info = infoMap.get(code);
	}
  }
}

module.exports = Status;
