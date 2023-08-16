import { AnimationClip } from "cc";
import { PlayerStateMachine } from "../PlayerStateMachine";

/**
 *一个State实例必定属于某个状态机实例的stateMap对象，所以构造函数里必须传入一个状态机实例作为字段（其他字段/方法按需添加）
 *
 * @export
 * @class State
 */
export class State {
  constructor(
    private fsm: PlayerStateMachine,
    private animationClip: AnimationClip
  ) {}
}
