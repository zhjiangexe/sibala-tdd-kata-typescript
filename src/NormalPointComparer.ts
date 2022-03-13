import {CompareResult, IComparer} from "./IComparer"
import {DiceHands} from "./Player"

export class NormalPointComparer implements IComparer {
  public compare(diceHands1: DiceHands, diceHands2: DiceHands): CompareResult {
    const sum1 = (diceHands1.getCountMapNum())[1].map(elem => parseInt(elem)).reduce((a, b) => a + b, 0)
    const sum2 = (diceHands2.getCountMapNum())[1].map(elem => parseInt(elem)).reduce((a, b) => a + b, 0)
    const compareResult = sum1 - sum2
    const winnerCategory = compareResult > 0 ? diceHands1.getCategoryType().name : diceHands2.getCategoryType().name
    const winnerOutput = compareResult > 0 ? diceHands1.getCategoryType().output : diceHands2.getCategoryType().output
    return {compareResult, winnerCategory, winnerOutput}
  }
}