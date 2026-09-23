import type { Book } from "./types";

const books: Book[] = [
  {
    slug: "cien-anos-de-soledad",
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    price: 65000,
    currency: "COP",
    coverUrl: "/covers/cien-anos-de-soledad.svg",
    description:
      "La historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.",
    category: "Ficción",
    stock: 12,
    featured: true,
  },
  {
    slug: "el-otono-del-patriarca",
    title: "El otoño del patriarca",
    author: "Gabriel García Márquez",
    price: 58000,
    currency: "COP",
    coverUrl: "/covers/el-otono-del-patriarca.svg",
    description:
      "Un retrato del poder absoluto a través de la figura de un dictador latinoamericano sin nombre.",
    category: "Ficción",
    stock: 5,
  },
  {
    slug: "la-vorágine",
    title: "La vorágine",
    author: "José Eustasio Rivera",
    price: 42000,
    currency: "COP",
    coverUrl: "/covers/la-voragine.svg",
    description:
      "Novela colombiana que narra la aventura y tragedia de Arturo Cova en la selva amazónica.",
    category: "Clásicos",
    stock: 0,
  },
];

export function getAllBooks(): Book[] {
  return books;
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getFeaturedBook(): Book {
  return books.find((book) => book.featured) ?? books[0];
}

export function getCategories(): string[] {
  return Array.from(new Set(books.map((book) => book.category)));
}
