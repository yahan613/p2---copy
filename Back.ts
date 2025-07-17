
namespace Back {
    export function Count_ShoulderPress(x: number, y: number, z: number, ) { //肩推
        /*if (x > 800 || x < -800 || z > 800 || z < -800) {
            basic.showString('S');
        } */
        if (SPflag == 1) {
            if (y <= -1000) { //包含重力加速度
                times = times + 1;
                SPflag = 2;
            }
        }
        else if (y >= -950) { //包含重力加速度
            SPflag = 1;
        }
        basic.pause(100)
    }
}
