export default async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  return email;
}
