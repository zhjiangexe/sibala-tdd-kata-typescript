import {Parser} from "../src/Parser"
import {Player} from "../src/Player"
import {Dice} from "../src/Dice"

describe("parser", () => {
  test("parse player", () => {
    const parser = new Parser()

    const players = parser.parse("Black: 5 5 5 5  White: 3 3 3 3")

    expect(players).toEqual([
      new Player("Black", [
        new Dice("5"),
        new Dice("5"),
        new Dice("5"),
        new Dice("5")
      ]),
      new Player("White", [
        new Dice("3"),
        new Dice("3"),
        new Dice("3"),
        new Dice("3")
      ])
    ])
  })
})