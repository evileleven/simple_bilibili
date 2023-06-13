function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
            // callback & callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}

//轮播功能
window.addEventListener('load', function () {
    var arrowLeft = document.querySelector('.Rotation_chart .arrow-l');
    var arrowRight = document.querySelector('.Rotation_chart .arrow-r');
    var RotationFocus = document.querySelector('.Rotation_chart');
    var timer;
    var flag = true;//节流阀

    RotationFocus.addEventListener('mouseenter', function () {
        arrowLeft.style.display = 'block';
        arrowRight.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });

    RotationFocus.addEventListener('mouseleave', function () {
        arrowLeft.style.display = 'none';
        arrowRight.style.display = 'none';
        //自动播放
        timer = setInterval(function () {
            arrowRight.click();
        }, 2000);
    })


    //动态生成小圆圈
    var ul = RotationFocus.querySelector('ul');
    var circles = RotationFocus.querySelector('.circle');
    var foucsWidth = RotationFocus.offsetWidth;
    var num = 0;
    var circle = 0;

    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        circles.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < circles.children.length; i++) {
                circles.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;

            //移动图片
            animate(ul, -index * foucsWidth);
        })
    }
    circles.children[0].className = 'current';

    var last = ul.children[0].cloneNode(true);
    ul.appendChild(last);

    arrowLeft.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = circles.children.length;
                ul.style.left = -foucsWidth * (num - 1) + 'px';
            }
            num--;
            animate(ul, -num * foucsWidth, function () {
                flag = true;
            });
            circle--;
            circle = circle < 0 ? circles.children.length - 1 : circle;
            circleChange();
        }
    });

    arrowRight.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == circles.children.length - 1) {
                num = -1;
                ul.style.left = 0;
            }
            num++;

            animate(ul, -num * foucsWidth, function () {
                flag = true;
            });
            circle++;
            if (circle == circles.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });

    function circleChange() {
        for (var i = 0; i < circles.children.length; i++) {
            circles.children[i].className = '';
        }
        circles.children[circle].className = 'current';
    }

    timer = setInterval(function () {
        arrowRight.click();
    }, 2000);;
})
