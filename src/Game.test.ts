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
    resultShouldBe("Black: 5 5 5 5  White: 1 1 1 1",
      "White win. - with all of a kind: 1")
    resultShouldBe("Black: 4 4 4 4  White: 1 1 1 1",
      "White win. - with all of a kind: 1")
    resultShouldBe("Black: 4 4 4 4  White: 5 5 5 5",
      "Black win. - with all of a kind: 4")
    resultShouldBe("Black: 4 4 4 4  White: 6 6 6 6",
      "Black win. - with all of a kind: 4")
    resultShouldBe("Black: 4 4 4 4  White: 4 4 4 4",
      "Tie.")
  })
})