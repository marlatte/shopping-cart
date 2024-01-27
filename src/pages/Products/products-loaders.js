export async function multiLoader({ params }) {
  const { category } = params;
  return { category };
}

export async function singleLoader({ params }) {
  const { id } = params;
  return { id };
}
