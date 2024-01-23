# Shopping Cart

\* denotes low-priority items

## Features

- Filterable results (get all, then [match-sorter](https://github.com/kentcdodds/match-sorter)) \*
- Navbar to switch bt pages
  - Cart icon with auto-updating Badge showing number of items
    - Need to control this high in the hierarchy with useState
    - Or with [localForage](https://github.com/localForage/localForage) \*
  - Search icon (expands search input, then filter by title and description) \*
  - Menu icon -> Offcanvas: Men, Women, Jewelry, Electronics, & All Products sections
- Add items to cart on individual product pages

## Components & Routes

- Root (cartController?)
  - Navbar
  - Offcanvas Menu
  - children:
    - Home `index: true`
    - Cart
    - Products/:category
    - Product/:id
  - Footer

## React Router tips:

- `/path/:dynamicSegment` means you'll be using:

```
export async function loader({ params }) {
  const result = doAThing(params.dynamicSegment);
  return { result }
}

export default Component() {
  const { result } = useLoaderData();
}
```
