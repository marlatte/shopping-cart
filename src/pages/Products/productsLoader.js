export default async function loader({ params }) {
  const result = params.category;
  return { result };
}
