def Acceleration():
    global x, y, z
    x = input.acceleration(Dimension.X)
    y = input.acceleration(Dimension.Y)
    z = input.acceleration(Dimension.Z)
    serial.write_value("X", x)
    serial.write_value("Y", y)
    serial.write_value("Z", z)
    basic.pause(100)
times = 0
z = 0
y = 0
x = 0
SPflag = 0
BTflag = 0
test = 0
bluetooth.start_uart_service()
bluetooth.set_transmit_power(7)
# serial.writeValue("test", test)
# BluetoothSend()

def on_bluetooth_connected():
    global BTflag
    basic.pause(7000)
    BTflag = 1
    basic.show_icon(IconNames.YES)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    global BTflag
    BTflag = 0
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

# 傳送次數資料給藍牙裝置
# BluetoothSend();

def on_uart_data_received():
    received = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
    basic.show_string(received)
    serial.write_string(received)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.NEW_LINE),
    on_uart_data_received)

def BluetoothSend():
    global test
    if test == 0:
        basic.pause(5000)
        test = 1
        serial.write_value("test", test)
    bluetooth.uart_write_number(times)
    pause(100)
# basic.showNumber(times)

def on_forever():
    Arm.Count_Curl(x, y, z)
basic.forever(on_forever)

def on_forever2():
    Acceleration()
basic.forever(on_forever2)

def on_in_background():
    while True:
        if BTflag == 1:
            BluetoothSend()
        # BluetoothReceive()
        basic.pause(100)
control.in_background(on_in_background)
