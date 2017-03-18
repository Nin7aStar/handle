var KEY_UP = 38,
    KEY_LEFT = 37,
    KEY_RIGHT = 39;

var carImages = ['top', 'left', 'right'];
/**
 *
 */
$(function () {
    var boundX, boundY;
    var carWidth, carHeight;
    var v_count = 3, h_count = 3;
    var unit = 2.7;
    var ms_interval = 30;
    var t_ms = 60 * 1000 / ms_interval;
    var x = 0;

    /**
     * checking the resize of screen initially
     */
    function resize() {
        var mainWidth = parseInt($(window).width()),
            mainHeight = parseInt($(window).height());

        // view area coordinate (x, y : width, height)
        boundX = boundY = Math.min(mainWidth, mainHeight) - 150;

        // size of car
        carWidth = boundX / 10;
        carHeight = boundY / 10;

        width = boundX / (h_count - 1);
        height = boundY / (v_count - 1);
        unit = width / t_ms * 16.5;

        // set the size of car
        $('.img_car')
            .width(carWidth)
            .height(carHeight);
        $('.car-body')
            .css('right', ((boundX - carWidth)/2)+'px')
            .css('top', ((boundY - carHeight)/2)+'px');

        // set the way
        $.each($('.way'), function (k, v) {
            $(v).height(height)
                .css('top', (k * height) - 200);
            $.each($('.div-part', $(v)), function (key, val) {
                $(val).width(width)
                    .height(height)
                    .css('left', key * width);
            });
        });

        var margin = (mainWidth - boundX) / 2;
        var top = (mainHeight - boundY) / 2;
        $('#view-area')
            .width(boundX)
            .height(boundY)
            .css('left', margin + 'px')
            .css('top', top + 'px');

        var ctlWidth = parseInt(boundX * 9 / 16),
            arrow_pan_width = parseInt(ctlWidth * 2 / 3);
        $('#img_handler').width(ctlWidth);

        $('.handler')
            .width(arrow_pan_width);

        $('.car-time')
            .css('left', ctlWidth/10 + 'px')
            .css('top', ctlWidth/635*449/5 + 'px');
        $('.car-time>span')
            .css('font-size', ctlWidth/9 + 'px');

        $('body').scrollTop(0);
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
});

