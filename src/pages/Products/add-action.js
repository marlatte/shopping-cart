import { addNew } from '../../cartController';

export default async function action({ request }) {
  const formData = await request.formData();
  const id = +formData.get('id');
  const price = +formData.get('price');
  addNew(id, price);
  return id;
}
