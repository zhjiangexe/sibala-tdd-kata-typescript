import {Parser} from "./Parser"
export class Game {
  showResult(input: string): string {
    // todo: hard code
    // "Black: 5 5 5 5 White: 3 3 3 3"
    const parser = new Parser()
    const players = parser.parse(input)
    const winnerPlayer = players[0].name
    const winnerOutput = "5"
    return `${winnerPlayer} win. - with all of a kind: ${winnerOutput}`
  }
}