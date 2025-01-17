export interface CategoryTypes {
  id: number;
  icon: any;
  href: string;
  translations: {
    vi: {
      title: string;
    };
    en: {
      title: string;
    };
  };
  childmenu: [
    {
      id: number;
      translations: {
        vi: {
          title: string;
        };
        en: {
          title: string;
        };
      };
      childmenu: [
        {
          id: number;
          translations: {
            vi: {
              title: string;
            };
            en: {
              title: string;
            };
          };
        }
      ];
    }
  ];
}

export interface ProductType {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
  checked: boolean;
  quantity: number;
}

export interface ContextType {
  pageLoader: boolean;
  setPageLoader: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  product: ProductType | null;
  setProduct: Dispatch<SetStateAction<ProductType>>;
}

export interface GroupedProductsType {
  categoryName: string;
  image: string;
  data: ProductType[];
}
