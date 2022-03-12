import {Parser} from "./Parser"
import {Dice} from "./Dice"

export class Game {
  numOrder: string[] = ["2", "3", "5", "6", "4", "1"]

  showResult(input: string): string {
    const parser = new Parser()
    const players = parser.parse(input)
    const winner1Output = this.countMapNum(players[0].dices)[4]
    const winner2Output = this.countMapNum(players[1].dices)[4]
    let compareResult = this.numOrder.indexOf(winner1Output) - this.numOrder.indexOf(winner2Output)
    if (compareResult !== 0) {
      let winnerPlayer
      let winnerOutput
      if (compareResult > 0) {
        winnerPlayer = players[0].name
        winnerOutput = winner1Output
      } else {
        winnerPlayer = players[1].name
        winnerOutput = winner2Output
      }
      return `${winnerPlayer} win. - with all of a kind: ${winnerOutput}`
    }
    return "Tie."
  }

  private countMapNum = (dices: Dice[]) => {
    const numMapCount: Record<string, number> = {}
    for (const item of dices) {
      numMapCount[item.num] = numMapCount[item.num] ? numMapCount[item.num] + 1 : 1
    }
    const countMapNum: Record<number, string> = {}
    for (let num in numMapCount) {
      countMapNum[numMapCount[num]] = num
    }
    return countMapNum
  }
}