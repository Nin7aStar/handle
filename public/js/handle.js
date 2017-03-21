var KEY_UP = 38,
    KEY_LEFT = 37,
    KEY_RIGHT = 39;

var carImages = ['top', 'left', 'right'];
var startTimer;
var route;
var correct_route = 0;

/**
 *
 */
$(document).ready(function () {
    var boundX, boundY;
    var carWidth, carHeight;
    var v_count = 3, h_count = 3;
    var fDirection = 0;     // 0: up, 1: left, 2: right
    var tmp_direction_flag = 0;     // default: 0(up)
    var unit = 2.7;
    var ms_interval = 30;
    var t_ms = 60 * 1000 / ms_interval;
    var tcount = t_ms, subcount = t_ms, route_id = 0;

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
    };

    resize();
    // startTimer = setInterval(moveSub, ms_interval);
    setInterval(moveSub, ms_interval);

    /**
     *
     * @returns {number}
     */
    function checkReorderItem() {
        if (fDirection == 0) {		// move up
            var top = parseFloat($('*[data-item="0"]').css('top'));
            if (top <= 0 && top + unit >= 0) {
                return 1;
            }
        }
        else if (fDirection == 1) {		// move left
            var left = parseFloat($('*[data-subitem="2"]').css('left'));
            if (left <= boundX && left + unit >= boundX) {
                return 1;
            }
        }
        else if (fDirection == 2) {		// move right
            var left = parseFloat($('*[data-subitem="0"]').css('left'));
            if (left + width >= 0 && left + width - unit <= 0) {
                return 1;
            }
        }
        return 0;
    }

/*    document.onkeydown = function (event) {
        event = event || window.event;
        switch (event.keyCode) {
            case KEY_UP:
                bNew = checkReorderItem();
                // upArrowPressed();
                break;
            case KEY_LEFT:
                bNew = checkReorderItem();
                // leftArrowPressed();
                break;
            case KEY_RIGHT:
                bNew = checkReorderItem();
                // rightArrowPressed();
                break;
        }
    }*/

    /**
     * action
     */
    function moveSub() {
        var bNew = checkReorderItem();

        document.onkeydown = function (event) {
            event = event || window.event;
            switch (event.keyCode) {
                case KEY_UP:
                    fDirection = 0;
                    break;
                case KEY_LEFT:
                    fDirection = 1;
                    break;
                case KEY_RIGHT:
                    fDirection = 2;
                    break;
            }
        }

        if (fDirection == 1) {		// move left
            if (bNew && fDirection != tmp_direction_flag) {
                for (var i=0;i<h_count;i++) {
                    var val = $('*[data-subitem="'+i+'"]');
                    val.css('left', (i*width)+'px');
                }
                fDirection = tmp_direction_flag;
                $('.img_car').hide();
                $('#img_car_' + carImages[fDirection]).show();
            } else {
                $.each($('.way'), function (key, val) {
                    $(val).css('left', '+='+unit+'px');
                    if (bNew) {
                        var item = $(val).attr('data-subitem');
                        var new_val = (item + 1) % h_count;
                        $(val).attr('data-subitem', new_val);
                        if (new_val == 0) {
                            var left = parseFloat($(val).css('left'));
                            $(val).css('left', (left-width*h_count)+'px');
                        }
                    }
                });
            }
        }
        else if (fDirection == 2) {		// move right
            if (bNew && fDirection != tmp_direction_flag) {
                $.each($('.div-part'), function (key, val) {
                    var item = $(val).attr('data-subitem');
                    var new_val = (item == 0) ? h_count-1 : item-1;

                    $(val).attr('data-subitem', new_val);
                    $(val).css('left', (width*new_val)+'px');
                });
                fDirection = tmp_direction_flag;
                $('.img_car').hide();
                $('#img_car_' + carImages[fDirection]).show();
            } else {
                $.each($('.way'), function (key, val) {
                    $(val).css('left', '-='+unit+'px');
                    if (bNew) {
                        var item = $(val).attr('data-subitem');
                        var new_val = (item == 0) ? h_count-1 : item-1;
                        $(val).attr('data-subitem', new_val);
                        if (new_val == h_count - 1) {
                            var left = parseFloat($(val).css('left'));
                            $(val).css('left', (left+width*h_count)+'px');
                        }
                    }
                });
            }
        }
        else if (fDirection == 0) {		// move up
            if (bNew && fDirection != tmp_direction_flag) {
                for (var i = 0; i < v_count; i++) {
                    var val = $('*[data-item="' + i + '"]');
                    val.css('top', (i * height) + 'px');
                }
                fDirection = 0;
                $('.img_car').hide();
                $('#img_car_' + carImages[fDirection]).show();
            } else {
                $.each($('.way'), function (key, val) {
                    $(val).css('top', '+=' + unit + 'px');
                    if (bNew) {
                        var item = $(val).attr('data-item');
                        var new_val = (item + 1) % v_count;
                        $(val).attr('data-item', new_val);
                        if (new_val == 0) {
                            var top = parseFloat($(val).css('top'));
                            $(val).css('top', (top - height * v_count) + 'px');
                        }
                    }
                });
            }
        }
    }
});

