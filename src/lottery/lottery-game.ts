import { Application, Spritesheet, Text } from "pixi.js";
import { LotteryBalls } from "./lottery-balls";
import { LotterySelection } from "./lottery-selection";
import { LotteryUI } from "./lottery-ui";

export class LotteryGame {
    public app?: Application;
    public sheet?: Spritesheet;

    private lotteryBalls?: LotteryBalls;
    private lotterySelection?: LotterySelection;
    private lotteryUI?: LotteryUI;

    private delta: number = 0;
    private lastUpdateTime?: number;

    public init(canvas: HTMLCanvasElement): void {
        this.app = new Application({
            view: canvas,
            autoStart: false,
            width: 1600,
            height: 1200,
            backgroundAlpha: 0
        });

        this.lotteryBalls = new LotteryBalls(this.app);
        this.lotteryBalls.onSelectionChange.connect((balls) => this.onBallSelectionChange(balls));

        this.lotterySelection = new LotterySelection(this.app);
        this.lotterySelection.setLabel([]);

        this.lotteryUI = new LotteryUI(this.app);
        this.lotteryUI.onLuckyDip.connect(() => this.lotteryBalls?.selectLuckyDip());
        this.lotteryUI.onClear.connect(() => this.lotteryBalls?.clearSelection());

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
        this.lotterySelection?.setLabel(balls);
    }
}
