import axios from "axios";
import { Barrage } from "./Barrage";
import "./style.css";

const barage = new Barrage("body");
type T = {
  danmu: string;
  id: string;
  name: string;
};
const arr: T[] = [
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
  const data: T = JSON.parse(e.data);
  arr.push(data);
  if (arr.length > 20) {
    // remove the first item
    arr.shift();
  }
  barage.shoot(data.danmu);
};

const fuck = (name: string, id: string, danmu: string) => {
  document.getElementById("name")!.innerText = name;
  document.getElementById("studentId")!.innerText = id;
  document.getElementById("danmu")!.innerText = danmu;
};

let xingyuner: T | null = null;
let tout: number | undefined = undefined;

const gun = (i: number) => {
  if (i >= arr.length) {
    if (xingyuner && xingyuner.id && xingyuner.name && xingyuner.danmu) {
      fuck(xingyuner.name, xingyuner.id, xingyuner.danmu);
    } else {
      const i = Math.floor(Math.random() * arr.length);
      fuck(arr[i].name, arr[i].id, arr[i].danmu);
    }
    return;
  }
  const e = arr[i];
  setTimeout(() => {
    fuck(e.name, e.id, e.danmu);
    gun(i + 1);
  }, 100);
};

document.getElementById("get_award")!.onclick = () => {
  if (tout) {
    clearTimeout(tout);
    tout = undefined;
  }
  axios
    .get<T>("/api/get-award", {
      timeout: 1000,
    })
    .then((res) => {
      xingyuner = res.data;
    })
    .catch((err) => {});
  fuck(arr[0].name, arr[0].id, arr[0].danmu);
  gun(1);
  tout = setTimeout(() => {
    fuck("", "", "");
    xingyuner = null;
  }, 15000);
};
