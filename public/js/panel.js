let modalTrigger = document.getElementById('trigger-btn')
let toolbox = document.getElementsByClassName('oper-toolbox')

// For edit and delete of each input.
let click = 0;
function showEdit(x){
	if(!click){
		toolbox[x].style.display= 'block';
		click = 1;
	}else{
		toolbox[x].style.display= 'none';
		click = 0;
	}
}