import { Application, Container, Graphics, Text } from "pixi.js";
import { Ball, LotteryBalls } from "./lottery-balls";

export class LotteryCelebration {
    protected parent: Container;
    protected balls: Ball[];
    protected winLabel: Text;
    
    constructor(app: Application) {
        this.parent = new Container();
        this.parent.x = app.view.width / 2;
        this.parent.y = 950;
        app.stage.addChild(this.parent);

        this.winLabel = new Text("", { fill: 0xFFFFFF, fontFamily: "Helvetica", align: "center", fontSize: 35});
        this.winLabel.anchor.set(0.5);
        this.winLabel.x = 0;
        this.winLabel.y = -20;
        this.parent.addChild(this.winLabel);

        this.balls = [];
        for (let i = 0; i < LotteryBalls.maxSelection; i++) {
            const container = new Container();
            container.x = (i * 100) - ((LotteryBalls.maxSelection / 2) * 100);
            container.y = 0;
            container.visible = false;
            this.parent.addChild(container);

            const circle = new Graphics();
            circle.clear();
            circle.lineStyle({ color: 0xEEEEEE, width: 4 });
            circle.beginFill(0x222222);
            circle.drawEllipse(50, 50, 40, 40);
            circle.endFill();
            container.addChild(circle);

            const label = new Text("", { fill: 0xFFFFFF, fontFamily: "Helvetica", align: "center", fontSize: 40});
            label.anchor.set(0.5);
            label.x = 50;
            label.y = 50;
            container.addChild(label);

            this.balls.push({
                container, 
                circle, 
                label, 
                selected: false, 
                highlighted: false, 
                value: 0, 
                position: { x: container.x, y: container.y }
            });
        }
    }

    public showWin(app: Application, selected: number[], winning: number[], winAmount: number, matchingBalls: number[], updateCredits: () => void): Promise<void> {
        return new Promise((resolve) => {
            for (let i = 0; i < winning.length; i++) {
                this.balls[i].value = winning[i];
                this.balls[i].label.text = ((winning[i] < 10) ? "0" : "") + winning[i].toString();
                this.balls[i].container.visible = true;

                const winningBall: boolean = selected.indexOf(winning[i]) !== -1;
                this.balls[i].circle.tint = (winningBall) ? "green" : "red";
                this.balls[i].label.tint = (winningBall) ? "green" : "red";
            }

            if (winAmount > 0) {
                this.winLabel.text = `You won ${winAmount} credits!`;
            } else {
                this.winLabel.text = "Better luck next time!";
            }

            updateCredits();
            resolve();
        });
    }

    public reset(): void {
        this.balls.forEach((x) => {
            x.container.visible = false;
            x.value = 0;
            x.circle.tint = "white";
            x.label.tint = "white";
        });
        this.winLabel.text = "";
    }
}
