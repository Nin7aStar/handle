var KEY_UP = 38,
    KEY_LEFT = 37,
    KEY_RIGHT = 39;

var carImages = ['top', 'left', 'right'];

$(function () {
    var x = 0;

    // view area coordinate (x, y : width, height)
    var boundX = document.getElementById('view-area').offsetWidth;
    var boundY = document.getElementById('view-area').offsetHeight;

    /**
     *
     */
    function resize() {
        // @todo
        var MIN_GAME_WIDTH = 800;
        var MIN_GAME_HEIGHT = 800;
        var GAME_ASPECT_RATIO = 16 / 9;

        var width = window.innerWidth;
        var height = window.innerHeight;

        var gWidth, gHeight;

        if(width < MIN_GAME_WIDTH || height < MIN_GAME_HEIGHT) {
            gWidth = MIN_GAME_WIDTH;
            gHeight = MIN_GAME_HEIGHT;
        }
        else if ((width / height) > GAME_ASPECT_RATIO) {
            // width is too large for height
            gHeight = height;
            gWidth = height * GAME_ASPECT_RATIO;
        }
        else {
            //  height is too large for width
            gWidth = width;
            gHeight = width / GAME_ASPECT_RATIO;
        }
        resizeGame(gWidth, gHeight, GAME_ASPECT_RATIO);
    }

    resize();

    /**
     *
     * @param gWidth
     * @param gHeight
     * @param aspectRatio
     */
    function resizeGame(gWidth, gHeight, aspectRatio) {
        gWidth += "px";
        gHeight += "px";

        var gSection = document.getElementById("way-block-a");
        var lPanel = document.getElementById("leftPanel");
        var cPanel = document.getElementById("centerPanel");
        var rPanel = document.getElementById("rightPanel");

        gSection.style.height = gHeight;
        gSection.style.width = gWidth;

        // should the below be taken care of in the CSS?
        lPanel.style.height = gHeight;
        cPanel.style.height = gHeight;
        rPanel.style.height = gHeight;

        cPanel.style.width = gWidth;
        lPanel.style.width = gWidth;
        rPanel.style.width = lPanel.style.width;
    }

    window.onresize = resize;

    // setInterval(function () {
    //     x += 5;
    //     $('.way').animate({'top': x + 'px'}, 50);
    //
    //     if (x > 800) {
    //         console.log("out of area");
    //         x = 0;
    //     }
    // }, 90);

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

