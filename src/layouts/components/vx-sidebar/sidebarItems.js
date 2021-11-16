/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default [   
  // { --> EXAMPLE
  //   url: "/productManage",
  //   name: "productManage",
  //   slug: "productManage",
  //   icon: "flyerManageIcon",
  //   i18n: "productManage",
  // }, 
  {
    url: "/schedule/scheduleList",
    name: "schedule",
    slug: "schedule",
    icon: "scheduleIcon",
    i18n: "schedule"
  },
  {
    url: "/receive/receiveList",
    name: "receive",
    slug: "receive",
    icon: "receiveIcon",
    i18n: "receive"
  },
  // {
  //   url: "/reserv/reservSearch",
  //   name: "reservSearch",
  //   slug: "reservSearch",
  //   icon: "reservSearchIcon",
  //   i18n: "reservSearch"
  // },
  {
    url: "/customer/customerList",
    name: "customer",
    slug: "customer",
    icon: "customer",
    i18n: "customer"
  },
  {
    url: "/storage/storageList",
    name: "storage",
    slug: "storage",
    icon: "storageIcon",
    i18n: "storage"
  },
  {
    url: "/advice/adviceList",
    name: "advice",
    slug: "advice",
    icon: "adviceIcon",
    i18n: "advice"
  },
  {
    url: "/photo/photoList",
    name: "photo",
    slug: "photo",
    icon: "photoIcon",
    i18n: "photo"
  },
  {
    url: "/penchart/penchartList",
    name: "penchart",
    slug: "penchart",
    icon: "penchartIcon",
    i18n: "penchart"
  },
  {
    url: "/textchart/textchartList",
    name: "textchart",
    slug: "textchart",
    icon: "textchartIcon",
    i18n: "textchart"
  },
  {
    url: "/managechart/managechartList",
    name: "managechart",
    slug: "managechart",
    icon: "managechartIcon",
    i18n: "managechart"
  },
  {
    url: "/mms/mmsSearchList",
    name: "mmsSearch",
    slug: "mmsSearch",
    icon: "mmsSearchIcon",
    i18n: "mmsSearch"
  },
  {
    url: "/mms/mmsSetupList",
    name: "mmsSetup",
    slug: "mmsSetup",
    icon: "mmsSetupIcon",
    i18n: "mmsSetup"
  },
  {
    url: "/prescription/prescriptionList",
    name: "prescription",
    slug: "prescription",
    icon: "prescriptionIcon",
    i18n: "prescription"
  },
  {
    url: "/call/callList",
    name: "call",
    slug: "call",
    icon: "callIcon",
    i18n: "call"
  },
  {
    url: "/settings",
    name: "settings",
    slug: "settings",
    icon: "settingsIcon",
    i18n: "settings",
  },
]
