export type Category = {
  id: string;
  name: string;
  slug: string;
  productsCount: number;
  status: "active" | "inactive";
  createdAt: string;
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    productsCount: 128,
    status: "active",
    createdAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "2",
    name: "Clothing",
    slug: "clothing",
    productsCount: 94,
    status: "active",
    createdAt: "2024-01-12T10:30:00Z",
  },
  {
    id: "3",
    name: "Home & Garden",
    slug: "home-garden",
    productsCount: 73,
    status: "active",
    createdAt: "2024-01-15T14:00:00Z",
  },
  {
    id: "4",
    name: "Books",
    slug: "books",
    productsCount: 210,
    status: "inactive",
    createdAt: "2024-01-18T08:45:00Z",
  },
  {
    id: "5",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    productsCount: 55,
    status: "active",
    createdAt: "2024-02-01T11:00:00Z",
  },
  {
    id: "6",
    name: "Beauty & Health",
    slug: "beauty-health",
    productsCount: 87,
    status: "active",
    createdAt: "2024-02-05T16:20:00Z",
  },
  {
    id: "7",
    name: "Toys & Games",
    slug: "toys-games",
    productsCount: 62,
    status: "inactive",
    createdAt: "2024-02-10T09:15:00Z",
  },
  {
    id: "8",
    name: "Food & Beverages",
    slug: "food-beverages",
    productsCount: 39,
    status: "active",
    createdAt: "2024-02-14T13:00:00Z",
  },
  {
    id: "9",
    name: "Automotive",
    slug: "automotive",
    productsCount: 18,
    status: "inactive",
    createdAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "10",
    name: "Office Supplies",
    slug: "office-supplies",
    productsCount: 44,
    status: "active",
    createdAt: "2024-03-05T15:30:00Z",
  },
];
