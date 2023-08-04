import { Application, Container, Graphics, Text, TextStyle } from "pixi.js";
import { config as Config } from "./lottery-config";

export class LotterySelectionUI {
    private parent: Container;
    private frame: Graphics;
    private labels: Text[];

    constructor(app: Application) {
        this.parent = new Container();
        this.parent.x = app.view.width / 2;
        this.parent.y = 700;
        app.stage.addChild(this.parent);

        const frameWidth: number = (Config.maxSelection * 80) + 20;
        this.frame = new Graphics();
        this.frame.lineStyle({ width: 4, color: 0xFFFFFF });
        this.frame.drawRoundedRect(-(frameWidth / 2), -45, frameWidth, 90, 20);
        this.parent.addChild(this.frame);

        this.labels = [];
        for (let i = 0; i < Config.maxSelection; i++) {
            const label = new Text("", this.getTextStyle(0xEEEEEE));
            label.anchor.set(0.5);
            label.x = (i * 80) - ((Config.maxSelection / 2) * 80) + 40;
            this.labels.push(label);
            this.parent.addChild(label);
        }
    }

    public setLabel(selection: number[]): void {
        for (let i = 0; i < this.labels.length; i++) {
            if (i < selection.length) {
                this.labels[i].style = this.getTextStyle(0xEEEEEE);
                this.labels[i].text = ((selection[i] < 10) ? "0" : "") + selection[i].toString();
            } else {
                this.labels[i].style = this.getTextStyle(0x666666);
                this.labels[i].text = "00";
            }
        }
    }

    private getTextStyle(colour: number): Partial<TextStyle> {
        return { fill: colour, fontFamily: "Helvetica", fontSize: 50, align: "center" };
    }
}
