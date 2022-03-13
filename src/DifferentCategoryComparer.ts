import {CompareResult, IComparer} from "./IComparer"
import {DiceHands} from "./Player"

export class DifferentCategoryComparer implements IComparer {
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