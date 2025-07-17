/**
 * 計算偵測總次數
 */
/**
 * basic.forever(function () {
 * 
 * Count_Elbow_extension(x , y, z);
 * 
 * basic.showNumber(times)
 * 
 * })
 */
// control.inBackground(function on_in_background() {
// 
// while (true) {
// 
// if (BTflag == 1) {
// 
// BluetoothSend()
// 
// }
// 
// // BluetoothReceive()
// 
// basic.pause(100)
// 
// }
// 
// })
function Acceleration () {
    x = input.acceleration(Dimension.X)
    y = input.acceleration(Dimension.Y)
    z = input.acceleration(Dimension.Z)
    serial.writeValue("X", x)
    serial.writeValue("Y", y)
    serial.writeValue("Z", z)
    basic.pause(100)
}
function Count_Elbow_extension (x: number, y: number, z: number) {
    if (x >= 1050) {
        if (y >= -300) {
            times = times + 1
        }
    }
    basic.pause(100)
}
bluetooth.onBluetoothConnected(function () {
    basic.pause(7000)
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    BTflag = 0
})
// 傳送動作ID給藍牙裝置
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    raw = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    value = parseInt(raw)
    // 檢查是否為有效的數字
    if (isNaN(value)) {
        // 顯示錯誤訊息
        basic.showIcon(IconNames.Sad)
    } else {
        ID = value
        switch(value){
            case 1:
                Countdown();
                break;
            case 0:
                BTflag = 0;
                basic.showIcon(IconNames.Asleep)
            default:
                break;
        }
    }
})
function Countdown () {
    basic.showNumber(3)
    pause(1000)
basic.showNumber(2)
    pause(1000)
basic.showNumber(1)
    pause(1000)
BTflag = 1
}
let raw = ""
let times = 0
let z = 0
let y = 0
let x = 0
let SPflag = 0
// 連接成功，開始偵測
let BTflag = 0
let test = 0
let ID = 0
let value = 0
// 運動動作ID
ID = 100
bluetooth.startUartService()
bluetooth.setTransmitPower(7)
basic.forever(function () {
    if (BTflag == 1) {
        switch(ID){
           case 1: //手臂彎舉
                Arm.Count_Curl(x, y, z);
                break;
            case 2: //肩推
                Back.Count_ShoulderPress(x, y, z);
                break;
            default:
                break;
        }
basic.showNumber(times)
        bluetooth.uartWriteNumber(times)
        pause(100)
    }
})
basic.forever(function () {
    if (BTflag == 1) {
        Acceleration()
    }
})
