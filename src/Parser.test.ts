import {Parser} from "./Parser"
import {Player} from "./Player"

describe("parser", () => {
  test("parse player name", () => {
    const parser = new Parser()

    const players = parser.parse("Black: 5 5 5 5  White: 3 3 3 3")

    expect(players).toEqual([
      new Player("Black"),
      new Player("White")
    ])
  })
})