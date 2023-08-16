import { AnimationClip, Component, _decorator } from "cc";
import { ENTITYSTATE_ENUM } from "./Enum";
import { State } from "./Base/State";
import { PlayerMgr } from "./PlayerMgr";
const { ccclass } = _decorator;

@ccclass("PlayerStateMachine")
export class PlayerStateMachine extends Component {
  //获取动画
  idleAnimation: AnimationClip =
    this.node.getComponent(PlayerMgr).idleAnimation;
  attackAnimation: AnimationClip =
    this.node.getComponent(PlayerMgr).attackAnimation;
  deathAnimation: AnimationClip =
    this.node.getComponent(PlayerMgr).deathAnimation;

  //状态判断参数Map
  paramsMap: Map<ENTITYSTATE_ENUM, boolean | number> = new Map();
  //状态Map
  statesMap: Map<ENTITYSTATE_ENUM, State> = new Map();

  //当前状态
  private _currentState: ENTITYSTATE_ENUM;
  //获取当前状态
  get currentState() {
    return this._currentState;
  }
  //改变当前状态
  set currentState(newState: ENTITYSTATE_ENUM) {
    this._currentState = newState;
  }

  //初始化状态机
  init() {
    this.initParamsMap();
    this.initStatesMap();
  }

  //注册状态判断参数
  initParamsMap() {
    this.paramsMap.set(ENTITYSTATE_ENUM.IDLE, false);
    this.paramsMap.set(ENTITYSTATE_ENUM.ATTACK, false);
    this.paramsMap.set(ENTITYSTATE_ENUM.DEATH, false);
  }
  //获取状态判断参数
  getParams(stateName: ENTITYSTATE_ENUM) {
    if (this.paramsMap.has(stateName)) {
      this.paramsMap.get(stateName);
    }
  }
  //改变状态判断参数
  setParams(stateName: ENTITYSTATE_ENUM, newParamValue: number | boolean) {
    if (this.paramsMap.has(stateName)) {
      this.paramsMap.set(stateName, newParamValue);
      this.stateChange();
    }
  }

  //注册状态
  initStatesMap() {
    this.statesMap.set(
      ENTITYSTATE_ENUM.IDLE,
      new State(this, this.idleAnimation)
    );
    this.statesMap.set(
      ENTITYSTATE_ENUM.IDLE,
      new State(this, this.attackAnimation)
    );
    this.statesMap.set(
      ENTITYSTATE_ENUM.IDLE,
      new State(this, this.deathAnimation)
    );
  }
  //根据状态判断参数切换状态
  stateChange() {
    switch (this.currentState) {
      case ENTITYSTATE_ENUM.IDLE:
      case ENTITYSTATE_ENUM.ATTACK:
      case ENTITYSTATE_ENUM.DEATH:
        if (this.paramsMap.get(ENTITYSTATE_ENUM.IDLE)) {
          this.currentState = ENTITYSTATE_ENUM.IDLE;
        } else if (this.paramsMap.get(ENTITYSTATE_ENUM.ATTACK)) {
          this.currentState = ENTITYSTATE_ENUM.ATTACK;
        } else if (this.paramsMap.get(ENTITYSTATE_ENUM.DEATH)) {
          this.currentState = ENTITYSTATE_ENUM.DEATH;
        }
        break;
      default:
        this.currentState = ENTITYSTATE_ENUM.IDLE;
    }
  }
}
