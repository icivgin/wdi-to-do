$(function() {

	var $newTask = $('#new-task');
	var $taskName = $('#task-name');
	var $todoList = $('#todo-list');
	var $todoItems = $('.todo');
	var $taskDesc = $('#task-desc');

	$newTask.on('submit', function(event) {
		event.preventDefault();
		$todoList.append("<li><b>" + $taskName.val() + ":</b> " + $taskDesc.val() + "</li>");
		clearFields();
	});

	$todoList.on('click', "li", function() {
		var el = $(this);
		el.addClass('completed');
	})

function clearFields () {
	$taskName.val('');	
	$taskDesc.val('');
}


})