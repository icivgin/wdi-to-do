$(function() {

var $newTask = $('#new-task');
var $taskName = $('#task-name');
var $taskDesc = $('#task-desc');
var $taskDueDay = $('#task-due-day');
var $taskDueMonth = $('#task-due-month');
var $todoList = $('#todo-list');
var $todoItems = $('.todo');
var allItems = [{task: 'This homework', desc: 'I want to learn', due: new Date(2015, 5, 29), completed: false},
			 	 {task: 'Work out', desc: 'to stay fit', due: new Date(2015, 5, 29), completed: false},
			 	 {task: 'Celebrate the 4th!', desc: "We're going to have a BBQ in our backyard! Buy meat...", due: new Date(2015, 6, 4), completed: false}]

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
}

//Clears the fields
function clearFields () {
	$taskName.val('');	
	$taskDesc.val('');
	$taskDueDay.val('');
	$taskDueMonth.val('');
}

//Changes task to red if due in less than one day.
function dueSoon() {
	$.each($('li'), function(i,v) {
			if( (allItems[i].due.getTime() - Date.now()) < 86400000 ) {
				$(this).addClass('due-soon');
			}
		});
}

//runs the displayTasks function
displayTasks();

//Submit - Adds new tasks
$newTask.on('submit', function(event) {
	event.preventDefault();

	//Adds the task and desc to list
	var tempDate = new Date(2015, ($taskDueMonth.val() - 1), $taskDueDay.val());
	console.log(tempDate);
	$todoList.append("<hr class='inner'><li><b>" + $taskName.val() + "</b><span class='date'>" + tempDate.toDateString() + "</span> <ul class='notes'>" + $taskDesc.val() + "</ul></li>");

	//Adds the task to the array of objects 'allItems'
	var newItem = {task: $taskName.val(), desc: $taskDesc.val(), due: tempDate, completed: false}
	allItems.push(newItem);

	dueSoon();

	//resets the fields
	clearFields();
});

//When clicked, task is marked as completed
$todoList.on('click', "li", function() {
	$(this).addClass('completed');
	$(this).find('span').addClass('completed');
});


})