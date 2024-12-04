import { All_Beauty } from "./All_Beauty_top3000_metadata";
import { Amazon_Fashion } from "./Amazon_Fashion_top3000_metadata";
import { Appliances } from "./Appliances_top3000_metadata";
import { Arts_Crafts_and_Sewing } from "./Arts_Crafts_and_Sewing_top3000_metadata";
import { Automotive } from "./Automotive_top3000_metadata";
import { Baby_Products } from "./Baby_Products_top3000_metadata";
import { Beauty_and_Personal_Care } from "./Beauty_and_Personal_Care_top3000_metadata";
import { Books } from "./Books_top3000_metadata";
import { CDs_and_Vinyl } from "./CDs_and_Vinyl_top3000_metadata";
import { Cell_Phones_and_Accessories } from "./Cell_Phones_and_Accessories_top3000_metadata";
import { Clothing_Shoes_and_Jewelry } from "./Clothing_Shoes_and_Jewelry_top3000_metadata";
import { Digital_Music } from "./Digital_Music_top3000_metadata";
import { Electronics } from "./Electronics_top3000_metadata";
import { Gift_Cards } from "./Gift_Cards_top3000_metadata";
import { Grocery_and_Gourmet_Food } from "./Grocery_and_Gourmet_Food_top3000_metadata";
import { Handmade_Products } from "./Handmade_Products_top3000_metadata";
import { Health_and_Household } from "./Health_and_Household_top3000_metadata";
import { Health_and_Personal_Care } from "./Health_and_Personal_Care_top3000_metadata";
import { Home_and_Kitchen } from "./Home_and_Kitchen_top3000_metadata";
import { Industrial_and_Scientific } from "./Industrial_and_Scientific_top3000_metadata";
import { Kindle_Store } from "./Kindle_Store_top3000_metadata";
import { Magazine_Subscriptions } from "./Magazine_Subscriptions_top3000_metadata";
import { Movies_and_TV } from "./Movies_and_TV_top3000_metadata";
import { Musical_Instruments } from "./Musical_Instruments_top3000_metadata";
import { Office_Products } from "./Office_Products_top3000_metadata";
import { Patio_Lawn_and_Garden } from "./Patio_Lawn_and_Garden_top3000_metadata";
import { Pet_Supplies } from "./Pet_Supplies_top3000_metadata";
import { Software } from "./Software_top3000_metadata";
import { Sports_and_Outdoors } from "./Sports_and_Outdoors_top3000_metadata";
import { Subscription_Boxes } from "./Subscription_Boxes_top3000_metadata";
import { Tools_and_Home_Improvement } from "./Tools_and_Home_Improvement_top3000_metadata";
import { Toys_and_Games } from "./Toys_and_Games_top3000_metadata";
import { Video_Games } from "./Video_Games_top3000_metadata";

// const categories = [
//   "All_Beauty",
//   "Amazon_Fashion",
//   "Appliances",
//   "Arts_Crafts_and_Sewing",
//   "Automotive",
//   "Baby_Products",
//   "Beauty_and_Personal_Care",
//   "Books",
//   "CDs_and_Vinyl",
//   "Cell_Phones_and_Accessories",
//   "Clothing_Shoes_and_Jewelry",
//   "Digital_Music",
//   "Electronics",
//   "Gift_Cards",
//   "Grocery_and_Gourmet_Food",
//   "Handmade_Products",
//   "Health_and_Household",
//   "Health_and_Personal_Care",
//   "Home_and_Kitchen",
//   "Industrial_and_Scientific",
//   "Kindle_Store",
//   "Magazine_Subscriptions",
//   "Movies_and_TV",
//   "Musical_Instruments",
//   "Office_Products",
//   "Patio_Lawn_and_Garden",
//   "Pet_Supplies",
//   "Software",
//   "Sports_and_Outdoors",
//   "Subscription_Boxes",
//   "Tools_and_Home_Improvement",
//   "Toys_and_Games",
//   "Video_Games",
// ];

export interface ItemInfo {
  main_category: null | string;
  title: null | string;
  average_rating: null | number;
  rating_number: null | number;
  features: (string | null)[];
  description: (string | null)[];
  price: null | string;
  images: {
    hi_res: (string | null)[]; // null을 허용하도록 수정
    large: (string | null)[];
    thumb: (string | null)[];
    variant: (string | null)[];
  };
  videos: {
    title: (string | null)[];
    url: string[];
    user_id: string[];
  };
  store: null | string;
  categories: (string | null)[];
  details: null | string;
  parent_asin: null | string;
  bought_together: null | string;
  subtitle: null | string;
  author: null | string;
}

export interface itemJsonType {
  [category: string]: ItemInfo[];
}

export const itemJson: itemJsonType = {
  All_Beauty: All_Beauty,
  Amazon_Fashion: Amazon_Fashion,
  Appliances: Appliances,
  Arts_Crafts_and_Sewing: Arts_Crafts_and_Sewing,
  Automotive: Automotive,
  Baby_Products: Baby_Products,
  Beauty_and_Personal_Care: Beauty_and_Personal_Care,
  Books: Books,
  CDs_and_Vinyl: CDs_and_Vinyl,
  Cell_Phones_and_Accessories: Cell_Phones_and_Accessories,
  Clothing_Shoes_and_Jewelry: Clothing_Shoes_and_Jewelry,
  Digital_Music: Digital_Music,
  Electronics: Electronics,
  Gift_Cards: Gift_Cards,
  Grocery_and_Gourmet_Food: Grocery_and_Gourmet_Food,
  Handmade_Products: Handmade_Products,
  Health_and_Household: Health_and_Household,
  Health_and_Personal_Care: Health_and_Personal_Care,
  Home_and_Kitchen: Home_and_Kitchen,
  Industrial_and_Scientific: Industrial_and_Scientific,
  Kindle_Store: Kindle_Store,
  Magazine_Subscriptions: Magazine_Subscriptions,
  Movies_and_TV: Movies_and_TV,
  Musical_Instruments: Musical_Instruments,
  Office_Products: Office_Products,
  Patio_Lawn_and_Garden: Patio_Lawn_and_Garden,
  Pet_Supplies: Pet_Supplies,
  Software: Software,
  Sports_and_Outdoors: Sports_and_Outdoors,
  Subscription_Boxes: Subscription_Boxes,
  Tools_and_Home_Improvement: Tools_and_Home_Improvement,
  Toys_and_Games: Toys_and_Games,
  Video_Games: Video_Games,
};
