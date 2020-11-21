import {Timer1} from "./timer1/timer1"
import {Timer2} from "./timer2/timer2"
import {Timer3} from "./timer3/timer3"

const TIME = 10000
let timer: number | null = null

export const REFRESH_INTERVAL = 100

const countdown = new Timer1(TIME, updateTimer)
const countdown2 = new Timer2(TIME, updateTimer2)
const countdown3 = new Timer3(TIME, updateTimer3)

function doWhat(name: "start" | "stop" | "reset") {
  [countdown, countdown2, countdown3].forEach(i => {
    if (name === "reset") {
      i[name](TIME)
    } else if (name === "start") {
      // badGuyDoBadThing();
      i[name]()
    } else {
      // timer && clearInterval(timer);
      i[name]()
    }

  })
}

type ActionType = "start" | "stop" | "reset"
type GroupItem = [string, ActionType];

const groups: GroupItem[] = [
  ["startBtn", "start"],
  ["endBtn", "stop"],
  ["resetBtn", "reset"]
]

groups.forEach(([name, action]) => {
  const ele = document.getElementById(name)
  ele && ele.addEventListener("click", () => {
    doWhat(action)
  })
})

// *********************
// *********************

function updateTimer(num: number | string) {
  const $timer = document.querySelector("#timer")
  if ($timer) {
    $timer.textContent = num + ""
  }
}

function updateTimer2(num: number | string) {
  const $timer = document.querySelector("#timer2")
  if ($timer) {
    $timer.textContent = num + ""
  }
}

function updateTimer3(num: number | string) {
  const $timer = document.querySelector("#timer3")
  let str = ""
  if (typeof num === "number") {
    str = (num / 1000).toFixed(2)
  } else {
    str = num
  }
  if ($timer) {
    $timer.textContent = str
  }
}


export interface TimerComponent {
  start: () => void;
  stop: () => void;
  reset: (duration: number) => void;
}

export type Callback = (remain: number) => void

function throwErrorInSpecialCondition(num: number | String) {
  if (num === 3000) throw Error()
}


function badGuyDoBadThing() {
  timer = setInterval(() => {
    Array(10000).fill(0).forEach(() => {
      setTimeout(() => {

      }, Math.random() * 10)
    })
  }, 1000)
}

