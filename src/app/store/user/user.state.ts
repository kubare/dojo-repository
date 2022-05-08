export interface UserState {
  email: string;
  uid: string;
  role: string;
  favouriteIC: string[];
  orders: Order[];
}

export interface Order {
  date: string;
  order: string[];
}
