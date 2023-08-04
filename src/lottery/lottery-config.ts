export interface LotteryConfiguration {
    ballCount: number;
    ballsContainerWidth: number;
    ballsColumns: number;
    maxSelection: number;
    showLuckyDipBall: boolean;
    keepPreviousBallSelection: boolean;
    startingCredits: number;
    costPerPlay: number;
    winConfiguration: { [ key: number]: number };
}

export const config: LotteryConfiguration = {
    ballCount: 59,
    ballsContainerWidth: 1000,
    ballsColumns: 10,
    maxSelection: 6,
    showLuckyDipBall: true,
    keepPreviousBallSelection: true,
    startingCredits: 0,
    costPerPlay: 0,
    winConfiguration: {
        3: 50,
        4: 100,
        5: 200,
        6: 500
    }
};