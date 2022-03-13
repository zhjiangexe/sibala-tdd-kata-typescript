import {Parser} from "./Parser"
import {Category, CategoryType} from "./Player"
import {Data} from "./Data"


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
    const diceHands1 = players[0].diceHands
    const diceHands2 = players[1].diceHands
    let compareResult
    let winnerCategory
    let winnerOutput
    if (diceHands1.getCategoryType().type != diceHands2.getCategoryType().type) {
      const differentCategoryComparer = new DifferentCategoryComparer()
      const result = differentCategoryComparer.compare(diceHands1.getCategoryType(), diceHands2.getCategoryType())
      compareResult = result.compareResult
      winnerCategory = result.winnerCategory
      winnerOutput = result.winnerOutput
    } else {
      if (diceHands2.getCategoryType().type === CategoryType.NormalPoint) {
        const sum1 = (diceHands1.getCountMapNum())[1].map(elem => parseInt(elem)).reduce((a, b) => a + b, 0)
        const sum2 = (diceHands2.getCountMapNum())[1].map(elem => parseInt(elem)).reduce((a, b) => a + b, 0)
        compareResult = sum1 - sum2
        winnerCategory = diceHands1.getCategoryType().name
        winnerOutput = diceHands2.getCategoryType().output
      } else {
        const allOfAKindComparer = new AllOfAKindComparer()
        const result = allOfAKindComparer.compare(diceHands1.getCategoryType(), diceHands2.getCategoryType())
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

}