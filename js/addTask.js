'use strict';

var toDo = document.querySelector('.to-do');
var toDoAdd = document.querySelector('.to-do__button-add');
var toDoEmpty = document.querySelector('.to-do__description-empty');
var toDoReadyTask = document.querySelector('.to-do__ready-tasks');

var toDoTaskCreate = document.querySelector('.task-create');

var toDoTaskCreateInput = document.querySelector('.task-create__input');
var toDoTaskCreateCancel = document.querySelector('.task-create__cancel');
var toDoTaskCreateSave = document.querySelector('.task-create__save');

var localCounter = 0;

toDoAdd.addEventListener('click', function() {
	toDoCreateSwitcher();
});

toDoTaskCreateCancel.addEventListener('click', function() {
	toDoCreateSwitcher();
	toDoTaskCreateInput.value = '';
});

toDoTaskCreateSave.addEventListener('click', function() {
	addNewTusk(toDoTaskCreateInput);
});

function toDoCreateSwitcher() {
	toDoTaskCreate.classList.toggle('display-none');
	toDo.classList.toggle('display-none');
};


function addNewTusk(toDoTaskCreateInput) {
	
	// check string
	if (checkString()) {

		var div = document.createElement("div");
		var p = document.createElement('p');
		var chooseItem = document.createElement('input');
		var buttonDelete = document.createElement('button');
		chooseItem.type = 'checkbox';

		p.textContent = toDoTaskCreateInput.value.trim();



		toDoTaskCreateInput.value = '';
		toDoCreateSwitcher();

		p.classList.add('task-description');
		chooseItem.classList.add('task-checkbox');
		buttonDelete.textContent = 'X';
		buttonDelete.classList.add('task-delete');
		div.classList.add('task-item');

		div.appendChild(chooseItem);
		div.appendChild(p);
		div.appendChild(buttonDelete);

		


		div.dataset.id = localCounter;
		addToLocal(p.textContent);


		toDoReadyTask.insertBefore(div, toDoReadyTask.firstChild);
		anyTaskItem();
		setDeleteButton();
		setCheckedButton();

	}
};


function checkString(flag) {
	var result = toDoTaskCreateInput.value.trim();
	if (result.length == 0) {
		allertEmptyField();
		return false;
	} else {
		return true;
	}
};

function allertEmptyField() {
	toDoTaskCreateInput.placeholder = 'Write some text!!!';
	setTimeout(function() {
		toDoTaskCreateInput.placeholder = '';
	}, 2500);
};

function anyTaskItem() {
	var number = document.getElementsByClassName('task-item');
	if (number.length <= 0) {
		toDoEmpty.classList.remove('display-none');
	} else {
		toDoEmpty.classList.add('display-none');
	}
};



function setDeleteButton() {

var btnDelete = document.querySelectorAll('.task-delete');

btnDelete.forEach(function (btn,i) {
        btn.addEventListener('click', function() {


	         let parent = btn.closest('.task-item');
	         deleteFromLocal(parent);



	         btn.parentNode.remove();
	         anyTaskItem();
	        });
    });

};



function setCheckedButton() {
	var btnCheck = document.querySelectorAll('.task-checkbox');

	btnCheck.forEach(function (btn,i) {
	        btn.addEventListener('click', function() {
	        	let section = btn.parentNode;
	        	
	        	if (btn.checked == true) {
	        		changeCheck(btn, true);
	        		section.classList.add('finished');
	        	} else {
	        		changeCheck(btn, false);
	        		section.classList.remove('finished');
	        	}
	        });
    });
};

// function for changing DIV background color and saving it in localStor
function changeCheck(btn, trueOrFalse) {
	let block = btn.closest('.task-item').dataset.id;
	var itemFromLocal = parseFromJSON(localStorage.getItem(block));
	localStorage.setItem(block, parseToJSON(block, itemFromLocal[0], trueOrFalse));
};

// check for any local data
if (localStorage.length >= 1) {

	localCounter = localStorage.getItem('itemVariable');

	for (var i = 0; i <= localCounter; i++) {
		let localTask = localStorage.getItem(i);
		if (localTask == null) {
			// if null then next iteration
		} else {
			createTaskFromLocalStorage(localTask, i);
		}
	}
}



function createTaskFromLocalStorage(localTask, i) {
	localTask = parseFromJSON(localTask);

	var div = document.createElement("div");
	var p = document.createElement('p');
	var chooseItem = document.createElement('input');
	var buttonDelete = document.createElement('button');
	chooseItem.type = 'checkbox';



	p.textContent = localTask[0];

	toDoEmpty.classList.add('display-none');



	p.classList.add('task-description');

	div.appendChild(chooseItem);

	chooseItem.checked = localTask[1];


	if (localTask[1] == true) {

		div.classList.add('finished');
	}

	chooseItem.classList.add('task-checkbox');



	div.appendChild(p);
	buttonDelete.textContent = 'X';
	div.appendChild(buttonDelete);
	buttonDelete.classList.add('task-delete');
	div.classList.add('task-item');

	div.dataset.id = i;

	toDoReadyTask.insertBefore(div, toDoReadyTask.firstChild);
	setDeleteButton();
	setCheckedButton();

};

function addToLocal(paragraph) {

	localStorage.setItem(localCounter, parseToJSON(localCounter, paragraph, false));

	localCounter++;
	localStorage.setItem('itemVariable', localCounter);
}


function deleteFromLocal(parent) {
	var parentID = parent.dataset.id;
	localStorage.removeItem(parentID);
};









function parseToJSON(id, paragraph, checked) {
		var object = {
			idObject : id,
			paragraphObject : paragraph,
			checked : checked
		}
		return JSON.stringify(object);
}


function parseFromJSON(localTask) {
	var object = JSON.parse(localTask);

	return [object.paragraphObject, object.checked];
}















//  button and function for deleting all localStorage
var deleteEverything = document.querySelector('.DELETTTT');

deleteEverything.addEventListener('click', function() {
	deleteAll();
});

function deleteAll() {
		localStorage.clear();
		location.reload();
}