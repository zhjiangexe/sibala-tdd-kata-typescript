import {Parser} from "./Parser"
import {Dice} from "./Dice"

enum CategoryType {
  NormalPoint,
  AllOfAKind,
}

class Category {
  readonly type: CategoryType
  readonly name: string
  readonly output: string

  constructor(type: CategoryType, name: string, output: string) {
    this.type = type
    this.name = name
    this.output = output
  }

}

export class Game {
  numOrder: string[] = ["2", "3", "5", "6", "4", "1"]

  showResult(input: string): string {
    const parser = new Parser()
    const players = parser.parse(input)
    const dices1 = players[0].dices
    const dices2 = players[1].dices
    const category2 = this.getCategoryType(dices2)
    if (category2.type === CategoryType.NormalPoint) {
      let winnerPlayer = players[1].name
      let winnerCategory = category2.name
      let winnerOutput = category2.output
      return `${winnerPlayer} win. - with ${winnerCategory}: ${winnerOutput}`
    }
    const winner1Output = this.countMapNum(dices1)[4]
    const winner2Output = this.countMapNum(dices2)[4]
    let compareResult = this.numOrder.indexOf(winner1Output[0]) - this.numOrder.indexOf(winner2Output[0])
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

  private getCategoryType(dices: Dice[]): Category {
    const isNormalPoint = this.countMapNum(dices)[2]
    if (isNormalPoint) {
      const count1Num: string[] = this.countMapNum(dices)[1]
      const output = this.numOrder.indexOf(count1Num[0]) > this.numOrder.indexOf(count1Num[1]) ? `${count1Num[0]} over ${count1Num[1]}` : `${count1Num[1]} over ${count1Num[0]}`
      return new Category(CategoryType.NormalPoint, "normal point", output)
    } else {
      const count4Num = this.countMapNum(dices)[4][0]
      return new Category(CategoryType.AllOfAKind, "all of a kind", count4Num)
    }
  }

  private countMapNum = (dices: Dice[]) => {
    const numMapCount: Record<string, number> = {}
    for (const item of dices) {
      numMapCount[item.num] = numMapCount[item.num] ? numMapCount[item.num] + 1 : 1
    }
    const countMapNum: Record<number, string[]> = {}
    for (let num in numMapCount) {
      if (countMapNum[numMapCount[num]]) {
        countMapNum[numMapCount[num]].push(num)
      } else {
        countMapNum[numMapCount[num]] = [num]
      }
    }
    return countMapNum
  }
}