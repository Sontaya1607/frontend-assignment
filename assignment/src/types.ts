export type ItemModel = {
  type: 'Fruit' | 'Vegetable'
  name: string
}

export type UserModel = {
  id:         number;
  firstName:  string;
  lastName:   string;
  maidenName: string;
  age:        number;
  gender:     string;
  email:      string;
  phone:      string;
  username:   string;
  password:   string;
  birthDate:  string;
  image:      string;
  bloodGroup: string;
  height:     number;
  weight:     number;
  eyeColor:   string;
  hair:       HairModel;
  ip:         string;
  address:    AddressModel;
  macAddress: string;
  university: string;
  bank:       BankModel;
  company:    CompanyModel;
  ein:        string;
  ssn:        string;
  userAgent:  string;
  crypto:     Crypto;
  role:       string;
}

export type AddressModel = {
  address:     string;
  city:        string;
  state:       string;
  stateCode:   string;
  postalCode:  string;
  coordinates: CoordinatesModel;
  country:     string;
}

export type CoordinatesModel = {
  lat: number;
  lng: number;
}

export type BankModel = {
  cardExpire: string;
  cardNumber: string;
  cardType:   string;
  currency:   string;
  iban:       string;
}

export type CompanyModel = {
  department: string;
  name:       string;
  title:      string;
  address:    AddressModel;
}

export type CryptoModel = {
  coin:    string;
  wallet:  string;
  network: string;
}

export type HairModel = {
  color: string;
  type:  string;
}

export type DepartmentModel = {
  male: number
  female: number
  ageRange: string
  hair: { [k in string]: number }
  addressUser: { [k in string]: string }
}