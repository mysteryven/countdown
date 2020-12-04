import {Callback, REFRESH_INTERVAL, TimerComponent} from "../common"

export class Timer2 implements TimerComponent {
  callback: Callback
  #duration: number
  #timerId?: number
  #isStopped: boolean
  #timeFlag: number | undefined

  constructor(duration: number, callback: Callback) {
    this.#duration = duration
    this.callback = callback
    this.#isStopped = false
    this.#timeFlag = undefined

    // window.addEventListener('focus', () => {
    //   console.log('hi')
    // })
  }

  reset(duration: number): void {
    this.#duration = duration
    this.stop()
  }

  start(): void {
    if (this.#timerId) {
      return
    }

    this.#isStopped = false
    this.runner()
  }

  private runner() {
    if (this.#duration <= 0 || this.#isStopped) {
      this.#duration = 0
      this.callback(0)
      return
    }
    this.callback(this.#duration)
    const interval = REFRESH_INTERVAL - this.computeDiff()

    this.#timerId = setTimeout(() => {
      this.#duration -= REFRESH_INTERVAL
      this.runner()
    }, interval)
  }

  stop(): void {
    clearTimeout(this.#timerId)
    this.#timerId = undefined
    this.#isStopped = true
    this.callback(this.#duration)
  }

  getDuration(): number {
    return this.#duration
  }

  private computeDiff() {
    const ACCEPT_ERROR = 200;
    this.#timeFlag = this.#timeFlag || (new Date().getTime() - REFRESH_INTERVAL)
    const current = new Date().getTime()
    const res = Math.min(current - this.#timeFlag, REFRESH_INTERVAL + ACCEPT_ERROR) - REFRESH_INTERVAL
    this.#timeFlag = current
    return res
  }
}
