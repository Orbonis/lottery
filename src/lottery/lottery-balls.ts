import { Application, Circle, Container, Graphics, Text, TextStyle } from "pixi.js";
import { RNG } from "src/utils/rng";
import { Signal } from "typed-signals";

export interface Ball {
    container: Container;
    value: number;
    circle: Graphics;
    label: Text;
    selected: boolean;
    highlighted: boolean;
}

export class LotteryBalls {
    public static readonly ballCount: number = 59;
    public static readonly parentWidth: number = 1000;
    public static readonly columns: number = 10;
    public static readonly maxSelection: number = 6;
    public static readonly showLuckyDipBall: boolean = true;

    public onSelectionChange: Signal<(balls: number[]) => void> = new Signal();

    private app: Application;

    private parent: Container;
    private balls: Ball[];

    private ballWidth: number = 0;

    constructor(app: Application) {
        this.app = app;

        this.parent = new Container();
        this.parent.x = (this.app.view.width / 2) - (LotteryBalls.parentWidth / 2);
        this.parent.y = 10;
        this.app.stage.addChild(this.parent);

        this.ballWidth = Math.floor(LotteryBalls.parentWidth / LotteryBalls.columns);

        this.balls = [];
        for (let i = 0; i < LotteryBalls.ballCount + ((LotteryBalls.showLuckyDipBall) ? 1 : 0); i++) {
            const container = new Container();
            container.x = this.ballWidth * (i % LotteryBalls.columns);
            container.y = Math.floor(i / LotteryBalls.columns) * this.ballWidth;
            container.eventMode = "static";
            container.hitArea = new Circle(this.ballWidth / 2, this.ballWidth / 2, (this.ballWidth / 2) - 10,);
            container.cursor = "pointer";
            container.on("pointerover", () => this.onPointerOver(i));
            container.on("pointerout", () => this.onPointerOut(i));
            container.on("pointerup", () => this.onPointerUp(i));
            this.parent.addChild(container);

            const circle = new Graphics();
            container.addChild(circle);

            const labelText: string = (i < LotteryBalls.ballCount) ? (i + 1).toString() : "LD";
            const label = new Text(labelText, this.getLabelStyle(0xEEEEEE));
            label.anchor.set(0.5);
            label.x = this.ballWidth / 2;
            label.y = this.ballWidth / 2;
            container.addChild(label);

            this.balls.push({ container, circle, label, selected: false, highlighted: false, value: (i < LotteryBalls.ballCount) ? i + 1 : -1 });
            this.updateBall(i);
        }
    }

    public selectLuckyDip(): void {
        const pool: number[] = new Array(LotteryBalls.ballCount).fill(0).map((x, i) => i);
        this.balls.forEach((x) => x.selected = false);

        for (let i = 0; i < LotteryBalls.maxSelection; i++) {
            const random = RNG.getRandomInt(pool.length);
            const value = pool[random];
            pool.splice(random, 1);
            this.balls[value].selected = true;
        }

        for (let i = 0; i < this.balls.length; i++) {
            this.updateBall(i);
        }

        this.updateInteractiveState();
        this.onSelectionChange.emit(this.getCurrentSelected());
    }

    public chooseRandomBalls(): number[] {
        const pool: number[] = new Array(LotteryBalls.ballCount).fill(0).map((x, i) => i);
        const balls: number[] = [];

        for (let i = 0; i < LotteryBalls.maxSelection; i++) {
            const random = RNG.getRandomInt(pool.length);
            balls.push(...pool.splice(random, 1));
        }

        return balls;
    }

    public clearSelection(): void {
        this.balls.forEach((x, i) => {
            x.selected = false;
            this.updateBall(i)
        });

        this.updateInteractiveState();
        this.onSelectionChange.emit(this.getCurrentSelected());
    }

    public enableInteraction(): void {
        this.updateInteractiveState();
        this.onSelectionChange.emit(this.getCurrentSelected());
    }

    public disableInteraction(): void {
        this.balls.forEach((x) => x.container.eventMode = "none");
    }

    private onPointerOver(index: number): void {
        this.balls[index].highlighted = true;
        this.updateBall(index);
    }

    private onPointerOut(index: number): void {
        this.balls[index].highlighted = false;
        this.updateBall(index);
    }

    private onPointerUp(index: number): void {
        if (index === LotteryBalls.ballCount) {
            // LD ball
            const pool: number[] = this.balls.filter((x) => !x.selected && x.value !== -1).map((x) => x.value - 1);
            index = pool[RNG.getRandomInt(pool.length)];
        }
        this.balls[index].selected = !this.balls[index].selected;
        this.updateBall(index);

        this.updateInteractiveState();
        this.onSelectionChange.emit(this.getCurrentSelected());
    }

    private updateBall(index: number): void {
        const ball = this.balls[index];

        ball.circle.clear();
        ball.circle.lineStyle({ color: 0xEEEEEE, width: 4 });
        ball.circle.beginFill(0xDDDDDD, (ball.selected) ? 1 : (ball.highlighted) ? 0.2 : 0);
        ball.circle.drawEllipse(this.ballWidth / 2, this.ballWidth / 2, (this.ballWidth / 2) - 10, (this.ballWidth / 2) - 10);
        ball.circle.endFill();

        ball.label.style = this.getLabelStyle((ball.selected) ? 0x222222 : 0xEEEEEE);
    }

    private updateInteractiveState(): void {
        const selectedBalls = this.getCurrentSelected();
        if (selectedBalls.length >= LotteryBalls.maxSelection) {
            this.balls.forEach((x, i) => {
                x.container.eventMode = (x.selected) ? "static": "none";
                x.highlighted = false;
                this.updateBall(i);
            });
        } else {
            this.balls.forEach((x) => x.container.eventMode = "static");
        }
    }

    private getLabelStyle(colour: number): Partial<TextStyle> {
        return { fill: colour, fontFamily: "Helvetica", align: "center", fontSize: this.ballWidth / 3 };
    }

    private getCurrentSelected(): number[] {
        return this.balls.filter((x) => x.selected).map((x) => x.value);
    }
}
