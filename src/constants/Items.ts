export const categoryList = [
  "All_Beauty",
  "Amazon_Fashion",
  "Appliances",
  "Arts_Crafts_and_Sewing",
  "Automotive",
  "Baby_Products",
  "Beauty_and_Personal_Care",
  "Books",
  "CDs_and_Vinyl",
  "Cell_Phones_and_Accessories",
  "Clothing_Shoes_and_Jewelry",
  "Digital_Music",
  "Electronics",
  "Gift_Cards",
  "Grocery_and_Gourmet_Food",
  "Handmade_Products",
  "Health_and_Household",
  "Health_and_Personal_Care",
  "Home_and_Kitchen",
  "Industrial_and_Scientific",
  "Kindle_Store",
  "Magazine_Subscriptions",
  "Movies_and_TV",
  "Musical_Instruments",
  "Office_Products",
  "Patio_Lawn_and_Garden",
  "Pet_Supplies",
  "Software",
  "Sports_and_Outdoors",
  "Subscription_Boxes",
  "Tools_and_Home_Improvement",
  "Toys_and_Games",
  "Video_Games",
];

export interface ItemInfo {
  main_category?: null | string;
  title?: null | string;
  average_rating?: null | number;
  rating_number?: null | number;
  description?: (string | null)[] | null;
  price?: null | string;
  images?: {
    hi_res: string | null; // null을 허용하도록 수정
    thumb: string | null;
    variant: (string | null)[];
  };
  store?: null | string;
  categories?: (string | null)[] | null;
  details?: null | string;
  parent_asin?: null | string;
  bought_together?: null | string;
  subtitle?: null | string;
  author?: null | string;
}

export interface itemJsonType {
  [category: string]: ItemInfo[];
}
