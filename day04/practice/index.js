class Carousel {
  constructor(opt) {
      for(let s in opt){
          this[s] = opt[s];
      }
      let {wrap} = opt;
      this.parent = wrap.parentNode;
      this.viewWidth = this.parent.clientWidth;
      this.isAnimate = false;
      this.isMove = false;
      this.animateTime = 0;
      this.isBreak = false;
      this.initLayout();
      this.imgsLen = wrap.children.length;
      enableGesture(wrap);
      wrap.addEventListener("start", this.start);
      wrap.addEventListener("panstart", this.panstart);
      wrap.addEventListener("pan", this.move);
      wrap.addEventListener("panend", this.end);
      wrap.addEventListener("end", ()=>{
          if(this.isBreak){
              this.isBreak = false;
              this.end();
          }
          this.autoPlay();
      });
      wrap.querySelectorAll("img").forEach(item => {
          item.addEventListener("dragstart", event => event.preventDefault());
      });
      this.autoPlay();
  }
  start = ()=>{
      if(this.animateTime){
          clearInterval(this.animateTime);
          this.isBreak = true;
      } else {
          this.isBreak = false;
      }
      clearInterval(this.autoTimer);
  }
  panstart = (e) => {
      let dx = e.clientX - e.startX,dy = e.clientY - e.startY;
      if(Math.abs(dx) > Math.abs(dy)){
          this.isMove = true;
      }
      if(this.isMove){
          this.init();
          this.offsetX = this.x;
          e.stop();
      }
  };
  move = (e) => {
      if (this.isMove) {
          let disX = e.clientX - e.startX;
          this.x = this.offsetX + disX;
          this.setTransform();
          e.stop();
      }
  };
  end = (e) => {
      this.isMove = false;
      this.index = Math.round(-this.x/this.viewWidth);
      let targetX = -this.index*this.viewWidth;
      if(Math.abs(targetX - this.x)>20){
          this.animate(targetX);
      } else {
          this.x = targetX;
          this.setTransform();
      }
      this.setNavs();
  };
  initLayout(){
      const imgs = this.wrap.children;
      const fastChild  = imgs[0];
      const lastChild  = imgs[imgs.length-1];
      this.wrap.insertBefore(lastChild.cloneNode(true),fastChild);
      this.wrap.appendChild(fastChild.cloneNode(true));
      this.x = -this.viewWidth;
      this.index = 1;
      this.setTransform();
  }
  init() {
      if(this.index === 0||this.index===this.imgsLen-1){
          this.resetLayout();
      }
  }
  resetLayout(){
      let targetIndex = -this.index*this.viewWidth;
      let disX = targetIndex - this.x;
      if(this.index === 0){
          this.index = this.imgsLen - 2;
      } else if(this.index === this.imgsLen - 1){
          this.index = 1;
      }
      this.x = -this.index*this.viewWidth + disX;
      this.setTransform();
  }
  autoPlay(){
      this.autoTimer = setInterval(()=>{
          if(this.index === this.imgsLen-1){
              this.resetLayout();
          }
          this.index++;
          this.animate(-this.index*this.viewWidth);
          this.setNavs();
      },3000);
  }
  animate(targetX) {
      const time = Math.abs(targetX - this.x);
      let t = 0;
      let b = this.x;
      let c = targetX - this.x;
      let d = Math.ceil(time/(1000/60));
      clearTimeout(this.animateTime);
      this.animateTime = setInterval(()=>{
          t++;
          if(t === d){
              clearInterval(this.animateTime);
              this.animateTime = 0;
          }
          this.x = this.easeOut(t,b,c,d);
          this.setTransform();
      },1000/60); 
  }
  /*
  t: current time（当前时间）；
  b: beginning value（初始值）；
  c: change in value（变化量）；
  d: duration（持续时间）。
  */
  easeOut (t, b, c, d) {
      return -c *(t/=d)*(t-2) + b;
  }
  setTransform(){
      this.wrap.style.transform = `translate3d(${this.x}px,0,0)`;
  }
  setNavs() {
      if (!this.navs.length) {
          return;
      }
      this.navs.forEach(nav => {
          nav.className = ""
      });
      const nowIndex = this.index>0?(this.index - 1)%this.navs.length:this.navs.length-1;
      this.navs[nowIndex].className = "active";
  }
}

function enableGesture(element) {
  let contexts = [];
  const mouse_type = Symbol("mouse");
  if (!("ontouchstart" in document)) {
      // PC
      element.addEventListener("mousedown", (event) => {
          let move = (event) => {
              onMove(event, contexts[mouse_type]);
          };
          let end = (event) => {
              onEnd(event, contexts[mouse_type]);
              document.removeEventListener("mousemove", move);
          }
          document.addEventListener("mousemove", move);
          contexts[mouse_type] = {};
          onStart(event, contexts[mouse_type]);
          document.addEventListener("mouseup", end, { once: true });
      });
  }
  element.addEventListener("touchstart", (event) => {
      for (let touch of event.changedTouches) {
          contexts[touch.identifier] = {};
          onStart(touch, contexts[touch.identifier]);
      }
  });
  element.addEventListener("touchmove", (event) => {
      const stop = ()=>{
          event.preventDefault();
      }
      for (let touch of event.changedTouches) {
          touch.stop = stop;
          onMove(touch, contexts[touch.identifier]);
      }
  });
  element.addEventListener("touchend", (event) => {
      for (let touch of event.changedTouches) {
          onEnd(touch, contexts[touch.identifier]);
          delete contexts[touch.identifier];
      }
  });

  let onStart = (point, context) => {
      element.dispatchEvent(Object.assign(new CustomEvent('start'), {
          startX: point.clientX,
          startY: point.clientY,
          clientX: point.clientX,
          ClientY: point.clientY
      }));
      context.startX = point.clientX;
      context.startY = point.clientY;
      context.isTap = true; // 点击
      context.isPan = false; // 滑屏
      context.isPress = false; // 长按
      context.timoutHandler = setTimeout(() => {
          if (context.isPan) return;
          context.isTap = false;
          context.isPress = true;
          element.dispatchEvent(Object.assign(new CustomEvent('pressstart'), {
              clientX: point.clientX,
              ClientY: point.clientY
          }))
      }, 300);
  };
  let onMove = (point, context) => {
      let dx = point.clientX - context.startX;
      let dy = point.clientY - context.startY;
      if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
          clearTimeout(context.timoutHandler);
          context.isTap = false;
          context.isPan = true;
          context.isPress = false;
          element.dispatchEvent(Object.assign(new CustomEvent("panstart"), {
              startX: context.startX,
              startY: context.startY,
              clientX: point.clientX,
              clientY: point.clientY,
              stop: point.stop
          }));
          if(context.isPress){
              element.dispatchEvent(new CustomEvent('presscancel'))
          }
          return ;
      }
      if (context.isPan) {
          element.dispatchEvent(Object.assign(new CustomEvent("pan"), {
              startX: context.startX,
              startY: context.startY,
              clientX: point.clientX,
              clientY: point.clientY,
              stop: point.stop
          }));
      }
      element.dispatchEvent(Object.assign(new CustomEvent("move"), {
          clientX: point.clientX,
          clientY: point.clientY
      }))
  };
  let onEnd = (point, context) => {
      clearTimeout(context.timoutHandler);
      if (context.isPan) {
          element.dispatchEvent(Object.assign(new CustomEvent('panend'), {
              startX: context.startX,
              startY: context.startY,
              clientX: point.clientX,
              clientY: point.clientY
          }))
      }
      if (context.isTap) {
          element.dispatchEvent(Object.assign(new CustomEvent("tap"), {
              clientX: point.clientX,
              clientY: point.clientY
          }));
      }
      if (context.isPress) {
          element.dispatchEvent(Object.assign(new CustomEvent("pressend"), {
              clientX: point.clientX,
              clientY: point.clientY
          }));
      }
      element.dispatchEvent(Object.assign(new CustomEvent("end"), {
          clientX: point.clientX,
          clientY: point.clientY
      }))
  }
}

