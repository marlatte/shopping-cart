import { addNew } from '../../../cartController';

export default async function action({ request }) {
  const formData = await request.formData();
  const id = formData.get('product');
  addNew(id);
  console.log('Added product ', id, ' to cart');
  return null;
}
