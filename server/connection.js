var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '114.115.132.9',
  user     : 'admin',
  password : 'chonglou159',
  database : 'lanlan'
});
connection.connect();

function query(sql,doSuccess,doFaild){
	console.log("connection.js--sql:"+sql);
	connection.query(sql, function (error, results, fields) {
		debugger;
		console.log("results:"+JSON.stringify(results));
	  if (error) {
	  	if(doFaild!=undefined){
	  		doFaild(error);	
	  	}
	  	throw error;
	  }
	  doSuccess(results);
	});
}

module.exports = {query:query}