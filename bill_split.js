var collaboratorsList = document.querySelector ("#CollaboratorNames");
var inputName = document.querySelector('#name');
var inputPrice = document.querySelector('#price');
var submit = document.querySelector('.submit');
var settle_btn = document.querySelector('.settleUp');
var settle_list = document.querySelector('#settle_list');

class user {
	constructor (name, payment) {
		this.name = name,
		this.payment = payment;
	}
}

var users = [];
var total_amt = 0;

// fetch the group name from './my_group.ejs'
var group_name;

function collaborator_list_item (username, amt) {
	var node = document.createElement('li');
	var textnode = document.createTextNode(username + ' PAYED ' + amt);
	node.appendChild(textnode);
	return node;
}

submit.addEventListener('click', function () {
	if (inputName.value != '' && inputPrice.value != '') {
		// added list item in UL
		var name = new String (inputName.value.toUpperCase());
		var price = new Number(inputPrice.value);
		collaboratorsList.appendChild(collaborator_list_item (name, price));
		
		users.push (new user(name, price));
		total_amt += price;

		inputName.value = '';
		inputPrice.value = '';
	}
});

function settle_amt_list_item (user1, user2, amt) {
	var node = document.createElement('li');
	var textnode = document.createTextNode(user1 + ' PAYS ' + amt + ' TO ' + user2);
	node.appendChild(textnode);
	return node;
}

settle_btn.addEventListener ('click', function () {
	console.log(settle_list.length);
	while (settle_list.firstChild) {
	    settle_list.removeChild(settle_list.lastChild);
	}
	// settle amount algorithm
	var per_person_cost = total_amt / users.length;
	var sender = [];
	var reciever = [];
	
	for (var i = 0; i < users.length; ++i) {
		var settle_amt = users[i].payment - per_person_cost;
		if (settle_amt == 0) 
			continue;
		else if (settle_amt < 0) {
			sender.push(new user(users[i].name, -1 * settle_amt));
			// sender.push(-1 * settle_amt);
			// sender_name.push(names[i]);
		} else {
			reciever.push(new user(users[i].name, settle_amt));
			// reciever.push(settle_amt);
			// reciever_name.push(names[i]);
		}
	}

	function eventSorter(a, b) {
	    if (a.start == b.start) {
	        return 0;
	    } else {
	        return a.start < b.start ? -1 : 1;
	    }
	}

	reciever.sort(eventSorter);
	sender.sort(eventSorter);
	var i = reciever.length - 1, j = 0, flag = true;
	while (i >= 0 && j < sender.length) {
		// sender[j] will pay $price to receiver[i]
		flag = false;
		if (reciever[i].payment >= sender[j].payment) {
			reciever[i].payment -= sender[j].payment;		// deduct price for algorithm to run
			settle_list.appendChild (settle_amt_list_item (sender[j].name, reciever[i].name, sender[j].payment));
			++j;
		} else {
			settle_list.appendChild (settle_amt_list_item (sender[j].name, reciever[i].name, reciever[i].payment));
			--i;
		}
	}
	if (flag) {
		var node = document.createElement('li');
		var textnode = document.createTextNode('NO TRANSACTIONS');
		node.appendChild(textnode);
		settle_list.appendChild (node);
	}
});