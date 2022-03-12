import {Game} from "./Game"

describe("game", () => {
  const game = new Game()

  const resultShouldBe = (input: string, result: string) => {
    const showResult: string = game.showResult(input)
    expect(showResult).toEqual(result)
  }

  test("both all of a kind", () => {
    resultShouldBe("Black: 5 5 5 5  White: 3 3 3 3",
      "Black win. - with all of a kind: 5")
  })
})