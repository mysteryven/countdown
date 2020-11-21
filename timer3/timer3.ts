import {Callback, TimerComponent} from "../index"

export class Timer3 implements TimerComponent {
  callback: Callback
  #duration: number
  #endTime: number | undefined
  #isStopped: boolean

  constructor(duration: number, callback: Callback) {
    this.#duration = duration
    this.callback = callback
    this.#endTime = undefined
    this.#isStopped = false
  }

  reset(duration: number): void {
    this.#duration = duration
    this.stop()
  }

  start(): void {
    this.#endTime = new Date().getTime() + this.#duration
    this.#isStopped = false
    this.runner()
  }

  runner() {
    if (this.#isStopped) {
      return
    }
    const remain = this.computeRemain()
    this.#duration = remain
    if (remain <= 0) {
      this.callback(Math.max(this.#duration, 0))
      return
    }

    this.callback(remain)
    requestAnimationFrame(this.runner.bind(this))
  }

  stop(): void {
    this.#isStopped = true
    this.callback(Math.max(this.#duration, 0))
  }

  computeRemain() {
    const current = new Date().getTime()
    return (this.#endTime ?? current) - current
  }

}
