import {Dice} from "./Dice"

export class Player {
  readonly name: string
  readonly dices: Dice[]

  constructor(name: string, dices: Dice[]) {
    this.name = name
    this.dices = dices
  }
}