import {
  _decorator,
  AnimationClip,
  BoxCollider2D,
  Collider2D,
  Component,
  Contact2DType,
  EventTouch,
  Input,
  input,
  IPhysics2DContact,
  Sprite,
  Animation,
} from "cc";

import { EventMgr } from "./Manager/EventMgr";

import { createAnimationClip } from "./Utils/Tools";
import { ENTITY_STATE_ENUM } from "./Enum";
import { PlayerStateMachine } from "./PlayerStateMachine";
const { ccclass, property } = _decorator;

@ccclass("jkCtrl")
export class jkCtrl extends Component {
  animationComponent: Animation;
  boxCollider2D: BoxCollider2D;

  jkAnimation: AnimationClip;

  protected onLoad(): void {
    this.init();
  }

  init() {
    console.log("player初始化");

    //动画组件
    this.addComponent(Sprite).sizeMode = Sprite.SizeMode.RAW;
    this.animationComponent = this.addComponent(Animation);
    //创建动画
    this.createAnimationClips();
  }

  //创建动画
  createAnimationClips() {
    //创建
    this.jkAnimation = createAnimationClip(
      "jk_attack",
      7,
      AnimationClip.WrapMode.Loop
    );
  }

  protected start(): void {
    this.animationComponent.defaultClip = this.jkAnimation;
    this.animationComponent.play();
  }
}
