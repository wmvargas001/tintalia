import collection from "../../../../postman/libros-aliados.postman_collection.json";

export async function GET() {
  return Response.json(collection, {
    headers: {
      "Content-Disposition":
        'attachment; filename="libros-aliados.postman_collection.json"',
    },
  });
}
