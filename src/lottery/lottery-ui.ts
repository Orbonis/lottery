import { Application, Container, Graphics, Text } from "pixi.js";
import { Signal } from "typed-signals";

interface Button {
    container: Container;
    graphics: Graphics;
    label: Text;
}

export class LotteryUI {
    public onLuckyDip: Signal<() => void> = new Signal();
    public onClear: Signal<() => void> = new Signal();
    public onStart: Signal<() => void> = new Signal();

    private luckyDipButton: Button;
    private clearButton: Button;
    private startButton: Button;

    constructor(app: Application) {
        this.luckyDipButton = this.createButton("Lucky Dip", 700, 820, 200, 60, app.stage, () => this.onLuckyDip.emit());
        this.clearButton = this.createButton("Clear", 810, 740, 150, 60, app.stage, () => this.onClear.emit());
        this.startButton = this.createButton("Play", 640, 740, 150, 60, app.stage, () => this.onStart.emit());
    }

    private createButton(text: string, x: number, y: number, width: number, height: number, parent: Container, onClick: () => void): Button {
        const graphics: Graphics = new Graphics();

        const label: Text = new Text(text, { fill: 0xEEEEEE, fontFamily: "Helvetica", align: "center", fontSize: 30 });
        label.anchor.set(0.5);
        label.x = width / 2;
        label.y = height / 2;

        const container: Container = new Container();
        container.addChild(graphics);
        container.addChild(label);

        container.x = x;
        container.y = y;

        container.interactive = true;
        container.interactiveChildren = true;
        container.cursor = "pointer";

        const setNormal = () => {
            graphics.clear();
            graphics.lineStyle({ width: 4, color: 0xEEEEEE });
            graphics.beginFill(0x222222);
            graphics.drawRoundedRect(0, 0, width, height, 10);
            graphics.endFill();
        };

        const setHighlight = () => {
            graphics.clear();
            graphics.lineStyle({ width: 4, color: 0xEEEEEE });
            graphics.beginFill(0x444444);
            graphics.drawRoundedRect(0, 0, width, height, 10);
            graphics.endFill();
        };

        container.on("pointerover", () => setHighlight());
        container.on("pointerout", () => setNormal());
        container.on("pointerup", () => onClick());
        setNormal();

        parent.addChild(container);

        return { container, graphics, label };
    }
}
