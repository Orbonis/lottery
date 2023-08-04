import { LotteryBalls } from "./lottery-balls";

export class LotteryForces {
    public static winningBalls?: number[];

    private currentSelectedBalls: number[] = [];

    public setupForces(): void {
        (window as any).setWinningBalls = (balls?: number[]) => {
            if (balls && balls.length === LotteryBalls.maxSelection) {
                LotteryForces.winningBalls = balls;
            } else {
                console.error(`You must choose ${LotteryBalls.maxSelection} balls for this force.\n` +
                    `Pass them as an array: [${new Array(LotteryBalls.maxSelection).fill(0).map((x, i) => i + 1)}]`);
            }
        };

        (window as any).setWinningBallsToSelection = () => {
            if (this.currentSelectedBalls.length === LotteryBalls.maxSelection) {
                LotteryForces.winningBalls = this.currentSelectedBalls;
            } else {
                console.error(`Make sure to select all ${LotteryBalls.maxSelection} balls before using this force.`);
            }
        };
    }

    public setCurrentSelection(balls: number[]): void {
        this.currentSelectedBalls = balls;
    }
}
