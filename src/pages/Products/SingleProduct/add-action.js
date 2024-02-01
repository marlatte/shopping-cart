import { addNew } from '../../../cartController';

export default async function action({ request }) {
  const formData = await request.formData();
  const id = +formData.get('id');
  console.log('Adding product :', id);
  addNew(id);
  return id;
}
