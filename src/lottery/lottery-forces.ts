import { LotteryBalls } from "./lottery-balls";

export class LotteryForces {
    public static winningBalls?: number[];

    constructor() {
        (window as any).setWinningBalls = (balls?: number[]) => {
            if (balls && balls.length === LotteryBalls.maxSelection) {
                LotteryForces.winningBalls = balls;
            } else {
                console.error(`You must choose ${LotteryBalls.maxSelection} balls for this force. Pass them as an array:\n[1, 2, 3, 4, 5, 6]`);
            }
        };
    }
}
