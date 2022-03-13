import {Dice} from "./Dice"
import {Data} from "./Data"

export class Player {
  readonly name: string
  readonly diceHands: DiceHands

  constructor(name: string, dices: Dice[]) {
    this.name = name
    this.diceHands = new DiceHands(dices)
  }

}

export class DiceHands {
  private readonly dices: Dice[]

  constructor(dices: Dice[]) {
    this.dices = dices
  }

  public getCountMapNum = (): Record<number, string[]> => {
    const numMapCount: Record<string, number> = {}
    for (const item of this.dices) {
      numMapCount[item.num] = numMapCount[item.num] ? numMapCount[item.num] + 1 : 1
    }
    const countMapNum: Record<number, string[]> = {}
    for (let num in numMapCount) {
      if (countMapNum[numMapCount[num]]) {
        countMapNum[numMapCount[num]].push(num)
      } else {
        countMapNum[numMapCount[num]] = [num]
      }
    }
    return countMapNum
  }

  public getCategoryType(): Category {
    if (this.isNoPoint()) {
      return new Category(CategoryType.NoPoint, "no point", "Tie.")
    } else if (this.isNormalPoint()) {
      const count1Num: string[] = this.getCountMapNum()[1]
      const output = Data.numOrder.indexOf(count1Num[0]) > Data.numOrder.indexOf(count1Num[1]) ? `${count1Num[0]} over ${count1Num[1]}` : `${count1Num[1]} over ${count1Num[0]}`
      return new Category(CategoryType.NormalPoint, "normal point", output)
    } else {
      const count4Num = this.getCountMapNum()[4][0]
      return new Category(CategoryType.AllOfAKind, "all of a kind", count4Num)
    }
  }

  private isNormalPoint(): boolean {
    return this.getCountMapNum()[2] !== undefined
  }

  private isNoPoint(): boolean {
    const countMapNumElement = this.getCountMapNum()[1]
    return countMapNumElement !== undefined && countMapNumElement.length === 4
  }
}

export class Category {
  readonly type: CategoryType
  readonly name: string
  readonly output: string

  constructor(type: CategoryType, name: string, output: string) {
    this.type = type
    this.name = name
    this.output = output
  }

}

export enum CategoryType {
  NormalPoint,
  AllOfAKind,
  NoPoint,
}