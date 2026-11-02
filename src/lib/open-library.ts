// Cliente de Open Library (https://openlibrary.org/developers/api).
// API pública y sin clave: la usamos como catálogo aliado para consultar
// fichas y sinopsis de libros que no están en el inventario propio.

const BASE_URL = "https://openlibrary.org";
const COVERS_URL = "https://covers.openlibrary.org";

// Los datos bibliográficos cambian poco; una hora de caché evita golpear
// la API en cada visita y nos mantiene lejos de su límite de uso.
const REVALIDATE_SECONDS = 3600;

const SEARCH_FIELDS = [
  "key",
  "title",
  "author_name",
  "first_publish_year",
  "cover_i",
  "edition_count",
  "ratings_average",
  "ratings_count",
].join(",");

export const PAGE_SIZE = 12;

export type PartnerBookSummary = {
  workId: string;
  title: string;
  authors: string[];
  firstPublishYear?: number;
  coverId?: number;
  editionCount: number;
  rating?: number;
  ratingCount: number;
};

export type PartnerBookDetail = {
  workId: string;
  title: string;
  authors: string[];
  synopsis?: string;
  subjects: string[];
  coverId?: number;
  firstPublishDate?: string;
  rating?: number;
  ratingCount: number;
};

type SearchDoc = {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  edition_count?: number;
  ratings_average?: number;
  ratings_count?: number;
};

type WorkResponse = {
  title: string;
  description?: string | { value: string };
  subjects?: string[];
  covers?: number[];
  first_publish_date?: string;
  authors?: { author: { key: string } }[];
};

async function getJson<T>(path: string): Promise<T | null> {
  const response = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: { Accept: "application/json" },
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Open Library respondió ${response.status} en ${path}`);
  }
  return response.json() as Promise<T>;
}

export function coverUrl(coverId: number, size: "S" | "M" | "L" = "M") {
  return `${COVERS_URL}/b/id/${coverId}-${size}.jpg`;
}

export async function searchPartnerBooks(query: string, page = 1) {
  const params = new URLSearchParams({
    q: query,
    lang: "es",
    page: String(page),
    limit: String(PAGE_SIZE),
    fields: SEARCH_FIELDS,
  });
  const data = await getJson<{ numFound: number; docs: SearchDoc[] }>(
    `/search.json?${params}`,
  );

  const books: PartnerBookSummary[] = (data?.docs ?? []).map((doc) => ({
    workId: doc.key.replace("/works/", ""),
    title: doc.title,
    authors: doc.author_name ?? [],
    firstPublishYear: doc.first_publish_year,
    coverId: doc.cover_i,
    editionCount: doc.edition_count ?? 0,
    rating: doc.ratings_average,
    ratingCount: doc.ratings_count ?? 0,
  }));

  return { total: data?.numFound ?? 0, books };
}

export async function getPartnerBook(
  workId: string,
): Promise<PartnerBookDetail | null> {
  if (!/^OL\d+W$/.test(workId)) return null;

  const [work, ratings] = await Promise.all([
    getJson<WorkResponse>(`/works/${workId}.json`),
    getJson<{ summary: { average?: number; count: number } }>(
      `/works/${workId}/ratings.json`,
    ).catch(() => null),
  ]);
  if (!work) return null;

  const authors = await Promise.all(
    (work.authors ?? []).slice(0, 3).map(async ({ author }) => {
      const data = await getJson<{ name?: string }>(`${author.key}.json`).catch(
        () => null,
      );
      return data?.name;
    }),
  );

  const description =
    typeof work.description === "string"
      ? work.description
      : work.description?.value;

  return {
    workId,
    title: work.title,
    authors: authors.filter((name): name is string => Boolean(name)),
    synopsis: description ? cleanSynopsis(description) : undefined,
    subjects: (work.subjects ?? []).slice(0, 8),
    coverId: work.covers?.find((id) => id > 0),
    firstPublishDate: work.first_publish_date,
    rating: ratings?.summary.average,
    ratingCount: ratings?.summary.count ?? 0,
  };
}

// Las sinopsis vienen en Markdown escrito por la comunidad: a veces con la
// versión en otro idioma tras un separador "----", referencias a la fuente
// y énfasis. Nos quedamos con el primer bloque en texto plano.
function cleanSynopsis(text: string) {
  return text
    .replace(/\r/g, "")
    .split(/\n-{3,}\n/)[0]
    .replace(/^\[\d+\]:.*$/gm, "")
    .replace(/\[([^\]]+)\]\[\d+\]/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*?([^*]+)\*\*?/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function partnerStoreUrl(title: string, author?: string) {
  const query = [title, author].filter(Boolean).join(" ");
  return `https://www.buscalibre.com.co/libros/search?q=${encodeURIComponent(query)}`;
}
