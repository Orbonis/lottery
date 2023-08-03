import MersenneTwister from "mersenne-twister";

export class RNG {
    private static generator: MersenneTwister = new MersenneTwister();

    public static getRandomInt(max: number): number {
        const random = this.generator.random();
        return Math.floor(random * max);
    }
}
