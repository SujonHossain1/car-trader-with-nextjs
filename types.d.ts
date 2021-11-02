interface ICar {
    _id?: string;
    make: string;
    model: string;
    year: number;
    fuelType: string;
    kilometers: number;
    details: string;
    price: number;
    photoUrl: string;
}

interface IFaq {
    _id?: string;
    question: string;
    answer: string;
}
