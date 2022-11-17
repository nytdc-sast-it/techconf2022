class Barrage {
  constructor(id) {
    this.dom = document.querySelector(id);
    if (this.dom.style.position == "" || this.dom.style.position == "static") {
      this.dom.style.position = "relative";
    }
    this.dom.style.overflow = "hidden";
    const rect = this.dom.getBoundingClientRect();
    this.domWidth = rect.right - rect.left;
    this.domHeight = window.innerHeight - rect.top;
  }

  shoot(text) {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = this.domWidth + "px";
    div.style.top = (this.domHeight - 20) * +Math.random().toFixed(2) + "px";
    div.style.whiteSpace = "nowrap";
    div.style.color = "#" + Math.floor(Math.random() * 256).toString(10);
    div.style.fontSize = Math.floor(Math.random() * 20 + 10) + "px";
    div.innerText = text;
    this.dom.appendChild(div);

    const roll = (timer) => {
      const now = +new Date();
      roll.last = roll.last || now;
      roll.timer = roll.timer || timer;
      let left = div.offsetLeft;
      const rect = div.getBoundingClientRect();
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

const arr = [
  { name: "陈天意", id: "21240417", danmu: "我为靳薇弘举大旗" },
  { name: "杨雷", id: "21260225", danmu: "我叫杨雷，我为我自己代言" },
  { name: "陈博文", id: "21260110", danmu: "嘿嘿嘿" },
  { name: "付明洋", id: "21230108", danmu: "抽！" },
  { name: "炭窑", id: "12121212", danmu: "中！" },
  { name: "胡海鑫", id: "12121212", danmu: "涛宁哥哥好帅！" },
  { name: "陈天意", id: "21240417", danmu: "我为靳薇弘举大旗" },
  { name: "杨雷", id: "21260225", danmu: "我叫杨雷，我为我自己代言" },
  { name: "陈博文", id: "21260110", danmu: "嘿嘿嘿" },
  { name: "付明洋", id: "21230108", danmu: "抽！" },
  { name: "炭窑", id: "12121212", danmu: "中！" },
  { name: "胡海鑫", id: "12121212", danmu: "涛宁哥哥好帅！" },
  { name: "陈天意", id: "21240417", danmu: "我为靳薇弘举大旗" },
  { name: "杨雷", id: "21260225", danmu: "我叫杨雷，我为我自己代言" },
  { name: "陈博文", id: "21260110", danmu: "嘿嘿嘿" },
  { name: "付明洋", id: "21230108", danmu: "抽！" },
  { name: "炭窑", id: "12121212", danmu: "中！" },
  { name: "胡海鑫", id: "12121212", danmu: "涛宁哥哥好帅！" },
];
const ws = new WebSocket("wss://techconf.sastit.com/api/ws");
ws.onmessage = (e) => {
  const data = JSON.parse(e.data);
  arr.push(data);
  if (arr.length > 20) {
    // remove the first item
    arr.shift();
  }
  barage.shoot(data.danmu);
};

const fuck = (name, id, danmu) => {
  document.getElementById("name").innerText = name;
  document.getElementById("studentId").innerText = id;
  document.getElementById("danmu").innerText = danmu;
};

let xingyuner = undefined;

const gun = (i) => {
  if (i >= arr.length) return;
  const e = arr[i];
  setTimeout(() => {
    fuck(e.name, e.id, e.danmu);
    gun(i + 1);
  }, 100);
};

document.getElementById("get_award").onclick = () => {
  fuck(arr[0].name, arr[0].id, arr[0].danmu);
  gun(1);
  setTimeout(() => {
    fuck("", "", "");
  }, 15000);
};
