function addEvent(ele, event, handle) {
	if (ele.addEventListener) {
		ele.addEventListener(event, handle, false);
	} else if (ele.attachEvent) {
		ele.attachEvent(ele, 'on' + event, handle);
	} else {
		ele['on' + event] = handle;
	}
}

window.onload = function() {
	var container = document.getElementById('container');
	var list = document.getElementById('list');
	var buttons = document.getElementsByTagName('span');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var index = 1;

	var timer = setInterval(function() {
		animate(-1024);
		if (index == 4) {
			index = 1;
		} else {
			index = index + 1;
		}
		showButton();
	}, 1000);

	function showButton() {
		var length = buttons.length;
		for (var i = 0; i < length; i++) {
			if (buttons[i].className == 'on') {
				buttons[i].className = '';
				break;
			}
		}
		buttons[index - 1].className = 'on';
	}

	function animate(offset) {
		list.style.left = list.offsetLeft + offset + 'px';
		if (list.offsetLeft > -1024) {
			list.style.left = -4096 + 'px';
		}
		if (list.offsetLeft < -4096) {
			list.style.left = -1024 + 'px';
		}
	} 

	addEvent(prev, 'click', function(e) {
		e.preventDefault();
		if (index == 1) {
			index = 4;
		} else {
			index = index - 1;
		}
		showButton();
		animate(1024);
	});
	addEvent(next, 'click', function(e) {
		e.preventDefault();
		if (index == 4) {
			index = 1;
		} else {
			index = index + 1;
		}
		showButton();
		animate(-1024);
	});

	addEvent(container, 'mouseover', function(e) {
		e.preventDefault();
		clearInterval(timer);
	});

	addEvent(container, 'mouseout', function(e) {
		e.preventDefault();
		timer = setInterval(function() {
		animate(-1024);
		if (index == 4) {
			index = 1;
		} else {
			index = index + 1;
		}
		showButton();
	}, 1000);
	});

	for (var i = 0; i < buttons.length; i++) {
		addEvent(buttons[i], 'click', function(i) {
			return function() {
				if (this.className == 'on') {
					return;
				}
				var myIndex = parseInt(this.getAttribute('index'));
				var offset = -1024 * (myIndex - index);
				index = myIndex;
				showButton();
				animate(offset);
			}
		}(i));
	}
}