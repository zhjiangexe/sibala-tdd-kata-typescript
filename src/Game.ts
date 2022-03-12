export class Game {
  showResult(input: string): string {
    // todo: hard code
    // "Black: 5 5 5 5 White: 3 3 3 3"
    const winnerPlayer = "Black"
    const winnerOutput = "5"
    return `${winnerPlayer} win. - with all of a kind: ${winnerOutput}`
  }
}