import { Application, Container, Text } from "pixi.js";

export class LotterCreditsUI {
    private parent: Container;
    private creditsLabel: Text;

    constructor(app: Application) {
        this.parent = new Container();
        this.parent.x = 0;
        this.parent.y = app.view.height - 50;
        app.stage.addChild(this.parent);

        this.creditsLabel = new Text("Credits: 0", { fill: 0xFFFFFF, fontFamily: "Helvetica", fontSize: 30, align: "left" });
        this.creditsLabel.anchor.set(0, 0.5);
        this.parent.addChild(this.creditsLabel);
    }

    public updateCreditsLabel(credits: number): void {
        this.creditsLabel.text = `Credits: ${credits}`;
    }
}
