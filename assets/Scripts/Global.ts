//1.用“键”替代“全局通用的具体数据值”，方便全局调用
//2.用Global类封装全局静态属性、方法
import {
  _decorator,
  AudioClip,
  Component,
  EventTarget,
  director,
  JsonAsset,
  Node,
  Prefab,
  SpriteAtlas,
} from "cc";

const { ccclass, property } = _decorator;


//通用

//资源类型
export const AssetType = {
  Prefab: { type: Prefab, path: "Prefabs/" },
  Sound: { type: AudioClip, path: "Clips/" },
  Atlas: { type: SpriteAtlas, path: "Atlas/" },
  Json: { type: JsonAsset, path: "Jsons/" },
};

//音效
export const Sound = {
  bgm: "bgm",
  touch: "touch",
  btn: "btn",
  lose: "lose",
  get: "get",
  hit: "hit",
  win: "win",
};

//UI预制体
export const ui = {
  GameView: { name: "GameView", layer: 2, clear: false },
  HomeView: { name: "HomeView", layer: 3, clear: false },
  RankView: { name: "RankView", layer: 4, clear: false },
  ResultView: { name: "ResultView", layer: 4, clear: false },
  PauseView: { name: "PauseView", layer: 4, clear: false },
  SettingView: { name: "SettingView", layer: 5, clear: false },
  AdView: { name: "AdView", layer: 6, clear: false },
  TipView: { name: "TipView", layer: 7, clear: true },
};

//弹窗
export const Props = {
  View: "View",
  Ad: "Advertisement",
  ShareConfig: "ShareConfig",
};

//本地存储数据的键
export const SAVE_KEY = {
  
};

//事件
export const Events = {
  
};

@ccclass("Global")
export class Global extends Component {
  //banner广告位ID
  static bannerId = "xxxxxxx";
  //激励视频广告位ID
  static videoId = "xxxxxxx";
  //插屏广告位ID
  static interstitialID = "xxxxxxx";

  //音乐开关
  static canMusic = true;
  //音效开关
  static canEffect = true;

  //全局加载历史信息
  static strLoadInfo = "88888888888888888";

  //全局开关conslog,log
  static Debug = true;

  //游戏是否进行
  static start = false;

  //加载进度比例
  static radio = 1;

  //FILLED类型的Sprite组件的填充比例
  static LoadingRate = 0;
  
  //层级节点数组
  static layer: Node[] = [];
}
