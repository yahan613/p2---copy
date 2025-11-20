namespace CountingFunction {
    export function CountDown(base: number) {
        countdownActive = true
        countdownStart = control.millis()
        countdownEnd = countdownStart + (base) * 1000

        control.inBackground(function () {
            let prevSec = -1
            while (countdownActive) {
                let now = control.millis()
                let remainingMs = countdownEnd - now
                if (remainingMs <= 0) {
                    countdownActive = false
                    start = 1
                    BTflag = 1
                    basic.showNumber(0)
                    break
                }
                // 只在整秒變化時更新顯示（避免閃爍）
                let sec = Math.ceil(remainingMs / 1000)
                if (sec != prevSec) {
                    prevSec = sec
                    basic.showNumber(sec)
                }
                // 小延遲避免過多刷新，但不影響精度
                control.waitMicros(50000)  // 50ms
                if (base == 3) {
                    bluetooth.uartWriteString("connected")
                }
            }
        })
    }


}