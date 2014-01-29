(function(){
	// Initialization code
	document.body.style.background = "#000";
	var sWidth = window.innerWidth;
	var sHeight = window.innerHeight;

	var object = {
		x: Math.random()*sWidth,
		y: Math.random()*sHeight,
		xi: Math.random()*10,
		yi: Math.random()*10,
		div: document.createElement('div')
	};

	object.div.style.width = '100px';
	object.div.style.height = '100px';
	object.div.style.position = 'absolute';
	object.div.style.background = '#f00';
	document.body.appendChild(object.div);

	var render = function(){
		// Draw process operations
		object.xi = (object.x + object.xi + 100 < sWidth &&
			object.x + object.xi > 0 ?
			object.xi : object.xi*-1);
		object.yi = (object.y + object.yi + 100 < sHeight &&
		 	object.y + object.yi > 0 ?
		 	object.yi : object.yi*-1);

		object.x += object.xi;
		object.y += object.yi;

		object.div.style.top = Math.floor(object.y) + 'px';
		object.div.style.left = Math.floor(object.x) + 'px';
	};

	var tick = function(){
		// Animation call
		render();
		setTimeout(tick,10);
	};

	tick();
})();
