import { Easing, ease } from "pixi-ease";
import { LotteryCelebration } from "../lottery-celebration";
import { RNG } from "src/utils/rng";
import { config as Config } from "../lottery-config";
import { Application, Assets, Texture } from "pixi.js";

export class LotteryCelebrationAnimated extends LotteryCelebration {
    private particleTexture?: Texture;

    constructor(app: Application) {
        super(app);

        Assets.load("/assets/particle.png").then((texture) => {
            this.particleTexture = texture;
        }).catch(() => console.error("Failed to load the particle image. Check build and configuration."));
    }
    public async showWin(app: Application, selected: number[], winning: number[], winAmount: number, matchingBalls: number[], updateCredits: () => void): Promise<void> {
        for (let i = 0; i < winning.length; i++) {
            this.balls[i].value = winning[i];
            this.balls[i].label.text = ((winning[i] < 10) ? "0" : "") + winning[i].toString();
            this.balls[i].container.visible = true;

            this.balls[i].container.alpha = 0;
            this.balls[i].container.y -= 100;
            const anim = ease.add(this.balls[i].container, { alpha: 1, y: this.balls[i].position.y }, { duration: 500, ease: "easeOutQuad" });
            anim.on("each", () => {
                const randomValue: number = RNG.getRandomInt(Config.ballCount);
                this.balls[i].label.text = ((randomValue < 10) ? "0" : "") + randomValue.toString();
            });
            await this.waitForAnimation(anim);
            this.balls[i].label.text = ((winning[i] < 10) ? "0" : "") + winning[i].toString();

            const winningBall: boolean = matchingBalls.indexOf(winning[i]) !== -1;
            this.balls[i].circle.tint = (winningBall) ? "green" : "red";
            this.balls[i].label.tint = (winningBall) ? "green" : "red";
        }

        if (winAmount > 0) {
            this.winLabel.text = `You won ${winAmount} credits!`;
        } else {
            this.winLabel.text = "Better luck next time!";
        }

        updateCredits();
    }

    private waitForAnimation(ease: Easing): Promise<void> {
        return new Promise((resolve) => {
            ease.once("complete", () => resolve());
        });
    }
}
