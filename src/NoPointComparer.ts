import {CompareResult, IComparer} from "./IComparer"
import {DiceHands} from "./Player"

export class NoPointComparer implements IComparer {
  compare(diceHands1: DiceHands, diceHands2: DiceHands): CompareResult {
    return {
      compareResult: 0,
      winnerCategory: diceHands1.getCategoryType().name,
      winnerOutput: diceHands1.getCategoryType().output
    }
  }
}