import Home from './Home/Home';
import Cart from './Cart/Cart';
import Products from './Products/Products';
import SingleProduct from './Products/SingleProduct/SingleProduct';

import { singleLoader, multiLoader } from './Products/products-loaders';

import newsletterAction from './Home/toast-action';
import addToCart from './Products/SingleProduct/add-cart-action';

const Pages = { Home, Cart, Products, SingleProduct };
const loaders = { singleLoader, multiLoader };
const actions = { newsletterAction, addToCart };

export { Pages, loaders, actions };
