# Sibala TDD kata

## There are four dices, numbers are 1 to 6


## There are different category


1. **all of a kind**: dices numbers are same, ex1: 2 2 2 2, ex2: 6 6 6 6
    - order of numbers: 1 > 4 > 6 > 5 > 3 > 2 if there are two all of a kind
2. **normal point**: two dices are pair which has same number, then result is sum of other two dices, ex1: 5 3 5 4 get 7, ex2:6 6 2 3 get 5
    - compare two normal point: when sum of two dices are same, compare bigger one, ex1: 5 3 5 4 => 3+4=7, ex2: 2 2 6 1 => 6+1=7, 4 < 6, ex2 win
3. **no point**: four dices are different, or three dices are same
    - there are same that means Tie.

## Test cases

1. Black: 5 3 5 4 White: 2 6 2 3
   - White win. - with normal point: 6 over 3
2. Black: 5 5 5 5 White: 2 6 2 3
   - Black win. - with all of a kind: 5
3. Black: 3 5 5 5 White: 4 1 4 2
   - White win. - with normal point: 3
4. Black: 3 4 5 5 White: 4 1 4 6
   - White win. - with normal point: 6 over 1
5. Black: 3 5 5 5 White: 4 1 3 6
   - Tie.
6. Black: 3 6 5 5 White: 4 4 3 6o
   - Tie.

## Thinking

1. dice number
2. dice type
3. dice compare
4. two player
5. more condition