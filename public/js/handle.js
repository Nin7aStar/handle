var KEY_UP = 38,
    KEY_LEFT = 37,
    KEY_RIGHT = 39;

var carImages = ['top', 'left', 'right'];

$(function () {
    var x = 0;

    // view area coordinate (x, y : width, height)
    var boundX = document.getElementById('view-area').offsetWidth;
    var boundY = document.getElementById('view-area').offsetHeight;

    setInterval(function () {
        x += 5;
        $('.way').animate({'top': x + 'px'}, 50);

        if (x > 800) {
            console.log("out of area");
            x = 0;
        }
    }, 90);

    // move to top
    var moveTop = function () {
        setInterval(function () {
            x += 5;
            $('.way').animate({'top': x + 'px'}, 50);
        }, 90);
    };

    // move to left
    var moveLeft = function () {
        setInterval(function () {
            x += 5;
            $('.way').animate({'left': x + 'px'}, 50);
        }, 90);
    };

    // move to right
    var moveRight = function () {
        setInterval(function () {
            x += 5;
            $('.way').animate({'right': x + 'px'}, 50);
        }, 90);
    };
});

