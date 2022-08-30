import { createRouter, createWebHistory } from "vue-router";

import home from "../pages/Index.vue";
import sell from "../pages/vendor/Sell.vue"
import vendoragreement from "../pages/legal/VendorAgreement.vue";
import forsale from "../pages/vendor/itemsForSale.vue";
import vendoraddress from "../pages/auth/account/VendorExactAddress.vue";
import vendorfeedback from "../pages/vendor/Feedback.vue";
import createquick from "../pages/vendorcreateitem/CreateItem.vue";
import edititem from "../pages/vendorcreateitem/EditItem.vue";
import wallet from "../pages/wallets/WalletHome.vue";
import btcwallet from "../pages/wallets/btc/BtcTransactions.vue";
import btcwalletsend from "../pages/wallets/btc/BtcSend.vue";
import btcwalletrecieve from "../pages/wallets/btc/BtcRecieve.vue";
import bchwallet from "../pages/wallets/bch/BchTransactions.vue";
import bchwalletsend from "../pages/wallets/bch/BchSend.vue";
import bchwalletrecieve from "../pages/wallets/bch/BchRecieve.vue";
import xmrwallet from "../pages/wallets/xmr/XmrTransactions.vue";
import xmrwalletsend from "../pages/wallets/xmr/XmrSend.vue";
import xmrwalletrecieve from "../pages/wallets/xmr/XmrRecieve.vue";
import cart from "../pages/checkout/Cart.vue";
import MarketItem from "../pages/Item/Item.vue";
import checkout from "../pages/checkout/Checkout.vue";
import login from "../pages/auth/Login.vue";
import register from "../pages/auth/Register.vue";
import forgotpassword from "../pages/auth/ForgotPassword.vue";
import userprofile from "../pages/profile/UserProfile.vue";
import vendorprofile from "../pages/profile/VendorProfile.vue";
import userorders from "../pages/orders/UserOrders.vue";
import vendorordersview from "../pages/orders/ViewOrder.vue";
import account from "../pages/auth/account/AccountHome.vue";
import defaultaddress from "../pages/auth/account/DefaultAddress.vue";
import changepassword from "../pages/auth/ChangePassword.vue";
import changepin from "../pages/auth/ChangePin.vue";
import accountseed from "../pages/auth/AccountSeed.vue";
import accountseedconfirm from "../pages/auth/AccountSeedConfirm.vue";
import vendororders from "../pages/vendor/orders/VendorOrders.vue";
import vendorordersnew from "../pages/vendor/orders/VendorOrdersNew.vue";
import vendororderswaiting from "../pages/vendor/orders/VendorOrdersWaiting.vue";
import vendorordersshipped from "../pages/vendor/orders/VendorOrdersShipped.vue";
import vendorordersfinalized from "../pages/vendor/orders/VendorOrdersFinalized.vue";
import vendororderscancel from "../pages/vendor/orders/VendorOrdersCancel.vue";
import vendorordersdispute from "../pages/vendor/orders/VendorOrdersDispute.vue";
import MsgHome from "../pages/messages/MsgHome.vue";
import MsgCreate from "../pages/messages/MsgCreate.vue";
import MsgCreateOrder from "../pages/messages/MsgCreateOrder.vue";
import MsgCreateUser from "../pages/messages/MsgCreate.vue";
import MsgCreateItem from "../pages/messages/MsgCreateItem.vue";
import MsgView from "../pages/messages/MsgView.vue";
import Dispute from "../pages/moderator/Dispute.vue"
import ModDispute from "../pages/moderator/ModDispute.vue";
import search from "../pages/search/SearchHome.vue";

import Error404 from "../pages/error/Error404.vue";

import categoryhome from "../pages/category/CategoryHome.vue";
import categoryelectronics from "../pages/category/electronics/ElectronicsHome.vue";


const routes = [

  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/sell",
    name: "sell",
    component: sell,
  },
  {
    path: "/vendoragreement",
    name: "vendoragreement",
    component: vendoragreement,
  },
  {
    path: "/vendor/itemsforsale",
    name: "forsale",
    component:  forsale,
  },
  {
    path: "/vendor/exactaddress",
    name: "vendoraddress",
    component: vendoraddress,
  },
  {
    path: "/vendor/feedback",
    name: "vendorfeedback",
    component: vendorfeedback,
  },
  {
    path: "/item/:id",
    name: "MarketItem",
    component: MarketItem,
  },
  {
    path: "/vendor/createitem",
    name: "createquick",
    component: createquick,
  },
  {
    path: "/vendor/edititem/:id",
    name: "edititem",
    component: edititem,
  },
  {
    path: "/wallet",
    name: "wallet",
    component: wallet,
  },
  {
    path: "/wallet/btc",
    name: "btcwallet",
    component: btcwallet,
  },
  {
    path: "/wallet/btc/send",
    name: "btcwalletsend",
    component:  btcwalletsend,
  },
  {
    path: "/wallet/btc/recieve",
    name: "btcwalletrecieve",
    component:  btcwalletrecieve,
  },
  {
    path: "/wallet/bch",
    name: "bchwallet",
    component:  bchwallet,
  },
  {
    path: "/wallet/bch/send",
    name: "bchwalletsend",
    component: bchwalletsend,
  },
  {
    path: "/wallet/bch/recieve",
    name: "bchwalletrecieve",
    component:  bchwalletrecieve,
  },
  {
    path: "/wallet/xmr",
    name: "xmrwallet",
    component: xmrwallet,
  },
  {
    path: "/wallet/xmr/send",
    name: "xmrwalletsend",
    component:  xmrwalletsend,
  },
  {
    path: "/wallet/xmr/recieve",
    name: "xmrwalletrecieve",
    component: xmrwalletrecieve,
  },
  // checkout
  {
    path: "/cart",
    name: "cart",
    component:  cart,
  },
  {
    path: "/checkout",
    name: "checkout",
    component:  checkout,
  },
  // Plain Stuff
  {
    path: "/auth/login",
    name: "login",
    component: login,
  },
  {
    path: "/auth/register",
    name: "register",
    component: register,
  },
  {
    path: "/auth/forgotpassword",
    name: "forgotpassword",
    component: forgotpassword,
  },
  // Account  Logged in Required
  {
    path: "/user/:uuid",
    name: "userprofile",
    component:  userprofile,
  },
  {
    path: "/vendor/:uuid",
    name: "vendorprofile",
    component:  vendorprofile,
  },

  {
    path: "/user/orders",
    name: "userorders",
    component:  userorders,
  },
  {
    path: "/user/orders/:uuid",
    name: "vendorordersview",
    component: vendorordersview,
  },
  {
    path: "/account",
    name: "account",
    component:  account,
  },

  {
    path: "/account/defaultaddress",
    name: "defaultaddress",
    component: defaultaddress,
  },
  {
    path: "/auth/changepassword",
    name: "changepassword",
    component: changepassword,
  },
  {
    path: "/auth/changepin",
    name: "changepin",
    component: changepin,
  },
  {
    path: "/auth/account-seed",
    name: "accountseed",
    component: accountseed,
  },
  {
    path: "/auth/account-seed-confirm",
    name: "accountseedconfirm",
    component:  accountseedconfirm,
  },
  // Category Pages
  {
    path: "/category",
    name: "categoryhome",
    component:  categoryhome,
  },
  {
    path: "/category/electronics",
    name: "categoryelectronics",
    component:  categoryelectronics,
  },

  {
    path: "/vendor/orders",
    name: "vendororders",
    component:  vendororders,
  },
  {
    path: "/vendor/orders/new",
    name: "vendorordersnew",
    component: vendorordersnew,
  },
  {
    path: "/vendor/orders/waiting",
    name: "vendororderswaiting",
    component:  vendororderswaiting,
  },
  {
    path: "/vendor/orders/shipped",
    name: "vendorordersshipped",
    component:  vendorordersshipped,
  },
  {
    path: "/vendor/orders/finalized",
    name: "vendorordersfinalized",
    component:  vendorordersfinalized,
  },
  {
    path: "/vendor/orders/cancel",
    name: "vendororderscancel",
    component:  vendororderscancel,
  },
  {
    path: "/vendor/orders/dispute",
    name: "vendorordersdispute",
    component:  vendorordersdispute,
  },
  // Messages
  {
    path: "/msg",
    name: "MsgHome",
    component: MsgHome,
  },
  {
    path: "/msg/create",
    name: "MsgCreate",
    component:  MsgCreate,
  },
  {
    path: "/msg/create/:uuid",
    name: "MsgCreateUser",
    component:  MsgCreateUser,
  },
  {
    path: "/msg/create/:uuid/:itemuuid",
    name: "MsgCreateItem",
    component: MsgCreateItem,
  },
  {
    path: "/msg/view/:postid",
    name: "MsgView",
    component:  MsgView,
  },
  {
    path: "/dispute/view/:uuid",
    name: "Dispute",
    component:  Dispute,
  },


  {
    path: "/msg/create/order/",
    name: "MsgCreateOrder",
    component:  MsgCreateOrder,
  },
  {
    path: "/mod/dispute/:uuid",
    name: "ModDispute",
    component:  ModDispute,
  },
  {
    path: "/search/:searchstring",
    name: "search",
    component:  search,
  },
  // Error Pages
  {
    path: "/:catchAll(.*)*",
    component: Error404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
