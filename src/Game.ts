import {Parser} from "./Parser"
import {Dice} from "./Dice"

enum CategoryType {
  NormalPoint,
  AllOfAKind,
}

export class Game {
  numOrder: string[] = ["2", "3", "5", "6", "4", "1"]

  showResult(input: string): string {
    const parser = new Parser()
    const players = parser.parse(input)
    const dices1 = players[0].dices
    const dices2 = players[1].dices
    const category1 = this.getCategoryType(dices1)
    if (category1 === CategoryType.NormalPoint) {
      let winnerPlayer = "White"
      let winnerCategory = "normal point"
      let winnerOutput = "6 over 3"
      return `${winnerPlayer} win. - with ${winnerCategory}: ${winnerOutput}`
    }
    const winner1Output = this.countMapNum(dices1)[4]
    const winner2Output = this.countMapNum(dices2)[4]
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

  private getCategoryType(dices: Dice[]): CategoryType {
    const isNormalPoint = this.countMapNum(dices)[2]
    if (isNormalPoint) {
      return CategoryType.NormalPoint
    } else {
      return CategoryType.AllOfAKind
    }
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