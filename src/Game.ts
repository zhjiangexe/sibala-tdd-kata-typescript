import {Parser} from "./Parser"
import {DifferentCategoryComparer} from "./comparer/DifferentCategoryComparer"
import {AllOfAKindComparer} from "./comparer/AllOfAKindComparer"
import {NormalPointComparer} from "./comparer/NormalPointComparer"
import {NoPointComparer} from "./comparer/NoPointComparer"
import {DiceHands} from "./DiceHands"
import {CategoryType} from "./Category"


export class Game {

  showResult(input: string): string {
    const parser = new Parser()
    const players = parser.parse(input)
    const diceHands1 = players[0].diceHands
    const diceHands2 = players[1].diceHands
    const comparer = this.getComparer(diceHands1, diceHands2)
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
    }
    switch (diceHands1.getCategoryType().type) {
      case CategoryType.NoPoint:
        return new NoPointComparer()
      case CategoryType.NormalPoint:
        return new NormalPointComparer()
      default:
        return new AllOfAKindComparer()
    }
  }
}