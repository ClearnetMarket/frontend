import { createRouter, createWebHistory } from "vue-router";
import home from "../pages/Index.vue";
import sell from "../pages/vendor/Sell.vue";
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
import userorders from "../pages/orders/UserOrders.vue";
import ordersview from "../pages/orders/ViewOrder.vue";
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
import vendorordersdelivered from "../pages/vendor/orders/VendorOrdersDelivered.vue";
import vendorordersfinalized from "../pages/vendor/orders/VendorOrdersFinalized.vue";
import vendororderscancel from "../pages/vendor/orders/VendorOrdersCancel.vue";
import vendorordersdispute from "../pages/vendor/orders/VendorOrdersDispute.vue";
import vendorordersfeedback from "../pages/vendor/orders/VendorOrdersFeedback.vue";
import MsgHome from "../pages/messages/MsgHome.vue";
import MsgCreate from "../pages/messages/MsgCreate.vue";
import MsgCreateOrder from "../pages/messages/MsgCreateOrder.vue";
import MsgCreateUser from "../pages/messages/MsgCreate.vue";
import MsgCreateItem from "../pages/messages/MsgCreateItem.vue";
import MsgView from "../pages/messages/MsgView.vue";
import search from "../pages/search/SearchHome.vue";
import Error404 from "../pages/error/Error404.vue";
import categoryhome from "../pages/category/CategoryHome.vue";
import categoryelectronics from "../pages/category/electronics/ElectronicsHome.vue";
import categorycomputers from "../pages/category/computers/ComputersHome.vue";
import categoryapparel from "../pages/category/apparel/ApparelHome.vue";
import categoryart from "../pages/category/art/ArtHome.vue";
import categoryautomotive from "../pages/category/automotive/AutomotiveHome.vue";
import categorybooksandmovies from "../pages/category/booksandmovies/BooksHome.vue";
import categorydigital from "../pages/category/digital/DigitalHome.vue";
import categorygiftcards from "../pages/category/giftcards/GiftCardHome.vue";
import categoryhobbies from "../pages/category/hobbies/HobbiesHome.vue";
import categoryjewelryandgold from "../pages/category/jewelrygold/JewelryGoldHome.vue";
import categoryhomeandgarden from "../pages/category/homeandgarden/HomeandGardenHome.vue";
import categorysmartphones from "../pages/category/smartphones/SmartPhonesHome.vue";
import categorysportinggoods from "../pages/category/sports/SportsHome.vue";
import legal from "../pages/commonpage/legal.vue";
import vendoragreement from "../pages/legal/VendorAgreement.vue";
import policies from "../pages/commonpage/policies.vue";
import editprofile from "../pages/profile/editprofile/EditProfile.vue";

import supportemail from "../pages/support/contact.vue";
import supporthome from "../pages/support/supporthome.vue";
import supportticket from "../pages/support/createticket.vue";
import supportviewticket from "../pages/support/viewticket.vue";

import Dispute from "../pages/moderator/Dispute.vue";
import ModDisputeHome from "../pages/moderator/ModDisputeHome.vue";
import ModDispute from "../pages/moderator/ModDispute.vue";
import ModHome from "../pages/moderator/ModHome.vue";
import ModTicketsHome from "../pages/moderator/ModTicketHome.vue";
import ModTicket from "../pages/moderator/ModTicket.vue";


const routes = [
    {
        path: "/mod/tickets/:uuid",
        name: "ModTicket",
        component: ModTicket,
    },
    {
        path: "/mod/tickets",
        name: "ModTicketsHome",
        component: ModTicketsHome,
    },
    {
        path: "/mod/dispute/:uuid",
        name: "ModDispute",
        component: ModDispute,
    },
    {
        path: "/mod/disputes",
        name: "ModDisputeHome",
        component: ModDisputeHome,
    },
    {
        path: "/mod/home",
        name: "ModHome",
        component: ModHome,
    },


    {
        path: "/support",
        name: "supporthome",
        component: supporthome,
    },
        {
        path: "/support/ticket",
        name: "supportticket",
        component: supportticket,
    },
    {
        path: "/support/ticket/:uuid",
        name: "supportviewticket",
        component: supportviewticket,
    },
    {
        path: "/support/email",
        name: "supportemail",
        component: supportemail,
    },


    {
        path: "/editprofile",
        name: "editprofile",
        component: editprofile,
    },
    {
        path: "/vendoragreement",
        name: "vendoragreement",
        component: vendoragreement,
    },

    {
        path: "/policies",
        name: "policies",
        component: policies,
    },
            {
        path: "/legal",
        name: "legal",
        component: legal,
    },
    {
        path: "/user/orders/:uuid",
        name: "ordersview",
        component: ordersview,
    },
    {
        path: "/user/orders",
        name: "userorders",
        component: userorders,
    },
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
        path: "/cart",
        name: "cart",
        component: cart,
    },
    {
        path: "/vendor/itemsforsale",
        name: "forsale",
        component: forsale,
    },
    {
        path: "/vendor/exactaddress",
        name: "vendoraddress",
        component: vendoraddress,
    },
    {
        path: "/vendor/feedback/:uuid",
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
        component: btcwalletsend,
    },
    {
        path: "/wallet/btc/recieve",
        name: "btcwalletrecieve",
        component: btcwalletrecieve,
    },
    {
        path: "/wallet/bch",
        name: "bchwallet",
        component: bchwallet,
    },
    {
        path: "/wallet/bch/send",
        name: "bchwalletsend",
        component: bchwalletsend,
    },
    {
        path: "/wallet/bch/recieve",
        name: "bchwalletrecieve",
        component: bchwalletrecieve,
    },
    {
        path: "/wallet/xmr",
        name: "xmrwallet",
        component: xmrwallet,
    },
    {
        path: "/wallet/xmr/send",
        name: "xmrwalletsend",
        component: xmrwalletsend,
    },
    {
        path: "/wallet/xmr/recieve",
        name: "xmrwalletrecieve",
        component: xmrwalletrecieve,
    },

    // checkout

    {
        path: "/checkout",
        name: "checkout",
        component: checkout,
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
        component: userprofile,
    },
    {
        path: "/vendor/orders/:uuid",
        name: "vendorordersview",
        component: vendorordersview,
    },
    {
        path: "/vendor/orders/feedback/:uuid",
        name: "vendorordersfeedback",
        component: vendorordersfeedback,
    },
    {
        path: "/account",
        name: "account",
        component: account,
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
        component: accountseedconfirm,
    },
    // Category Pages
    {
        path: "/category",
        name: "categoryhome",
        component: categoryhome,
    },
    {
        path: "/vendor/orders",
        name: "vendororders",
        component: vendororders,
    },
    {
        path: "/vendor/orders/new",
        name: "vendorordersnew",
        component: vendorordersnew,
    },
    {
        path: "/vendor/orders/waiting",
        name: "vendororderswaiting",
        component: vendororderswaiting,
    },
    {
        path: "/vendor/orders/delivered",
        name: "vendorordersdelivered",
        component: vendorordersdelivered,
    },
    {
        path: "/vendor/orders/shipped",
        name: "vendorordersshipped",
        component: vendorordersshipped,
    },
    {
        path: "/vendor/orders/finalized",
        name: "vendorordersfinalized",
        component: vendorordersfinalized,
    },
    {
        path: "/vendor/orders/cancel",
        name: "vendororderscancel",
        component: vendororderscancel,
    },
    {
        path: "/vendor/orders/dispute",
        name: "vendorordersdispute",
        component: vendorordersdispute,
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
        component: MsgCreate,
    },
    {
        path: "/msg/create/:uuid",
        name: "MsgCreateUser",
        component: MsgCreateUser,
    },
    {
        path: "/msg/create/:uuid/:itemuuid",
        name: "MsgCreateItem",
        component: MsgCreateItem,
    },
    {
        path: "/msg/view/:postid",
        name: "MsgView",
        component: MsgView,
    },
    {
        path: "/dispute/view/:uuid",
        name: "Dispute",
        component: Dispute,
    },
    {
        path: "/msg/create/order/",
        name: "MsgCreateOrder",
        component: MsgCreateOrder,
    },

    {
        path: "/search/:searchstring",
        name: "search",
        component: search,
    },
    {
        path: "/category/electronics",
        name: "categoryelectronics",
        component: categoryelectronics,
    },
    {
        path: "/category/computers",
        name: "categorycomputers",
        component: categorycomputers,
    },
    {
        path: "/category/apparel",
        name: "categoryapparel",
        component: categoryapparel,
    },
    {
        path: "/category/art",
        name: "categoryart",
        component: categoryart,
    },
    {
        path: "/category/automotive",
        name: "categoryautomotive",
        component: categoryautomotive,
    },
    {
        path: "/category/booksandmovies",
        name: "categorybooksandmovies",
        component: categorybooksandmovies,
    },
    {
        path: "/category/digital",
        name: "categorydigital",
        component: categorydigital,
    },
    {
        path: "/category/giftcards",
        name: "categorygiftcards",
        component: categorygiftcards,
    },
    {
        path: "/category/hobbies",
        name: "categoryhobbies",
        component: categoryhobbies,
    },
    {
        path: "/category/homeandgarden",
        name: "categoryhomeandgarden",
        component: categoryhomeandgarden,
    },
    {
        path: "/category/jewelrygold",
        name: "categoryjewelrygold",
        component: categoryjewelryandgold,
    },
    {
        path: "/category/smartphones",
        name: "categorysmartphones",
        component: categorysmartphones,
    },
    {
        path: "/category/sportinggoods",
        name: "categorysportinggoods",
        component: categorysportinggoods,
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
//# sourceMappingURL=index.js.map