/*
EVENT
イベント名取得

MATH
計算系

COLOR
色指定

MC
指定した秒数でイベントを発生
*/

class EVENT {
    static get BLUR(){
        return 'blur';
    }
    static get FOCUS(){
        return 'focus';
    }
    static get LOAD(){
        return 'load';
    }
    static get RESIZE(){
        return 'resize';
    }
    static get SCROLL(){
        return 'scroll';
    }
    static get CLICK(){
        return 'click';
    }
    static get DBLCLICK(){
        return 'dblclick';
    }
    static get MOUSE_DOWN(){
        return 'mousedown';
    }
    static get MOUSE_UP(){
        return 'mouseup';
    }
    static get MOUSE_MOVE(){
        return 'mousemove';
    }
    static get MOUSE_OVER(){
        return 'mouseover';
    }
    static get MOUSE_OUT(){
        return 'mouseout';
    }
    static get MOUSE_ENTER(){
        return 'mouseenter';
    }
    static get MOUSE_LEAVE(){
        return 'mouseleave';
    }
    static get CHANGE(){
        return 'change';
    }
    static get SELECT(){
        return 'select';
    }
    static get SUBMIT(){
        return 'submit';
    }
    static get KEY_DOWN(){
        return 'keydown';
    }
    static get KEY_PRESS(){
        return 'keypress';
    }
    static get KEY_UP(){
        return 'keyup';
    }
    static get ERROR(){
        return 'error';
    }
}

class MATH{
    static RANDOM(a=0){
        if(a){
            return Math.floor(Math.random() * a);
        }else{
            return Math.random();
        }
    }
}

class COLOR{
    static RGB(r=0,g=0,b=0){
        return 'rgb('+r+','+g+','+b+')';
    }
    static RGBA(r=0,g=0,b=0,a=1){
        return 'rgba('+r+','+g+','+b+','+a+')';
    }
}

class MC{
    constructor(frame) {
      self = this;
      this.count=0;
      this.ev = new Event("enterFrame");
//    this.ev = document.createEvent("enterFrame");
      setInterval(this.enterFrame,frame);
    }
    // メソッド
    enterFrame() {
      document.dispatchEvent(self.ev);
      self.count++;
    }
    get getFrame(){
      return self.count;
    }
    static get ENTERFRAME(){
        return 'enterFrame';
    }
  }