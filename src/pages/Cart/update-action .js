import { update } from '../../cartController';

export default async function action({ request }) {
  const formData = await request.formData();
  const id = +formData.get('id');
  const quantity = +formData.get('quantity');
  const modifier = +formData.get('modifier');

  const newQuant = modifier ? quantity + modifier : quantity;

  if (newQuant > 0) {
    update(id, newQuant);
  }
  return null;
}
