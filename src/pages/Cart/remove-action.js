import { remove } from '../../cartController';

export default async function action({ request }) {
  const formData = await request.formData();
  const id = +formData.get('remove');
  console.log('Removing product:', id);
  remove(id);
  return null;
}
