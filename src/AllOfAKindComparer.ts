import {CompareResult, IComparer} from "./IComparer"
import {DiceHands} from "./Player"
import {Data} from "./Data"

export class AllOfAKindComparer implements IComparer {
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