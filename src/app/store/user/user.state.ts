export interface UserState {
  email: string;
  uid: string;
  role: string;
  favouriteIC: IceCreamFavourtie[];
  orders: Order[];
}

export interface IceCreamFavourtie {
  name: string;
}

export interface Order {
  date: string;
  order: string[];
}

export interface SingleOrder {
  name: string;
  value: number;
}
