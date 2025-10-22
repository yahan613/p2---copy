/**
 * 連接成功，開始偵測
 */
/**
 * 計算偵測總次數
 */
// 傳送動作ID給藍牙裝置
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let raw = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)).trim()
value = parseInt(raw)
    // 檢查是否為有效的數字
    // else if (value == 0) {
    // BTflag = 0;
    // basic.showIcon(IconNames.Asleep)
    // }
    if (isNaN(value)) {
        // 顯示錯誤訊息
        serial.writeString(raw)
    } else {
        times = 0
        BTflag = 0
        ID = value
        serial.writeValue("ID", ID)
        Countdown(ID)
    }
})
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
    SPflag = 0
    x = input.acceleration(Dimension.X)
    y = input.acceleration(Dimension.Y)
    z = input.acceleration(Dimension.Z)
    serial.writeValue("X", x)
    serial.writeValue("Y", y)
    serial.writeValue("Z", z)
    serial.writeValue("SPflag", SPflag)
    basic.pause(100)
}
bluetooth.onBluetoothConnected(function () {
    basic.pause(7000)
    basic.showIcon(IconNames.Yes)
    bluetooth.uartWriteString("connected")
})
bluetooth.onBluetoothDisconnected(function () {
    BTflag = 0
})
// 按鈕偵測
input.onButtonPressed(Button.A, function () {
    // if (press == 1) {
    // BTflag == 1
    // press = 0;
    // status = "play"
    // }
    // else {
    // status = "pause"
    // press = 1;
    // //start = 0;
    // }
    times += 1
})
input.onButtonPressed(Button.B, function () {
    BTflag = 0
    times = 0
    bluetooth.uartWriteString("end")
})
function Countdown (Countdown_id: number) {
    if (Countdown_id > 10) {
        ID = Countdown_id % 10
        for(let i=9; i>=0; i--){
            basic.showNumber(i)
            pause(1000)
        }
    } else if (Countdown_id <= 10) {
        for (let j = 3; j >= 0; j--) {
            basic.showNumber(j)
            pause(1000)
        }
    }
    start = 1
    BTflag = 1
}
let start = 0
let SPflag = 0
let BTflag = 0
let times = 0
let raw2 = ""
let z = 0
let y = 0
let x = 0
let test = 0
let ID = 0
let value = 0
let status = "play"
// 按鈕事件偵測變數
let press = 1
// 運動動作ID
ID = 100
bluetooth.startUartService()
bluetooth.setTransmitPower(7)
// basic.forever(function () {
// 
// Count_Elbow_extension(x , y, z);
// 
// basic.showNumber(times)
// 
// })
basic.forever(function () {
    pause(100)
if (BTflag == 1) {
        if (press == 1) {
            switch (ID) {
                case 1: //手臂彎舉
                    Arm.Count_Curl(x, y, z);
                    break;
                case 2: //肩推
                    Back.Count_ShoulderPress(x, y, z);
                    break;
                case 3: //手臂伸展
                    Arm.Elbow_extension(x, y, z);
                    break;
                case 4: //胸推
                    Back.Count_ChestPress(x, y, z);
                    break;
                case 5: //划船
                    Back.Seated_row(x, y, z);
                    break;
                default:
                    break;
            }
basic.showNumber(times)
            bluetooth.uartWriteNumber(times)
        } else if (press == 0) {
            basic.showString("P")
            bluetooth.uartWriteString("pause")
        }
        pause(100)
    }
})
// 加速度偵測
basic.forever(function () {
    if (BTflag == 1) {
        Acceleration()
    }
})

