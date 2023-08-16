import {
  _decorator,
  AnimationClip,
  AnimationComponent,
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
} from "cc";
import ResMgr from "./Manager/ResMgr";
import { EventMgr } from "./Manager/EventMgr";
import { AssetType, Global } from "./Global";
import { createAnimationClip } from "./Utils/Tools";
import { ENTITYSTATE_ENUM } from "./Enum";
import { PlayerStateMachine } from "./PlayerStateMachine";
const { ccclass, property } = _decorator;

@ccclass("PlayerMgr")
export class PlayerMgr extends Component {
  animationComponent: AnimationComponent;
  boxCollider2D: BoxCollider2D;
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
      EventMgr.ins.emit(ENTITYSTATE_ENUM.ATTACK);
    });

    //碰撞
    this.boxCollider2D.on(
      Contact2DType.BEGIN_CONTACT,
      (
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null
      ) => {
        EventMgr.ins.emit(ENTITYSTATE_ENUM.DEATH);
      },
      this
    );

    EventMgr.ins.on(ENTITYSTATE_ENUM.ATTACK, this.attack, this);
    EventMgr.ins.on(ENTITYSTATE_ENUM.DEATH, this.death, this);
  }

  init() {
    console.log("player初始化");
    //添加组件
    this.addComponent(Sprite).sizeMode = Sprite.SizeMode.RAW;
    this.animationComponent = this.addComponent(AnimationComponent);
    this.boxCollider2D = this.addComponent(BoxCollider2D);
    this.boxCollider2D.size.width = 100;
    this.boxCollider2D.size.height = 100;
    //this.addComponent(PlayerStateMachine);

    this.createAnimationClips();
    this.idle();
  }

  //创建动画
  createAnimationClips() {
    //创建
    this.idleAnimation = createAnimationClip(
      "idle",
      0.5,
      AnimationClip.WrapMode.Loop
    );
    this.attackAnimation = createAnimationClip(
      "attack",
      1,
      AnimationClip.WrapMode.Normal
    );
    this.deathAnimation = createAnimationClip(
      "death",
      1.75,
      AnimationClip.WrapMode.Normal
    );
    //添加
    this.animationComponent.addClip(this.idleAnimation, ENTITYSTATE_ENUM.IDLE);
    this.animationComponent.addClip(
      this.attackAnimation,
      ENTITYSTATE_ENUM.ATTACK
    );
    this.animationComponent.addClip(
      this.deathAnimation,
      ENTITYSTATE_ENUM.DEATH
    );
  }

  idle() {
    console.log("idle");
    //播放动画
    this.animationComponent.play(ENTITYSTATE_ENUM.IDLE);
  }

  attack() {
    console.log("attack");
    //播放动画
    this.animationComponent.crossFade(ENTITYSTATE_ENUM.ATTACK, 0.3);
    //位移
    tween(this.node)
      .to(1, {
        position: this.node.getPosition().add(v3(-50, 0, 0)),
      })
      .start();
  }

  death() {
    console.log("death");
    //播放动画
    this.animationComponent.crossFade(ENTITYSTATE_ENUM.DEATH, 0.3);
  }

  protected onDisable(): void {
    //关闭监听
    input.off(Input.EventType.TOUCH_START, (evt: EventTouch) => {
      EventMgr.ins.emit(ENTITYSTATE_ENUM.ATTACK), this;
    });
    this.boxCollider2D.off(
      Contact2DType.BEGIN_CONTACT,
      (
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null
      ) => {
        EventMgr.ins.emit(ENTITYSTATE_ENUM.DEATH);
      },
      this
    );
    EventMgr.ins.off(ENTITYSTATE_ENUM.ATTACK, this.attack, this);
    EventMgr.ins.off(ENTITYSTATE_ENUM.DEATH, this.death, this);
  }
}
