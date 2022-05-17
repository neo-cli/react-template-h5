//实现加载更多的功能。就是快拉到底部的时候，就自动加载下一页
export function loadMore(element, callback) {
  function _loadMore() {
      let containerHeight = element.clientHeight;//容器的高度
      let scrollTop = element.scrollTop;//向上卷去的高度
      let scrollHeight = element.scrollHeight;//内容的高度
      if (containerHeight + scrollTop + 20 >= scrollHeight) {
          callback();
      }
  }
  element.addEventListener('scroll', debounce(_loadMore, 300));
}

export function downRefresh(element, callback) {
  let startY;//变量，存储接下时候的纵坐标
  let distance;//本次下拉的距离 
  let originalTop = element.offsetTop;//最初此元素距离顶部的距离 top=50px 
  let $timer;
  let currentTop;
  element.addEventListener('touchstart', function (event) {
      if ($timer) {//如果重新开始了touchstart,则要把上一次的回弹定时器清掉 
          clearInterval($timer);
      }
      let touchMove = throttle(_touchMove, 30);
      //只有当此元素处于原始位置才能下拉，如果处于回弹的过程则不能拉了.并且此元素向上卷去的高度==0
      if (element.offsetTop === originalTop && element.scrollTop === 0) {
          currentTop = element.offsetTop;//记录一下开始的时候的top值
          startY = event.touches[0].pageY;//记录当前点击的纵坐标
          element.addEventListener('touchmove', touchMove, true);
          element.addEventListener('touchend', touchEnd, true);
      }

      function _touchMove(event) {
          let pageY = event.touches[0].pageY;//拿到最新的纵坐标
          if (pageY > startY) {
              distance = pageY - startY;
              element.style.top = currentTop + distance + 'px';
          } else {
              element.removeEventListener('touchmove', touchMove);
              element.removeEventListener('touchend', touchEnd);
          }
      }

      function touchEnd(_event) {
          element.removeEventListener('touchmove', touchMove);
          element.removeEventListener('touchend', touchEnd);
          $timer = setInterval(() => {
              let currentTop = element.offsetTop;
              if (currentTop - originalTop > 1) {
                  element.style.top = (currentTop - 1) + 'px';
              } else {
                  element.style.top = originalTop + 'px';
              }
          }, 13);
          if (distance > 30) {
              //callback();
          }

      }
  }, true);
}


export function debounce(fn, wait) {
  let timeout = null;
  return function () {
      if (timeout)
          clearTimeout(timeout);
      timeout = setTimeout(fn, wait);
  }
}
export function throttle(fn, delay) {
  let prev = Date.now();
  return function () {
      let context = this;
      let args = arguments;
      let now = Date.now();
      if (now - prev >= delay) {
          fn.apply(context, args);
          prev = now;
      }
  }
}