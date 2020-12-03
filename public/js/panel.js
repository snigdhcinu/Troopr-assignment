let modalTrigger = document.getElementById('trigger-btn')
let toolbox = document.getElementsByClassName('oper-toolbox')
let cross = document.getElementById('cross')


// document.body.addEventListener('click', hideToolbox,true); 
modalTrigger.addEventListener('click',showCreateForm);
cross.addEventListener('click',hideCreateForm);



// For edit and delete of each input.
let click = 0;
let target;
function showEdit(x){
	target = x
	if(click == 0){
		toolbox[x].style.display= 'block';
		click = 1;
		return;
	}else{
		toolbox[x].style.display= 'none';
		click = 0;
	}
}

function hideToolbox(){
	if(click == 1){
		toolbox[target].style.display= 'none';
		click = 0;	
	}
	else{
		return;
	}
}


// For triggering form-modal
let junk = document.getElementById('main-body');
let hero = document.getElementById('modal-form-create');

let formClick = 0;

function showCreateForm(){
	if(formClick == 0){
		formClick = 1;
		junk.style.filter = 'brightness(0.3)';
		// document.getElementsByTagName('body')[0].style.filter = 'brightness(0.3)';
		hero.style.display = 'grid'
		document.getElementsByTagName('body')[0].style.display = 'flex'
	}
}

function hideCreateForm(){
	if(formClick == 1){
		formClick = 0;
		junk.style.filter = 'brightness(1)';
		// document.getElementsByTagName('body')[0].style.filter = 'brightness(1)';
		hero.style.display = 'none'
		document.getElementsByTagName('body')[0].style.display = 'block'
	}
}
