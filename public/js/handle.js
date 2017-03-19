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

    // startTimer = function () {
        resize();
    // };

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
            if (left <= parent_width && left + unit >= parent_width) {
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
    };

    /**
     *
     * @param keyCode
     */
    function showArrow(keyCode) {
        if (keyCode == 2) {
            $('.handler>img').hide();
            $('#arr_right').show();
        }
        else if (keyCode == 1) {
            $('.handler>img').hide();
            $('#arr_left').show();
        }
        else if (keyCode == 0) {
            $('.handler>img').hide();
            $('#arr_top').show();
        } else {
            $('.handler>img').hide();
            $('#arr_off').show();
        }
    };

    /**
     *
     */
    function moveSub() {
        var b_new = checkReorderItem();

        if (fDirection == 1) {		// move left
            if (b_new && fDirection != tmp_direction_flag) {
                for (var i=0;i<h_count;i++) {
                    var val = $('*[data-subitem="'+i+'"]');
                    val.css('left', (i*width)+'px');
                }
                fDirection = tmp_direction_flag;
                $('.img_car').hide();
                $('#img_car_' + carImages[fDirection]).show();
            } else {
                $.each($('.div-part'), function (key, val) {
                    $(val).css('left', '+='+unit+'px');
                    if (b_new) {
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
            if (b_new && fDirection != tmp_direction_flag) {
                $.each($('.div-part'), function (key, val) {
                    var item = $(val).attr('data-subitem');
                    var new_val = (item == 0) ? h_count-1 : item-1;
                    $(val).attr('data-subitem', new_val);
                    $(val).css('left', (width*new_val)+'px');
                });
                fDirection = tmp_direction_flag;
                $('.img_car').hide();
                $('#img_car_' + car_images[fDirection]).show();
            } else {
                $.each($('.div-part'), function (key, val) {
                    $(val).css('left', '-='+unit+'px');
                    if (b_new) {
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
            if (b_new && fDirection != tmp_direction_flag) {
                for (var i=0;i<v_count;i++) {
                    var val = $('*[data-item="'+i+'"]');
                    val.css('top', (i*height)+'px');
                }
                fDirection = tmp_direction_flag;
                $('.img_car').hide();
                $('#img_car_' + car_images[fDirection]).show();
            } else {
                $.each($('.sub-parent'), function (key, val) {
                    $(val).css('top', '+='+unit+'px');
                    if (b_new) {
                        var item = $(val).attr('data-item');
                        var new_val = (item + 1) % v_count;
                        $(val).attr('data-item', new_val);
                        if (new_val == 0) {
                            var top = parseFloat($(val).css('top'));
                            $(val).css('top', (top-height*v_count)+'px');
                        }
                    }
                });
            }
        }

        // display the instructions
        if (b_new && (subcount - tcount) > 1) {
            if (route[route_id] != fDirection) {
                console.log(route_id + " wrong : " + route[route_id] + "," + fDirection);
            }
            else {
                console.log(route_id + " right : " + route[route_id] + "," + fDirection);
                correct_route ++;
            }
            route_id ++;
            showArrow(undefined);

            subcount = tcount;
        }
        else if (tcount == subcount - 70) {
            showArrow(route[route_id]);
        }

        if ((--tcount) <= 0) {		// stop the timer when the time is up
            clearInterval(tid);
            $('#emergenteCuestionario').show();
            $('#textoA').text('Score : ' + correct_route + '/16');
        }
        var sec = parseInt(tcount*ms_interval / 1000);
        var msec = parseInt((tcount*ms_interval - sec*1000) / 10);
        if (sec < 10) sec = "0" + sec;
        if (msec < 10) msec = "0" + msec;
        $('.car-time > span').text(sec+":"+msec);

    };

    setInterval(moveSub, ms_interval);

});

