$(function() {

var $newTask = $('#new-task');
var $taskName = $('#task-name');
var $taskDesc = $('#task-desc');
var $taskDueDay = $('#task-due-day');
var $taskDueMonth = $('#task-due-month');
var $todoList = $('#todo-list');
var $completedList = $('#completed-list');
var $todoItems = $('.todo');
var allItems = [{task: 'This homework', desc: 'I want to learn', due: new Date(2015, 5, 29), completed: false},
			 	 {task: 'Work out', desc: 'to stay fit', due: new Date(2015, 5, 29), completed: false},
			 	 {task: 'Celebrate the 4th!', desc: "We're going to have a BBQ in our backyard! Buy meat...", due: new Date(2015, 6, 4), completed: false}
			 	 ]

// Displays all tasks in allItems
function displayTasks() {
	$.each(allItems, function(i, v) {
		//Appends new task and separates with lines
		if(this != allItems[allItems.length - 1]) {
			$todoList.append("<li><b>" + this.task + "</b><span class='date'>" + this.due.toDateString() + "</span> <ul class='notes'> " + this.desc + '</ul></li><hr class="inner">');
		}
		else {
			$todoList.append("<li><b>" + this.task + "</b><span class='date'>" + this.due.toDateString() + "</span> <ul class='notes'> " + this.desc + '</ul></li>');
		}
	});

	dueSoon();
	dueThisWeek();
	dueClear();
}

//Clears the fields
function clearFields () {
	$taskName.val('');	
	$taskDesc.val('');
	$taskDueDay.val('');
	$taskDueMonth.val('');
}

//Function to remove 'hr's
function removeHR(input, liIn) {
	if (liIn == (input.children('li').length)) {
		input.children('hr').filter(':last').remove();
	}
	else if (liIn == 0) {
		input.children('hr').filter(':first').remove();
	}
	else {	
		input.children('hr')[liIn - 1].remove();
	}
}

//Changes task to red if due in less than one day.
function dueSoon() {
	$.each($('li'), function(i,v) {
			if( (allItems[i].due.getTime() - Date.now()) < 86400000 ) {
				$(this).find('span').addClass('due-soon');
			}
		});
}

//Changes task to orange if due in less than one week.
function dueThisWeek() {
	$.each($('li'), function(i,v) {
			if( (allItems[i].due.getTime() - Date.now()) < (86400000*7) ) {
				$(this).find('span').addClass('due-this-week');
			}
		});
}

//Changes task to green if due greater than one week
function dueClear() {
	$.each($('li'), function(i,v) {
			if( (allItems[i].due.getTime() - Date.now()) >= (86400000*7) ) {
				$(this).find('span').addClass('due-clear');
			}
		});
}

//runs the displayTasks function
displayTasks();

//Submit - Adds new tasks
$newTask.on('submit', function(event) {
	event.preventDefault();

	if($todoList.find('li').length >=1) {
		//Adds the task and desc to list
		var tempDate = new Date(2015, ($taskDueMonth.val() - 1), $taskDueDay.val());
		$todoList.append("<hr class='inner'><li><b>" + $taskName.val() + "</b><span class='date'>" + tempDate.toDateString() + "</span> <ul class='notes'>" + $taskDesc.val() + "</ul></li>");
	}
	else {
		//Adds the task and desc to list
		var tempDate = new Date(2015, ($taskDueMonth.val() - 1), $taskDueDay.val());
		$todoList.append("<li><b>" + $taskName.val() + "</b><span class='date'>" + tempDate.toDateString() + "</span> <ul class='notes'>" + $taskDesc.val() + "</ul></li>");
	}

	//Adds the task to the array of objects 'allItems'
	var newItem = {task: $taskName.val(), desc: $taskDesc.val(), due: tempDate, completed: false}
	allItems.push(newItem);

	//Updates due functions
	dueSoon();
	dueThisWeek();
	dueClear();

	//resets the fields
	clearFields();

	$taskName.focus();

});

//When clicked, task moves to completed section
$todoList.on('click', "li", function() {
	var liIndex = ($(this).index() / 2);

	//Move to completed and add completed class.
	$(this).addClass('completed');
	$(this).find('span').addClass('completed');
	if ($completedList.find('li').length >= 1) {
		$completedList.append('<hr class="inner">');
		$completedList.append($(this));
	}
	else {
		$completedList.append($(this));
	}

	// Remove <hr>s
	removeHR($todoList, liIndex);
});

//Removes item permanently from list upon click and confirmation
$completedList.on('click', "li", function() {
	var r = confirm("Do you really want to permanantly delete this completed to-do?");
	if (r) {
		var liIndex = ($(this).index() / 2);
		
		//Move to completed
		$(this).remove();

		// Remove <hr>s
		removeHR($completedList, liIndex);
	}
});


})