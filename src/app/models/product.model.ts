export interface Product{
  id          :string;
  title       :string;
  price       :number;
  images       :string[];
  description :string;
  category    :Category;
  taxes ?:number;
}

export interface Category{
   id: string;
   name: string;
}

//**El omit , omite las propiedades que se mencionan  */
export interface CreateProductDTO extends Omit<Product,'id' | 'category'>{
  categoryId:number;
}


//**Partial nos permite colocar todas las propiedades en opcionales */
export interface UpdateProductDTO extends Partial<CreateProductDTO>{

}
