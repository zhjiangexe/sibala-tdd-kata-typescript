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

interface CompareResult {
  compareResult: number
  winnerCategory: string | undefined
  winnerOutput: string | undefined
}

class DifferentCategoryComparer {
  public compare(category1: Category, category2: Category): CompareResult {
    const compareResult = category1.type - category2.type
    let winnerCategory
    let winnerOutput
    if (compareResult > 0) {
      winnerCategory = category1.name
      winnerOutput = category1.output
    } else {
      winnerCategory = category2.name
      winnerOutput = category2.output
    }
    return {compareResult, winnerCategory, winnerOutput}
  }
}

class Data {
  static numOrder: string[] = ["2", "3", "5", "6", "4", "1"]
}

class AllOfAKindComparer {
  public compare(category1: Category, category2: Category): CompareResult {
    const compareResult = Data.numOrder.indexOf(category1.output) - Data.numOrder.indexOf(category2.output)
    let winnerCategory
    let winnerOutput
    if (compareResult > 0) {
      winnerCategory = category1.name
      winnerOutput = category1.output
    } else if (compareResult < 0) {
      winnerCategory = category2.name
      winnerOutput = category2.output
    }
    return {compareResult, winnerCategory, winnerOutput}
  }
}

export class Game {

  showResult(input: string): string {
    const parser = new Parser()
    const players = parser.parse(input)
    const countMapNum1 = this.countMapNum(players[0].dices)
    const countMapNum2 = this.countMapNum(players[1].dices)
    const category1 = this.getCategoryType(countMapNum1)
    const category2 = this.getCategoryType(countMapNum2)
    let compareResult
    let winnerCategory
    let winnerOutput
    if (category1.type != category2.type) {
      const differentCategoryComparer = new DifferentCategoryComparer()
      const result = differentCategoryComparer.compare(category1, category2)
      compareResult = result.compareResult
      winnerCategory = result.winnerCategory
      winnerOutput = result.winnerOutput
    } else {
      if (category2.type === CategoryType.NormalPoint) {
        compareResult = -1
        winnerCategory = category2.name
        winnerOutput = category2.output
      } else {
        const allOfAKindComparer = new AllOfAKindComparer()
        const result = allOfAKindComparer.compare(category1, category2)
        compareResult = result.compareResult
        winnerCategory = result.winnerCategory
        winnerOutput = result.winnerOutput
      }
    }
    if (compareResult != 0) {
      const winnerPlayer = compareResult > 0 ? players[0].name : players[1].name
      return `${winnerPlayer} win. - with ${winnerCategory}: ${winnerOutput}`
    }
    return "Tie."
  }

  private getCategoryType(countMapNum: Record<number, string[]>): Category {
    const isNormalPoint = countMapNum[2]
    if (isNormalPoint) {
      const count1Num: string[] = countMapNum[1]
      const output = Data.numOrder.indexOf(count1Num[0]) > Data.numOrder.indexOf(count1Num[1]) ? `${count1Num[0]} over ${count1Num[1]}` : `${count1Num[1]} over ${count1Num[0]}`
      return new Category(CategoryType.NormalPoint, "normal point", output)
    } else {
      const count4Num = countMapNum[4][0]
      return new Category(CategoryType.AllOfAKind, "all of a kind", count4Num)
    }
  }

  private countMapNum = (dices: Dice[]): Record<number, string[]> => {
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