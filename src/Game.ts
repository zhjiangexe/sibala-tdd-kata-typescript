import {Parser} from "./Parser"
import {CategoryType, DiceHands} from "./Player"
import {DifferentCategoryComparer} from "./DifferentCategoryComparer"
import {AllOfAKindComparer} from "./AllOfAKindComparer"
import {NormalPointComparer} from "./NormalPointComparer"


export class Game {

  showResult(input: string): string {
    const parser = new Parser()
    const players = parser.parse(input)
    const diceHands1 = players[0].diceHands
    const diceHands2 = players[1].diceHands
    let comparer = this.getComparer(diceHands1, diceHands2)
    const result = comparer.compare(diceHands1, diceHands2)
    if (result.compareResult != 0) {
      const winnerPlayer = result.compareResult > 0 ? players[0].name : players[1].name
      return `${winnerPlayer} win. - with ${result.winnerCategory}: ${result.winnerOutput}`
    }
    return "Tie."
  }

  private getComparer(diceHands1: DiceHands, diceHands2: DiceHands) {
    if (diceHands1.getCategoryType().type != diceHands2.getCategoryType().type) {
      return new DifferentCategoryComparer()
    } else {
      if (diceHands1.getCategoryType().type === CategoryType.NormalPoint) {
        return new NormalPointComparer()
      } else {
        return new AllOfAKindComparer()
      }
    }
  }
}