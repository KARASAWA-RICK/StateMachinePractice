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
  tween,
  v3,
  Animation,
} from "cc";

import { EventMgr } from "./Manager/EventMgr";

import { createAnimationClip } from "./Utils/Tools";
import { ENTITY_STATE_ENUM } from "./Enum";
import { PlayerStateMachine } from "./PlayerStateMachine";
const { ccclass, property } = _decorator;

@ccclass("PlayerCtrl")
export class PlayerCtrl extends Component {
  animationComponent: Animation;
  boxCollider2D: BoxCollider2D;
  fsm: PlayerStateMachine;

  idleAnimation: AnimationClip;
  attackAnimation: AnimationClip;
  deathAnimation: AnimationClip;

  protected onLoad(): void {
    this.init();
  }
  protected onEnable(): void {
    //事件绑定
    //输入
    input.on(Input.EventType.TOUCH_START, (evt: EventTouch) => {
      EventMgr.ins.emit(ENTITY_STATE_ENUM.ATTACK);
    });

    //碰撞
    this.boxCollider2D.on(
      Contact2DType.BEGIN_CONTACT,
      (
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null
      ) => {
        EventMgr.ins.emit(ENTITY_STATE_ENUM.DEATH);
      },
      this
    );

    EventMgr.ins.on(ENTITY_STATE_ENUM.ATTACK, this.attack, this);
    EventMgr.ins.on(ENTITY_STATE_ENUM.DEATH, this.death, this);
  }

  init() {
    console.log("player初始化");

    //动画组件
    this.addComponent(Sprite).sizeMode = Sprite.SizeMode.RAW;
    this.animationComponent = this.addComponent(Animation);
    //创建动画
    this.createAnimationClips();

    //碰撞组件
    this.boxCollider2D = this.addComponent(BoxCollider2D);
    this.boxCollider2D.size.width = 100;
    this.boxCollider2D.size.height = 100;

    //状态机组件
    this.fsm = this.addComponent(PlayerStateMachine);
    this.fsm.init();

    this.idle();
  }

  //创建动画
  createAnimationClips() {
    //创建
    this.idleAnimation = createAnimationClip(
      "idle",
      0.5,
      AnimationClip.WrapMode.Loop,
      ENTITY_STATE_ENUM.IDLE
    );
    this.attackAnimation = createAnimationClip(
      "attack",
      1,
      AnimationClip.WrapMode.Normal,
      ENTITY_STATE_ENUM.ATTACK
    );
    this.deathAnimation = createAnimationClip(
      "death",
      1.75,
      AnimationClip.WrapMode.Normal,
      ENTITY_STATE_ENUM.DEATH
    );
    //添加
    this.animationComponent.addClip(this.idleAnimation, ENTITY_STATE_ENUM.IDLE);
    this.animationComponent.addClip(
      this.attackAnimation,
      ENTITY_STATE_ENUM.ATTACK
    );
    this.animationComponent.addClip(this.deathAnimation),
      ENTITY_STATE_ENUM.DEATH;
  }

  idle() {
    console.log("idle");
    this.fsm.setParams(ENTITY_STATE_ENUM.IDLE, true);
  }

  attack() {
    console.log("attack");
    if (this.fsm.currentState == ENTITY_STATE_ENUM.DEATH) {
      return;
    }
    this.fsm.setParams(ENTITY_STATE_ENUM.ATTACK, true);
  }

  death() {
    console.log("death");
    this.fsm.setParams(ENTITY_STATE_ENUM.DEATH, true);
  }

  protected onDisable(): void {
    //关闭监听
    input.off(Input.EventType.TOUCH_START, (evt: EventTouch) => {
      EventMgr.ins.emit(ENTITY_STATE_ENUM.ATTACK), this;
    });
    this.boxCollider2D.off(
      Contact2DType.BEGIN_CONTACT,
      (
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null
      ) => {
        EventMgr.ins.emit(ENTITY_STATE_ENUM.DEATH);
      },
      this
    );
    EventMgr.ins.off(ENTITY_STATE_ENUM.ATTACK, this.attack, this);
    EventMgr.ins.off(ENTITY_STATE_ENUM.DEATH, this.death, this);
  }
}
