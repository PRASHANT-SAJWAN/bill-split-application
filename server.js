const express = require ('express');
const app = express();
var bodyParser = require('body-parser');

// app.set ('view-engine', 'ejs');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded ({extended: true}));

app.engine('html', require('ejs').renderFile);

var groups_list = [];

app.get ('/', (req, res)=> {
	res.render ('index.ejs', {groups_list: groups_list});
});

// '/add_group' page get and post request
app.get ('/add_group', (req, res)=> {
	res.render('add_group.ejs');
});

app.post ('/add_group', (req, res)=> {
	try {
		groups_list.push (req.body.group_name);
		res.redirect ('/my_group');
	} catch {
		alert('error');
		res.redirect ('/');
	}
});

// '/my_group' page get and post request
app.get ('/my_group', (req, res)=> {
	res.render ('my_group.ejs', {groups_list: groups_list});
});

app.post ('/my_group', (req, res)=> {
	try {
		groups_list.push (req.body.group_name);
		res.redirect ('/my_group');
	} catch {
		alert('error');
		res.redirect ('/');
	}
});

// '/bill_split' page get and post request
app.get ('/my_group/bill_split', (req, res)=> {
	res.render('bill_split.ejs');
});

// undefined route
app.get ('/:thing', (req, res)=> {
	res.send ('<center><h1>404 Not Found!</h1></center>');
});
app.listen('3000');