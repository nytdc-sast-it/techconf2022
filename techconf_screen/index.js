(function () {
  class Barrage {
    constructor(id) {
      this.dom = document.querySelector(id);
      if (this.dom.style.position == "" || this.dom.style.position == "static") {
        this.dom.style.position = "relative";
      }
      this.dom.style.overflow = "hidden";
      let rect = this.dom.getBoundingClientRect();
      this.domWidth = rect.right - rect.left;
      this.domHeight = rect.bottom - rect.top;
    }

    shoot(text) {
      let div = document.createElement("div");
      div.style.position = "absolute";
      div.style.left = this.domWidth + "px";
      div.style.top = (this.domHeight - 20) * +Math.random().toFixed(2) + "px";
      div.style.whiteSpace = "nowrap";
      div.style.color = "#" + Math.floor(Math.random() * 256).toString(10);
      div.style.fontSize = Math.floor(Math.random() * 20 + 10) + "px";
      div.innerText = text;
      this.dom.appendChild(div);

      let roll = (timer) => {
        let now = +new Date();
        roll.last = roll.last || now;
        roll.timer = roll.timer || timer;
        let left = div.offsetLeft;
        let rect = div.getBoundingClientRect();
        if (left < rect.left - rect.right) {
          this.dom.removeChild(div);
        } else {
          if (now - roll.last >= roll.timer) {
            roll.last = now;
            left -= 3;
            div.style.left = left + "px";
          }
          requestAnimationFrame(roll);
        }
      };
      roll(50 * +Math.random().toFixed(2));
    }
  }

  const barage = new Barrage("body");

  const ws = new WebSocket("wss://techconf.sastit.com/api/ws");
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    barage.shoot(data.danmu);
  };
})();
