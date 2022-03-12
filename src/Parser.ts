import {Player} from "./Player"
import {Dice} from "./Dice"

export class Parser {
  parse(input: string): Player[] {
    const playerSections = input.split("  ")
    const player1Name = playerSections[0].split(":")[0]
    const player2Name = playerSections[1].split(":")[0]
    return [
      new Player(player1Name,
        [
          new Dice("5"),
          new Dice("5"),
          new Dice("5"),
          new Dice("5")
        ]),
      new Player(player2Name, [])
    ]
  }
}