var mousePos = {};
var divCount = 0;

	document.onmousemove = mouseMove; 
	function mouseMove(ev){ 
	    ev           = ev || window.event; 
	    mousePos = mouseCoords(ev);
	    if(divCount < 100){
            startSpawn();
            startSpawn();
	    }
	} 
	 
	function mouseCoords(ev){ 
	    if(ev.pageX || ev.pageY){ 
	        return {x:ev.pageX, y:ev.pageY}; 
	    } 
	    return { 
	        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
	        y:ev.clientY + document.body.scrollTop  - document.body.clientTop 
	    }; 
	} 
	
var startSpawn = function(){
    divCount++;
    console.log('divCount: ' + divCount);
    var centerX = mousePos.x;
    var centerY = mousePos.y;

    MyDemo.spawnDiv(centerX, centerY, randomColor());
    function randomColor() {
        return 'rgb(' + getColor() + ',' + getColor() + ',' + getColor() + ')';
        
        function getColor() {
            return Math.floor(Math.random() * 256);
        }
    }
};

MyDemo = {};
MyDemo.spawnDiv = function (startX, startY, color) {
    var width = (Math.random() * 50) || 1,
        height = width;
    var divLoc = {};
    divLoc.x = startX; 
    divLoc.y = startY;
    var deltaX = 2.5 - Math.floor(Math.random() * 5) || 1; // -5 to 5
    var deltaY = 2.5 - Math.floor(Math.random() * 5) || 1;
    var gravity = 0.025;
    var newDiv = document.createElement('div');
    newDiv.style.display = 'none';
    newDiv.style.background = color;
    newDiv.style.position = 'absolute';
    newDiv.style.width = width + 'px';
    newDiv.style.height = height + 'px';
    newDiv.style.top = startY + 'px';
    newDiv.style.left = startX + 'px';
    newDiv.style.MozBorderRadius = (Math.floor(Math.random() * 60)+10) + 'px';
    newDiv.style.borderRadius = (Math.floor(Math.random() * 60)+10) + 'px';
    
    function stepAhead() {
    

        var newY = divLoc.y - deltaY;
        var newX = divLoc.x - deltaX;
        
        var gY = (newY - mousePos.y) / 2000;
        var gX = (newX - mousePos.x) / 2000;
        
        deltaY += gY;
        deltaX += gX;
        
        var currentWidth = parseInt(newDiv.style.width, 10);
        var currentHeight = parseInt(newDiv.style.height, 10);
        
        if (newY < 0 || newY + currentHeight > window.innerHeight) {
            deltaY *= 0.0005;
            deltaY = -deltaY;
            newY = divLoc.y + deltaY/currentHeight;
        }
        
        if (newX < 0 || newX + currentWidth > window.innerWidth) {
            deltaX *= 0.0005;
            deltaX = -deltaX;
            newX = divLoc.x + deltaX/currentWidth;
        }
        
        if (newY + currentHeight < 0 || newY > window.innerHeight || newX + currentWidth < 0 || newX > window.innerWidth) {
            if (newDiv.parentNode) {
                var oldDiv = newDiv.parentNode.removeChild(newDiv);
                divCount--;
                console.log('divCount: ' + divCount);
            }
        }
        divLoc.x = newX;
        divLoc.y = newY;
        newDiv.style.left = Math.floor(divLoc.x) + 'px';
        newDiv.style.top = Math.floor(divLoc.y) + 'px';
        animationTimer = setTimeout(function() {
            if(newDiv){
                stepAhead();
            }
        }, 10);
    }
    
    var animationTimer = setTimeout(function() {
        stepAhead();
        newDiv.style.display = 'block';
    }, 10);
    document.body.appendChild(newDiv);   
}
