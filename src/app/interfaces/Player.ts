export interface Player {
  _id: string,
  name: string,
  position: string,
  thumbnail: string,
  signin: [{
    amount: number,
    currency: string
  }]
  born: Date
}

