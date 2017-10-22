import {Store} from "./StoreService";

export class StoreDto {
  id: string;
  name: string;
  address: {
    apartment: string,
    street: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    pincode: number
  };

  static convert(stores: Store[]): StoreDto[] {
    return stores.map(store => new StoreDto(store));
  }

  constructor(store: Store) {
    this.id = store._id;
    this.name = store.name;
    this.address = store.address;
  }
}