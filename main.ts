/**
 * 連接成功，開始偵測 正式版
 */
/**
 * 計算偵測總次數
 */
// 傳送動作ID給藍牙裝置


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
let startDebugger = 0; //一開始的運動會出錯

// 倒數計時相關變數
/*let countdownActive = false
let countdownStartTime = 0
let countdownDuration = 0
let lastDisplayedNumber = -1*/


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
        ID = value
        serial.writeValue("ID1", ID)
        if (ID >= 10) { //第二組(以上)運動
            BTflag =0
            Countdown(ID)
        }
        else if (ID > 0 && startDebugger == 0){ //第一組運動
            startDebugger = 1;
            Countdown(ID)
        }
        else if(ID == 0){  //結束運動
            basic.showIcon(IconNames.Happy)
            startDebugger = 0;
        }
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
    basic.pause(3000)
    basic.showIcon(IconNames.Yes)
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


let countdownActive = false
let countdownStart = 0
let countdownEnd = 0
let baseValue = 0


function Countdown(Countdown_id: number) {
    pause(1000)
    if (countdownActive) return
    // 判斷倒數起點
    if (Countdown_id > 10) {
        ID = Countdown_id / 10
        serial.writeValue("ID2", ID)
        baseValue = 9
        CountingFunction.CountDown(baseValue)  
    } else if(startDebugger == 1){
        baseValue = 3
        CountingFunction.CountDown(baseValue)
    }
    else{
        start = 1
        BTflag = 1
    }

}

bluetooth.startUartService()
bluetooth.setTransmitPower(7)

basic.forever(function () {
    pause(100)
    serial.writeValue("ID", ID)
    serial.writeValue("BTflag == 1", BTflag)
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
    } 
    else if (press == 0) {
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

