export interface LotteryConfiguration {
    ballCount: number;
    parentWidth: number;
    columns: number;
    maxSelection: number;
    showLuckyDipBall: boolean;
    keepPreviousSelection: boolean;
    startingCredits: number;
    costPerPlay: number;
    winConfiguration: { [ key: number]: number };
}

export const config: LotteryConfiguration = {
    ballCount: 59,
    parentWidth: 1000,
    columns: 10,
    maxSelection: 6,
    showLuckyDipBall: true,
    keepPreviousSelection: true,
    startingCredits: 0,
    costPerPlay: 0,
    winConfiguration: {
        3: 50,
        4: 100,
        5: 200,
        6: 500
    }
};