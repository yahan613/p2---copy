
namespace Back {
    export function Count_ShoulderPress(x: number, y: number, z: number, ) { //肩推
        basic.pause(10)
        if (x > 800 || x < -800 || z > 800 || z < -800) {
            basic.showString('S');
        } 
        else if (SPflag == 1) {
            if (y <= -1000) { //包含重力加速度
                times = times + 1;
                SPflag = 2;
            }
        }
        else if (y >= -900) { //包含重力加速度
            SPflag = 1;
        }
    }
}
