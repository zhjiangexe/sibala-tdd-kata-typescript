import {CompareResult, IComparer} from "./IComparer"
import {DiceHands} from "../DiceHands"

export class NormalPointComparer implements IComparer {
  public compare(diceHands1: DiceHands, diceHands2: DiceHands): CompareResult {
    let compareResult = this.getSumOfCountOne(diceHands1) - this.getSumOfCountOne(diceHands2)
    if (compareResult === 0) {
      compareResult = this.getMax(diceHands1) - this.getMax(diceHands2)
    }
    const winnerCategory = compareResult > 0 ? diceHands1.getCategoryType().name : diceHands2.getCategoryType().name
    const winnerOutput = compareResult > 0 ? diceHands1.getCategoryType().output : diceHands2.getCategoryType().output
    return {compareResult, winnerCategory, winnerOutput}
  }

  private getMax(diceHands: DiceHands) {
    return Math.max(...this.getCountOneNumbers(diceHands))
  }

  private getSumOfCountOne(diceHands: DiceHands) {
    return this.getCountOneNumbers(diceHands).reduce((a, b) => a + b, 0)
  }

  private getCountOneNumbers(diceHands: DiceHands) {
    return diceHands.getCountOne().map(elem => parseInt(elem))
  }
}