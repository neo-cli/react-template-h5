import { useState, useRef, useLayoutEffect } from 'react';
function useDrag() {
  const positionRef = useRef({
    currentX: 0,
    currentY: 0,
    lastX: 0,
    lastY: 0
  })
  const moveElement = useRef(null);
  const [, forceUpdate] = useState({});
  useLayoutEffect(() => {
    let startX, startY;
    const start = function(event) {
      const { clientX, clientY } = event.targetTouches[0];
      startX = clientX;
      startY = clientY;
      moveElement.current.addEventListener('touchmove', move);
      moveElement.current.addEventListener('touchend', end)
    }
    const move = function (event) {
      const { clientX, clientY } = event.targetTouches[0];
      positionRef.current.currentX = positionRef.current.lastX + (clientX - startX);
      positionRef.current.currentY = positionRef.current.lastY + (clientY - startY);
      forceUpdate({});
    }
    const end = (event) => {
      positionRef.current.lastX = positionRef.current.currentX;
      positionRef.current.lastY = positionRef.current.currentY;
      moveElement.current.removeEventListener('touchmove', move);
      moveElement.current.removeEventListener('touchend', end);
    }
    moveElement.current.addEventListener('touchstart', start)
  }, [])
  return [{ x: positionRef.current.currentX, y: positionRef.current.currentY }, moveElement]
}



export default useDrag;