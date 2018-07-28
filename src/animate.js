import { linear } from "./easing.js";

export function animate({ fps = 24, easing = linear, length = 1000, draw = () => {}, done = () => {} }) {
  const start = Date.now(); // remember start time
  const timer = setInterval(function() {
    // how much time passed from the start?
    const timePassed = Date.now() - start;
  
    if (timePassed >= length) {
      clearInterval(timer); // finish the animation after 2 seconds
      draw(1); // Trigger finised value
      done();
      return;
    }
  
    // draw the animation at the moment timePassed
    const value = easing(timePassed / length);
    draw(value);
    
  }, 1000 / fps);
  
  // Trigger inital value
  draw(0);
}