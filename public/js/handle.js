var KEY_UP = 38,
    KEY_LEFT = 37,
    KEY_RIGHT = 39;

var carImages = ['top', 'left', 'right'];
/**
 *
 */
$(function () {
    var carWidth, carHeight;
    var v_count = 3, h_count = 3;
    var unit = 2.7;
    var ms_interval = 30;
    var t_ms = 60 * 1000 / ms_interval;
    var x = 0;

    /**
     * checking the resize of screen initially
     */
    function resize(){
        //  window's size
        var mainWidth = parseInt($(window).width());
        var mainHeight = parseInt($(window).height());

        // view area coordinate (x, y : width, height)
        var boundX = parseInt(document.getElementById('view-area').offsetWidth) - 10;
        var boundY = parseInt(document.getElementById('view-area').offsetHeight) - 10;

        // size of car
        carWidth = boundX / 10;
        carHeight = boundY / 10;

        width = boundX / (h_count - 1);
        height = boundY / (v_count - 1);
        unit = width / t_ms * 16.5;

        // set the size of car
        // $('.img_car')
        //     .width(carWidth)
        //     .height(carHeight);
        $('.car-body')
            .css('right', ((boundX - carWidth)/2)+'px')
            .css('top', ((boundY - carHeight)/2)+'px');

        // set the way
        $.each($('.way'), function (k, v) {
            $(v).height(height)
                .css('top', k * height);
            $.each($('.div-part', $(v)), function (key, val) {
                $(val).width(width)
                    .height(height)
                    .css('left', key * width);
            });
        });

    }

    resize();

/*    setInterval(function () {
        x += 5;
        $('.way').animate({'top': x + 'px'}, 50);

        if (x > 800) {
            console.log("out of area");
            x = 0;
        }
    }, 90);*/

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

