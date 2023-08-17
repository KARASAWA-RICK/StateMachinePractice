import { _decorator, Animation, tween, v3 } from "cc";
import { ENTITY_STATE_ENUM } from "./Enum";
import { State } from "./Base/State";
import { StateMachine } from "./Base/StateMachine";
const { ccclass } = _decorator;

@ccclass("PlayerStateMachine")
export class PlayerStateMachine extends StateMachine {
  //动画组件
  animationComponent: Animation;

  //初始化状态机
  init() {
    console.log("fsm初始化");

    //获取动画组件
    this.animationComponent = this.node.getComponent(Animation);

    //初始化状态机Map
    this.initParamsMap();
    this.initStatesMap();
    this.initAnimationEvent();
  }

  //注册参数
  initParamsMap() {
    this.paramsMap.set(ENTITY_STATE_ENUM.IDLE, false);
    this.paramsMap.set(ENTITY_STATE_ENUM.ATTACK, false);
    this.paramsMap.set(ENTITY_STATE_ENUM.DEATH, false);
  }
  //注册状态
  initStatesMap() {
    this.statesMap.set(
      ENTITY_STATE_ENUM.IDLE,
      new State(this, undefined, ENTITY_STATE_ENUM.IDLE, 0.3)
    );
    this.statesMap.set(
      ENTITY_STATE_ENUM.ATTACK,
      new State(this, this.attackCb.bind(this), ENTITY_STATE_ENUM.ATTACK, 0.3)
    );
    this.statesMap.set(
      ENTITY_STATE_ENUM.DEATH,
      new State(this, undefined, ENTITY_STATE_ENUM.DEATH)
    );
  }
  attackCb() {
    //位移
    tween(this.node)
      .to(1, {
        position: this.node.getPosition().add(v3(-50, 0, 0)),
      })
      .start();
  }
  //绑定动画事件
  initAnimationEvent() {
    //动画播放结束后切换到IDLE
    this.animationComponent.on(Animation.EventType.FINISHED, () => {
      if (this.currentState === ENTITY_STATE_ENUM.ATTACK) {
        this.setParams(ENTITY_STATE_ENUM.IDLE, true);
      }
    });
  }

  //状态机运行
  run() {
    console.log("状态机运行");
    switch (this.currentState) {
      case ENTITY_STATE_ENUM.IDLE:
      case ENTITY_STATE_ENUM.ATTACK:
      case ENTITY_STATE_ENUM.DEATH:
        if (this.paramsMap.get(ENTITY_STATE_ENUM.IDLE)) {
          console.log("IDLE参数是true");
          this.stateChange(ENTITY_STATE_ENUM.IDLE);
        } else if (this.paramsMap.get(ENTITY_STATE_ENUM.ATTACK)) {
          this.stateChange(ENTITY_STATE_ENUM.ATTACK);
        } else if (this.paramsMap.get(ENTITY_STATE_ENUM.DEATH)) {
          this.stateChange(ENTITY_STATE_ENUM.DEATH);
        }
        break;
      default:
        this.stateChange(ENTITY_STATE_ENUM.IDLE);
    }
  }
}
