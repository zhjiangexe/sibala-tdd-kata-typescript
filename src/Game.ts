import {Parser} from "./Parser"
import {Dice} from "./Dice"

export class Game {
  showResult(input: string): string {
    const parser = new Parser()
    const players = parser.parse(input)
    const winnerPlayer = players[0].name
    const winnerOutput = this.countMapNum(players[0].dices)[4]
    return `${winnerPlayer} win. - with all of a kind: ${winnerOutput}`
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