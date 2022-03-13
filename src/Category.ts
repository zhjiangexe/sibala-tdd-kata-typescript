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
  NoPoint,
  NormalPoint,
  AllOfAKind,
}