import {Player} from "./Player"
import {Dice} from "./Dice"

export class Parser {
  parse(input: string): Player[] {
    // Black: 5 5 5 5  White: 3 3 3 3
    const playerSections = input.split("  ")
    return [
      this.getPlayer(playerSections, 0),
      this.getPlayer(playerSections, 1)
    ]
  }

  private getPlayer(playerSections: string[], playerIndex: number) {
    const name = playerSections[playerIndex].split(":")[0]
    const dices = playerSections[playerIndex].split(":")[1].trim().split(" ").map(dice => new Dice(dice))
    return new Player(name, dices)
  }
}