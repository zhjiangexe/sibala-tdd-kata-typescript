import {Dice} from "./Dice"

export class Player {
  private name: string
  private dices: Dice[]

  constructor(name: string, dices: Dice[]) {
    this.name = name
    this.dices = dices
  }
}