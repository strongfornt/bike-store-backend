export interface Bike {
    name: string;
    brand: "Yamaha" | "Suzuki" | "Honda" | "Bajaj" | "Hero" |"TVS";
    price: number;
    category:'Mountain' | 'Road' | 'Hybrid' | 'Electric';
    description: string;
    quantity: number;
    image: string;
    inStock: boolean;
}


export interface IUpdatedBike extends Partial<Bike> {}