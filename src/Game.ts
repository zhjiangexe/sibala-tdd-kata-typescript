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
    const category1 = this.getCategoryType(dices1)
    const category2 = this.getCategoryType(dices2)
    let compareResult
    let winnerCategory
    let winnerOutput
    if (category1.type != category2.type) {
      compareResult = category1.type - category2.type
      if (compareResult > 0) {
        winnerCategory = category1.name
        winnerOutput = category1.output
      } else {
        winnerCategory = category2.name
        winnerOutput = category2.output
      }
    } else {
      if (category2.type === CategoryType.NormalPoint) {
        compareResult = -1
        winnerCategory = category2.name
        winnerOutput = category2.output
      } else {
        compareResult = this.numOrder.indexOf(category1.output) - this.numOrder.indexOf(category2.output)
        if (compareResult !== 0) {
          if (compareResult > 0) {
            winnerCategory = category1.name
            winnerOutput = category1.output
          } else {
            winnerCategory = category2.name
            winnerOutput = category2.output
          }
        }
      }
    }
    if (compareResult != 0) {
      const winnerPlayer = compareResult > 0 ? players[0].name : players[1].name
      return `${winnerPlayer} win. - with ${winnerCategory}: ${winnerOutput}`
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