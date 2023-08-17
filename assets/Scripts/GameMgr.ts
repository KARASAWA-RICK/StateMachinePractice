import {
  _decorator,
  AnimationClip,
  AnimationComponent,
  Component,
  find,
  Layers,
  Node,
  Sprite,
} from "cc";

import ResMgr from "./Manager/ResMgr";
import { AssetType, Global } from "./Global";
import { createAnimationClip, createNode } from "./Utils/Tools";
import { PlayerCtrl } from "./PlayerCtrl";
const { ccclass, property } = _decorator;

@ccclass("GameMgr")
export class GameMgr extends Component {
  start() {
    this.init();
  }

  async init() {
    await this.loadRes();
    this.generatePlayer();
  }

  //加载资源
  async loadRes() {
    await ResMgr.ins.loadBundle(1);
    await ResMgr.ins.loadRes(1, AssetType.Atlas);
  }

  //创建角色
  generatePlayer() {
    const player = createNode("player", find("Canvas"));
    player.addComponent(PlayerCtrl);
  }
}
