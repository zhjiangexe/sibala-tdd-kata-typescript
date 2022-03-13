import {Dice} from "./Dice"
import {DiceHands} from "./DiceHands"

export class Player {
  readonly name: string
  readonly diceHands: DiceHands

  constructor(name: string, dices: Dice[]) {
    this.name = name
    this.diceHands = new DiceHands(dices)
  }

}

