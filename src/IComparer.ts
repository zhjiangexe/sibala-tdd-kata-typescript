import {DiceHands} from "./Player"

export interface CompareResult {
  compareResult: number
  winnerCategory: string | undefined
  winnerOutput: string | undefined
}

export interface IComparer {
  compare(diceHands1: DiceHands, diceHands2: DiceHands): CompareResult
}