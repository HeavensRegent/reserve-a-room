//-- This is really used in other js files (stupid esLint)
// eslint-disable-next-line no-unused-vars
const animateCSS = (element, animation, prefix = 'animate__') => {
  // We create a Promise and return it
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);
    try{

      void node.classList.add(`${prefix}animated`, animationName);
    }catch(err){
      reject(err);
    }

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });
}