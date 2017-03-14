var x = 0;

// view area coordinate (x, y : width, height)
var boundX = document.getElementById('view-area').offsetWidth;
var boundY = document.getElementById('view-area').offsetHeight;

// arrow keypress


setInterval(function () {
    x += 5;
    $('#highway').animate({'top': x + 'px'}, 50);
}, 90);

// move to top
var moveTop = function() {
    setInterval(function () {
        x += 5;
        $('#highway').animate({'top': x + 'px'}, 50);
    }, 90);
};

// move to left
var moveLeft = function () {
    setInterval(function () {
        x += 5;
        $('#highway').animate({'left': x + 'px'}, 50);
    }, 90);
};

// move to right
var moveRight = function () {
    setInterval(function () {
        x += 5;
        $('#highway').animate({'right': x + 'px'}, 50);
    }, 90);
};