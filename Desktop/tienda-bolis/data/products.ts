// data/products.ts
export type Product = {
  id: string;
  name: string;
  price: number; // céntimos (1999 = 19,99 €)
  image: string; // URL o /ruta en /public
  gelato: {
    sku?: string;          // variante/sku de Gelato (lo rellenamos luego)
    productUid?: string;   // alternativa a sku
    templateId?: string;   // si usas plantillas
    fileUrl?: string;      // URL pública del diseño (PNG/SVG)
    printArea?: "front" | "back" | "default";
  };
};

export const PRODUCTS: Product[] = [
  {
    id: "boli-logo",
    name: "Bolígrafo logo",
    price: 299,
    image: "/mock/boli.png",
    gelato: {
      sku: "TODO_SKU_BOLI",
      fileUrl: "https://tu-cdn.com/disenos/logo.png",
      printArea: "default",
    },
  },
  {
    id: "camiseta-logo",
    name: "Camiseta unisex – Logo",
    price: 1999,
    image: "/mock/camiseta.png",
    gelato: {
      sku: "TODO_SKU_CAMISETA",
      fileUrl: "https://tu-cdn.com/disenos/logo.png",
      printArea: "front",
    },
  },
  {
    id: "pegatina-logo",
    name: "Pack pegatinas logo",
    price: 499,
    image: "/mock/pegatina.png",
    gelato: {
      sku: "TODO_SKU_PEGATINA",
      fileUrl: "https://tu-cdn.com/disenos/logo.png",
      printArea: "default",
    },
  },
];
