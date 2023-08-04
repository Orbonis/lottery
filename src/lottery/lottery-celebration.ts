import { Application, Container, Graphics, Text } from "pixi.js";
import { Ball, LotteryBalls } from "./lottery-balls";

interface WinConfigurationData {
    [ key: number ]: number;
}

export class LotteryCelebration {
    public static readonly winConfiguration: WinConfigurationData = {
        3: 50,
        4: 100,
        5: 200,
        6: 500
    };

    private parent: Container;
    private balls: Ball[];
    
    constructor(app: Application) {
        this.parent = new Container();
        this.parent.x = app.view.width / 2;
        this.parent.y = 950;
        app.stage.addChild(this.parent);

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

            const label = new Text("00", { fill: 0xFFFFFF, fontFamily: "Helvetica", align: "center", fontSize: 40});
            label.anchor.set(0.5);
            label.x = 50;
            label.y = 50;
            container.addChild(label);

            this.balls.push({ container, circle, label, selected: false, highlighted: false, value: 0 });
        }
    }

    public showWin(selected: number[], winning: number[]): Promise<void> {
        return new Promise((resolve) => {
            for (let i = 0; i < winning.length; i++) {
                this.balls[i].value = winning[i];
                this.balls[i].label.text = ((winning[i] < 10) ? "0" : "") + winning[i].toString();
                this.balls[i].container.visible = true;

                const winningBall: boolean = selected.indexOf(winning[i]) !== -1;
                this.balls[i].circle.tint = (winningBall) ? "green" : "red";
                this.balls[i].label.tint = (winningBall) ? "green" : "red";
            }
            resolve();
        });
    }

    public reset(): void {
        this.balls.forEach((x) => {
            x.container.visible = false;
            x.value = 0;
        })
    }
}
