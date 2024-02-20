export type Tenants = {
  id: string;
  name: string;
};
export type Roles = {
  id: string;
  name: string;
};
export type Booking = {
  id: number;
  name: string;
  localizedName : string;
  email: string;
  whatsAppWithCC : string;
  vehicleType : string;
  pickUpLocation : string;
  destination : string;
  status: string;
  bookingDate : Date;
};

export type ClientPreference = {
  id: number;
  name: string;
  theme: string;
  language: string;
  logo: string;
};
export type Customer = {
  id: number;
  name: string;
  localizedName: string;
  phone: string;
  address: string;
};
export type Coupon = {
  id: string;
  couponValue: string;
  type: string;
  couponFor: string;
  appliesTo: string;
  categories: string;
  codeLimit: number;
  perCustomerLimit: number;
  minimumOrderAmount: number;
};
export type Floor = {
  id: string;
  name: string;
};
export type Table = {
  id: string;
  name: string;
  floorId: number;
};
