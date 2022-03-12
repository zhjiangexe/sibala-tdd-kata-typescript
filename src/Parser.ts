import {Player} from "./Player"
import {Dice} from "./Dice"

export class Parser {
  parse(input: string): Player[] {
    // Black: 5 5 5 5  White: 3 3 3 3
    const playerSections = input.split("  ")
    const player1Name = playerSections[0].split(":")[0]
    const player2Name = playerSections[1].split(":")[0]
    const player1Dices = playerSections[0].split(":")[1].trim().split(" ").map(dice => new Dice(dice))
    return [
      new Player(player1Name, player1Dices),
      new Player(player2Name, [])
    ]
  }
}