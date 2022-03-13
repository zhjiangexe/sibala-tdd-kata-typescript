import {Dice} from "./Dice"
import {Category, CategoryType} from "./Category"

export class Data {
  static numOrder: string[] = ["2", "3", "5", "6", "4", "1"]
}

export class DiceHands {
  private readonly dices: Dice[]

  constructor(dices: Dice[]) {
    this.dices = dices
  }

  public getCategoryType = (): Category => {
    if (this.isNoPoint()) {
      return new Category(CategoryType.NoPoint, "no point", "Tie.")
    } else if (this.isNormalPoint()) {
      const countOneDices: string[] = this.getCountOne()
      const output = Data.numOrder.indexOf(countOneDices[0]) > Data.numOrder.indexOf(countOneDices[1]) ? `${countOneDices[0]} over ${countOneDices[1]}` : `${countOneDices[1]} over ${countOneDices[0]}`
      return new Category(CategoryType.NormalPoint, "normal point", output)
    } else {
      const count4Num = this.getCountFour()[0]
      return new Category(CategoryType.AllOfAKind, "all of a kind", count4Num)
    }
  }

  private getCountMapNum = (): Record<number, string[]> => {
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

  public getCountFourNumOrder() {
    return Data.numOrder.indexOf(this.getCountFour()[0])
  }

  public getCountOne() {
    return this.getCountMapNum()[1]
  }

  private getCountTwo() {
    return this.getCountMapNum()[2]
  }

  private getCountThree() {
    return this.getCountMapNum()[3]
  }

  getCountFour() {
    return this.getCountMapNum()[4]
  }

  private isNormalPoint(): boolean {
    return this.getCountTwo() !== undefined
  }

  private isNoPoint(): boolean {
    return this.getCountThree() !== undefined
      || (this.getCountOne() !== undefined && this.getCountOne().length === 4)
  }
}

