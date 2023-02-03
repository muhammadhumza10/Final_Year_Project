const Menuitems = [
  {
    title: "Dashbaord",
    icon: "home",
    href: "/seller/dashboard",
  },
  {
    title: "My Products",
    icon: "disc",
    href: "/seller/myproducts",
    child: [
      { title: "Active Products", href: "/seller/myproducts/activeproducts" },
      { title: "Delisted Products", href: "/seller/myproducts/delistedproducts" },
    ],
  },
  {
    title: "Add Product",
    icon: "plus-circle",
    href: "/seller/addproduct",
  },
  {
    title: "See Orders",
    icon: "box",
    href: "/seller/orders",
  },
  {
    title: "Inbox",
    icon: "user",
    href: "/seller/inbox",
  },
  {
    title: "Profile",
    icon: "user",
    href: "/seller/profile",
  },
];

export default Menuitems;
