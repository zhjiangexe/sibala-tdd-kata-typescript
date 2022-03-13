import {CompareResult, IComparer} from "./IComparer"
import {DiceHands} from "../DiceHands"

export class DifferentCategoryComparer implements IComparer {
  public compare(diceHands1: DiceHands, diceHands2: DiceHands): CompareResult {
    const category1 = diceHands1.getCategoryType()
    const category2 = diceHands2.getCategoryType()
    const compareResult = category1.type - category2.type
    const winnerCategory = compareResult > 0 ? category1.name : category2.name
    const winnerOutput = compareResult > 0 ? category1.output : category2.output
    return {compareResult, winnerCategory, winnerOutput}
  }
}