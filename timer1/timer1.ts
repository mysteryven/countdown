import {REFRESH_INTERVAL} from "../index"
import {Callback, TimerComponent} from "../common"

export class Timer1 implements TimerComponent {
  callback: Callback
  #duration: number
  #timerId?: number

  constructor(duration: number, callback: Callback) {
    this.#duration = duration
    this.callback = callback
  }

  start(): void {
    if (this.#timerId || this.getDuration() <= 0) {
      return
    }

    this.callback(this.getDuration())
    this.#timerId = setInterval(() => {
      // console.log("我在运行")
      this.setDuration(this.getDuration() - REFRESH_INTERVAL)
      if (this.getDuration() <= 0) {
        this.stop()
        return
      }
      this.callback(this.getDuration())
    }, REFRESH_INTERVAL)
  }

  stop(): void {
    clearInterval(this.#timerId)
    this.#timerId = undefined
    this.callback(this.getDuration())
  }

  reset(duration: number) {
    this.setDuration(duration)
    this.stop()
  }

  getDuration(): number {
    return this.#duration
  }

  setDuration(duration: number): void {
    this.#duration = duration
  }
}
