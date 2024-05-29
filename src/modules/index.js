import auth from "./auth";
import profile from "./profile";
import categories from "./categories";
import brands from "./brands";
import slug from "./slug";
import products from "./products";
import posts from "./posts";
import comments from "./comments";
import staticdata from "./staticdata";
import favorite from "./favorite";
import shops from "./shops";
import cart from "./cart";

export default ($apiSettings) => {
  return {
    auth: auth($apiSettings),
    profile: profile($apiSettings),
    categories: categories($apiSettings),
    brands: brands($apiSettings),
    slug: slug($apiSettings),
    products: products($apiSettings),
    posts: posts($apiSettings),
    comments: comments($apiSettings),
    staticdata: staticdata($apiSettings),
    favorite: favorite($apiSettings),
    shops: shops($apiSettings),
    cart: cart($apiSettings),
  };
};
