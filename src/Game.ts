import {Parser} from "./Parser"
import {CategoryType, DiceHands} from "./Player"
import {Data} from "./Data"


interface CompareResult {
  compareResult: number
  winnerCategory: string | undefined
  winnerOutput: string | undefined
}

class DifferentCategoryComparer {
  public compare(diceHands1: DiceHands, diceHands2: DiceHands): CompareResult {
    const category1 = diceHands1.getCategoryType()
    const category2 = diceHands2.getCategoryType()
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
  public compare(diceHands1: DiceHands, diceHands2: DiceHands): CompareResult {
    const category = diceHands1.getCategoryType()
    const category3 = diceHands2.getCategoryType()
    const compareResult = Data.numOrder.indexOf(category.output) - Data.numOrder.indexOf(category3.output)
    let winnerCategory
    let winnerOutput
    if (compareResult > 0) {
      winnerCategory = category.name
      winnerOutput = category.output
    } else if (compareResult < 0) {
      winnerCategory = category3.name
      winnerOutput = category3.output
    }
    return {compareResult, winnerCategory, winnerOutput}
  }
}

class NormalPointComparer {
  public compare(diceHands1: DiceHands, diceHands2: DiceHands): CompareResult {
    const sum1 = (diceHands1.getCountMapNum())[1].map(elem => parseInt(elem)).reduce((a, b) => a + b, 0)
    const sum2 = (diceHands2.getCountMapNum())[1].map(elem => parseInt(elem)).reduce((a, b) => a + b, 0)
    const compareResult = sum1 - sum2
    const winnerCategory = compareResult > 0 ? diceHands1.getCategoryType().name : diceHands2.getCategoryType().name
    const winnerOutput = compareResult > 0 ? diceHands2.getCategoryType().output : diceHands2.getCategoryType().output
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
      const result = differentCategoryComparer.compare(diceHands1, diceHands2)
      compareResult = result.compareResult
      winnerCategory = result.winnerCategory
      winnerOutput = result.winnerOutput
    } else {
      if (diceHands1.getCategoryType().type === CategoryType.NormalPoint) {
        const normalPointComparer = new NormalPointComparer()
        const result = normalPointComparer.compare(diceHands1, diceHands2)
        compareResult = result.compareResult
        winnerCategory = result.winnerCategory
        winnerOutput = result.winnerOutput
      } else {
        const allOfAKindComparer = new AllOfAKindComparer()
        const result = allOfAKindComparer.compare(diceHands1, diceHands2)
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