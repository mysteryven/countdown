import {Timer1} from "./timer1"

jest.useFakeTimers()

describe("计时器", function () {
  it("可以成功的新建一个对象", function () {
    const test = () => {
      const testObj = new Timer1(5000, jest.fn)
    }

    expect(test).not.toThrow()
  })

  it("可以开始计时", function () {
    const fn = jest.fn()
    const testTimer = new Timer1(5000, fn)
    testTimer.start()
    jest.advanceTimersByTime(5000)

    expect(fn).toHaveBeenCalledTimes(6)
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })

  it("可以中止", function () {
    const fn = jest.fn()
    const testTimer = new Timer1(5000, fn)
    testTimer.start()
    jest.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(4)
    testTimer.stop()

    expect(fn).toHaveBeenCalledTimes(5)
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000)
    expect(testTimer.getDuration()).toEqual(2000)
  })

  it("可以重置计时", function () {
    const time = 5000
    const fn = jest.fn()
    const testTimer = new Timer1(time, fn)
    testTimer.start()
    jest.advanceTimersByTime(3000)
    testTimer.reset(6000)

    expect(fn).toHaveBeenCalledTimes(5)
    expect(testTimer.getDuration()).toEqual(6000)
  })
})
