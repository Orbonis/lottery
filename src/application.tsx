import React from "react";
import { LotteryGame } from "./lottery/lottery-game";
import { GameCanvas } from "./game-canvas";

interface IProperties {

}

interface IState {

}

export class Application extends React.Component<IProperties, IState> {
    private game: LotteryGame;

    constructor(props: IProperties) {
        super(props);

        this.state = {};

        this.game = new LotteryGame();
    }

    public render(): JSX.Element[] {
        return [
            <GameCanvas key="game-canvas" onMount={(canvas) => this.game.init(canvas)} />
        ];
    }
}
