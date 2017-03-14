var x = 0;

setInterval(function () {
    x += 5;
    $('#highway').animate({'top': x + 'px'}, 50);
}, 90);

var moveTop = function() {
    setInterval(function () {
        x += 5;
        $('#highway').animate({'top': x + 'px'}, 50);
    }, 90);
};

var moveLeft = function () {
    setInterval(function () {
        x += 5;
        $('#highway').animate({'left': x + 'px'}, 50);
    }, 90);
};

var moveRight = function () {
    setInterval(function () {
        x += 5;
        $('#highway').animate({'right': x + 'px'}, 50);
    }, 90);
};