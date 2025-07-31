
namespace Back {
    export function Count_ShoulderPress(x: number, y: number, z: number) { //肩推
        /*if (x > 800 || x < -800 || z > 800 || z < -800) {
            basic.showString('S');
        } */
        if (y >= -850) { //包含重力加速度
            SPflag = 1;
        }
        else if (SPflag == 1) {
            if (y <= -1000) { //包含重力加速度
                times = times + 1;
                SPflag = 2;
            }
        }
        
        basic.pause(100)
    }

    export function Count_ChestPress(x: number, y: number, z: number) {
        if (y >= -800) { //包含重力加速度
            SPflag = 1;
        }
        else if (SPflag == 1) {
            if (y <= -900) { //包含重力加速度
                times = times + 1;
                SPflag = 2;
            }
        }

        basic.pause(100)
    }

    export function Count_CableRow(x: number, y: number, z: number) {
        if (y >= 30) { //包含重力加速度
            serial.writeValue("AA", 1)
            SPflag = 1;
        }
        else if (SPflag == 1) {
            if (y <= -70) { //包含重力加速度
                times = times + 1;
                SPflag = 2;
            }
        }

        basic.pause(100)
    }
}
