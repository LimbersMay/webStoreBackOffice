export interface Product {
    id: string;
    title: string;
    description?: string;
    categoryId: string;
    imageURL: string;
    imageName: string;
    price: number;
    stock: number;
    image?: File | null;
}