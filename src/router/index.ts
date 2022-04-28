import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // Main Pages no login

  {
    path: "/",
    name: "home",
    component: () => import("../pages/Index.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../pages/auth/Profile.vue"),
  },
  {
    path: "/sell",
    name: "sell",
    component: () => import("../pages/vendor/Sell.vue"),
  },
  {
    path: "/vendoragreement",
    name: "vendoragreement",
    component: () => import("../pages/legal/VendorAgreement.vue"),
  },
  {
    path: "/vendor/itemsforsale",
    name: "forsale",
    component: () => import("../pages/vendor/itemsForSale.vue"),
  },
  {
    path: "/item/:id",
    name: "item",
    component: () => import("../pages/Item/Item.vue"),
  },

  {
    path: "/vendor/createitem",
    name: "createquick",
    component: () => import("../pages/vendorcreateitem/CreateItem.vue"),
  },
  {
    path: "/vendor/edititem/:id",
    name: "edititem",
    component: () => import("../pages/vendorcreateitem/EditItem.vue"),
  },
  {
    path: "/wallet",
    name: "wallet",
    component: () => import("../pages/wallets/WalletHome.vue"),
  },
  {
    path: "/wallet/btc",
    name: "btcwallet",
    component: () => import("../pages/wallets/btc/BtcTransactions.vue"),
  },
  {
    path: "/wallet/btc/send",
    name: "btcwalletsend",
    component: () => import("../pages/wallets/btc/BtcSend.vue"),
  },
  {
    path: "/wallet/btc/recieve",
    name: "btcwalletrecieve",
    component: () => import("../pages/wallets/btc/BtcRecieve.vue"),
  },
  {
    path: "/wallet/bch",
    name: "bchwallet",
    component: () => import("../pages/wallets/bch/BchTransactions.vue"),
  },

  {
    path: "/wallet/bch/send",
    name: "bchwalletsend",
    component: () => import("../pages/wallets/bch/BchSend.vue"),
  },
  {
    path: "/wallet/bch/recieve",
    name: "bchwalletrecieve",
    component: () => import("../pages/wallets/bch/BchRecieve.vue"),
  },
  {
    path: "/wallet/xmr",
    name: "xmrwallet",
    component: () => import("../pages/wallets/xmr/XmrTransactions.vue"),
  },
  {
    path: "/wallet/xmr/send",
    name: "xmrwalletsend",
    component: () => import("../pages/wallets/xmr/XmrSend.vue"),
  },
  {
    path: "/wallet/xmr/recieve",
    name: "xmrwalletrecieve",
    component: () => import("../pages/wallets/xmr/XmrRecieve.vue"),
  },
  // checkout
  {
    path: "/cart",
    name: "cart",
    component: () => import("../pages/checkout/Cart.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../pages/checkout/Checkout.vue"),
  },
  // Plain Stuff
  {
    path: "/auth/login",
    name: "login",
    component: () => import("../pages/auth/Login.vue"),
  },
  {
    path: "/auth/register",
    name: "register",
    component: () => import("../pages/auth/Register.vue"),
  },
  {
    path: "/auth/forgotpassword",
    name: "forgotpassword",
    component: () => import("../pages/auth/ForgotPassword.vue"),
  },
  // Account  Logged in Required
  {
    path: "/user/:uuid",
    name: "userprofile",
    component: () => import("../pages/profile/UserProfile.vue"),
  },
  {
    path: "/vendor/:uuid",
    name: "vendorprofile",
    component: () => import("../pages/profile/VendorProfile.vue"),
  },

  {
    path: "/user/orders",
    name: "userorders",
    component: () => import("../pages/orders/UserOrders.vue"),
  },
  {
    path: "/user/orders/:uuid",
    name: "vendorordersview",
    component: () => import("../pages/orders/ViewOrder.vue"),
  },
  {
    path: "/account",
    name: "account",
    component: () => import("../pages/auth/account/AccountHome.vue"),
  },

  {
    path: "/account/defaultaddress",
    name: "defaultaddress",
    component: () => import("../pages/auth/account/DefaultAddress.vue"),
  },
  {
    path: "/auth/changepassword",
    name: "changepassword",
    component: () => import("../pages/auth/ChangePassword.vue"),
  },
  {
    path: "/auth/changepin",
    name: "changepin",
    component: () => import("../pages/auth/ChangePin.vue"),
  },
  {
    path: "/auth/account-seed",
    name: "accountseed",
    component: () => import("../pages/auth/AccountSeed.vue"),
  },
  {
    path: "/auth/account-seed-confirm",
    name: "accountseedconfirm",
    component: () => import("../pages/auth/AccountSeedConfirm.vue"),
  },
  // Category Pages
  {
    path: "/category",
    name: "categoryhome",
    component: () => import("../pages/category/CategoryHome.vue"),
  },
  {
    path: "/category/electronics",
    name: "categoryelectronics",
    component: () =>
      import("../pages/category/electronics/ElectronicsHome.vue"),
  },
  {
    path: "/category/smartphones",
    name: "categorysmartphones",
    component: () =>
      import("../pages/category/smartphones/SmartPhonesHome.vue"),
  },
  {
    path: "/category/automotive",
    name: "categoryautomotive",
    component: () => import("../pages/category/automotive/AutomotiveHome.vue"),
  },
  {
    path: "/category/hobbiesandcollectibles",
    name: "categoryhobbies",
    component: () => import("../pages/category/hobbies/HobbiesHome.vue"),
  },
  {
    path: "/category/jewlrygoldandcoins",
    name: "categoryjewelrygoldcoins",
    component: () =>
      import("../pages/category/jewelrygold/JewelryGoldHome.vue"),
  },
  {
    path: "/category/apparel",
    name: "categoryapparel",
    component: () => import("../pages/category/apparel/ApparelHome.vue"),
  },
  {
    path: "/category/homeandgarden",
    name: "categoryhomeandgarden",
    component: () =>
      import("../pages/category/homeandgarden/HomeandGardenHome.vue"),
  },
  {
    path: "/category/artandcrafts",
    name: "categoryartsandcrafts",
    component: () => import("../pages/category/art/ArtHome.vue"),
  },
  {
    path: "/category/computers",
    name: "categorycomputers",
    component: () => import("../pages/category/computers/ComputersHome.vue"),
  },
  {
    path: "/category/digitalitems",
    name: "categorydigitalitems",
    component: () => import("../pages/category/digital/DigitalHome.vue"),
  },
  {
    path: "/category/booksandmovies",
    name: "categorybooksmovies",
    component: () => import("../pages/category/booksandmovies/BooksHome.vue"),
  },
  {
    path: "/vendor/orders",
    name: "vendororders",
    component: () => import("../pages/vendor/orders/VendorOrders.vue"),
  },
  {
    path: "/vendor/orders/new",
    name: "vendorordersnew",
    component: () => import("../pages/vendor/orders/VendorOrdersNew.vue"),
  },
  {
    path: "/vendor/orders/waiting",
    name: "vendororderswaiting",
    component: () => import("../pages/vendor/orders/VendorOrdersWaiting.vue"),
  },
  {
    path: "/vendor/orders/shipped",
    name: "vendorordersshipped",
    component: () => import("../pages/vendor/orders/VendorOrdersShipped.vue"),
  },
  {
    path: "/vendor/orders/finalized",
    name: "vendorordersfinalized",
    component: () => import("../pages/vendor/orders/VendorOrdersFinalized.vue"),
  },
  {
    path: "/vendor/orders/cancel",
    name: "vendororderscancel",
    component: () => import("../pages/vendor/orders/VendorOrdersCancel.vue"),
  },
  {
    path: "/vendor/orders/dispute",
    name: "vendorordersdispute",
    component: () => import("../pages/vendor/orders/VendorOrdersDispute.vue"),
  },
  // Messages
  {
    path: "/msg",
    name: "MsgHome",
    component: () => import("../pages/messages/MsgHome.vue"),
  },
  {
    path: "/msg/create",
    name: "MsgCreate",
    component: () => import("../pages/messages/MsgCreate.vue"),
  },
  {
    path: "/msg/create/:uuid",
    name: "MsgCreateUser",
    component: () => import("../pages/messages/MsgCreate.vue"),
  },
  {
    path: "/msg/create/:uuid/:itemuuid",
    name: "MsgCreateItem",
    component: () => import("../pages/messages/MsgCreateItem.vue"),
  },
  {
    path: "/msg/view/:postid",
    name: "MsgView",
    component: () => import("../pages/messages/MsgView.vue"),
  },
  {
    path: "/dispute/view/:uuid",
    name: "Dispute",
    component: () => import("../pages/moderator/Dispute.vue"),
  },

  {
    path: "/search/:searchstring",
    name: "search",
    component: () => import("../pages/search/SearchHome.vue"),
  },
  // Error Pages
  {
    path: "/:catchAll(.*)*",
    component: () => import("../pages/error/Error404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
