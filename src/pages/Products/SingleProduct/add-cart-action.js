export default async function action({ request }) {
  const formData = await request.formData();
  const id = formData.get('product');
  return id;
}
