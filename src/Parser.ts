import {Player} from "./Player"

export class Parser {
  parse(input: string): Player[] {
    return [
      new Player("Black"),
      new Player("White")
    ]
  }
}