import { Application, Spritesheet, Text } from "pixi.js";
import { LotteryBalls } from "./lottery-balls";
import { LotterySelectionUI } from "./lottery-selection-ui";
import { LotteryControlUI } from "./lottery-control-ui";
import { LotteryCelebration } from "./lottery-celebration";
import { LotterCreditsUI } from "./lottery-credits-ui";

export class LotteryGame {
    public static readonly keepPreviousSelection: boolean = true;
    public static readonly startingCredits: number = 0;
    public static readonly costPerPlay: number = 0;

    public app?: Application;
    public sheet?: Spritesheet;

    private lotteryCreditsUI?: LotterCreditsUI;
    private lotteryBalls?: LotteryBalls;
    private lotterySelectionUI?: LotterySelectionUI;
    private lotteryControlUI?: LotteryControlUI;
    private lotteryCelebration?: LotteryCelebration;

    private delta: number = 0;
    private lastUpdateTime?: number;

    private currentSelectedBalls: number[] = [];
    private currentCredits: number = 0;

    public init(canvas: HTMLCanvasElement): void {
        this.app = new Application({
            view: canvas,
            autoStart: false,
            width: 1600,
            height: 1200,
            backgroundAlpha: 0
        });

        this.currentCredits = LotteryGame.startingCredits;

        this.lotteryCreditsUI = new LotterCreditsUI(this.app);
        this.lotteryCreditsUI.updateCreditsLabel(this.currentCredits);

        this.lotteryBalls = new LotteryBalls(this.app);
        this.lotteryBalls.onSelectionChange.connect((balls) => this.onBallSelectionChange(balls));

        this.lotterySelectionUI = new LotterySelectionUI(this.app);
        this.lotterySelectionUI.setLabel([]);

        this.lotteryControlUI = new LotteryControlUI(this.app);
        this.lotteryControlUI.onLuckyDip.connect(() => this.lotteryBalls?.selectLuckyDip());
        this.lotteryControlUI.onClear.connect(() => this.lotteryBalls?.clearSelection());
        this.lotteryControlUI.onStart.connect(() => this.playGame());
        this.lotteryControlUI.onReset.connect(() => this.resetGame());
        this.lotteryControlUI.setClearState(false);
        this.lotteryControlUI.setStartState(false);
        this.lotteryControlUI.setResetState(false);

        this.lotteryCelebration = new LotteryCelebration(this.app);

        this.render(0);
    }

    private render(time: number): void {
        this.delta = (time - (this.lastUpdateTime ?? 0)) / 1000;

        if (this.lastUpdateTime) {
            this.app?.render();
        }

        this.lastUpdateTime = time;
        requestAnimationFrame((time) => this.render(time));
    }

    private onBallSelectionChange(balls: number[]): void {
        this.currentSelectedBalls = balls;
        this.lotterySelectionUI?.setLabel(balls);
        this.lotteryControlUI?.setClearState(balls.length > 0);
        this.lotteryControlUI?.setLuckyDipState(balls.length === 0);
        this.lotteryControlUI?.setStartState(balls.length === LotteryBalls.maxSelection);
    }

    private async playGame(): Promise<void> {
        const winningBalls: number[] | undefined = this.lotteryBalls?.chooseRandomBalls();
        if (winningBalls) {
            if (this.currentSelectedBalls.length === LotteryBalls.maxSelection) {
                this.lotteryControlUI?.setStartState(false);
                this.lotteryControlUI?.setClearState(false);
                this.lotteryControlUI?.setLuckyDipState(false);

                this.lotteryBalls?.disableInteraction();

                await this.lotteryCelebration?.showWin(this.currentSelectedBalls, winningBalls);

                this.lotteryControlUI?.setResetState(true);
            }
        } else {
            console.error("Something went wrong. LotteryBalls was not initialised.");
        }
    }

    private resetGame(): void {
        if (LotteryGame.keepPreviousSelection) {
            this.lotteryBalls?.enableInteraction();
        } else {
            this.lotteryBalls?.clearSelection();
        }
        this.lotteryCelebration?.reset();
        this.lotteryControlUI?.setResetState(false);
    }
}
