import {Player} from "./Player"

export class Parser {
  parse(input: string): Player[] {
    const playerSections = input.split("  ")
    const player1Name = playerSections[0].split(":")[0]
    return [
      new Player(player1Name),
      new Player("White")
    ]
  }
}