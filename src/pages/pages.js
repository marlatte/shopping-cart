import Home from './Home/Home';
import Cart from './Cart/Cart';
import Products from './Products/Products';
import SingleProduct from './Products/SingleProduct';

import { singleLoader, multiLoader } from './Products/products-loaders';

import newsletterAction from './Home/newsletter-action';
import addToCart from './Products/add-action';
import removeFromCart from './Cart/remove-action';
import updateCart from './Cart/update-action ';

const Pages = { Home, Cart, Products, SingleProduct };
const loaders = { singleLoader, multiLoader };
const actions = { newsletterAction, addToCart, removeFromCart, updateCart };

export { Pages, loaders, actions };
