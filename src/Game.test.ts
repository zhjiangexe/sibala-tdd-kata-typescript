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

  test("both normal point", () => {
    resultShouldBe("Black: 5 3 5 4  White: 2 6 2 3",
      "White win. - with normal point: 6 over 3")
    resultShouldBe("Black: 5 6 5 4  White: 2 6 2 3",
      "Black win. - with normal point: 4 over 6")
  })

  test("all of a kind win normal point", () => {
    resultShouldBe("Black: 5 5 5 5  White: 2 6 2 3",
      "Black win. - with all of a kind: 5")
  })

  test("both no point", () => {
    resultShouldBe("Black: 5 4 3 2  White: 6 1 2 3",
      "Tie.")
    resultShouldBe("Black: 5 5 5 2  White: 6 6 6 3",
      "Tie.")
  })

  test("all of a kind win no point", () => {
    resultShouldBe("Black: 5 5 5 5  White: 6 1 2 3",
      "Black win. - with all of a kind: 5")
  })
})