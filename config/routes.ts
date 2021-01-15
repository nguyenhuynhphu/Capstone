export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      // {
      //   path: '/user',
      //   component: '../layouts/UserLayout',
      //   routes: [
      //     {
      //       name: 'login',
      //       path: '/user/login',
      //       component: './user/login',
      //     },
      //   ],
      // },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              
              {
                path: '/user',
                name: 'User',
                icon: 'user',
                routes: [
                  {
                    path: '/user/libarian',
                    name: 'Manage Libarian',
                    component: './Libarian/LibarianPage',
                    authority: ['admin'],
                  },
                  {
                    path: '/user/customer',
                    name: 'Manage Customer',
                    component: './Customer/CustomerPage',
                    authority: ['admin'],
                  },
                ],
              },
              {
                path: '/book',
                name: 'Book',
                icon: 'book',
                authority: ['admin'],
                routes: [
                  {
                    path: '/book/manage-book',
                    name: 'Manage Book',
                    component: './ManageBook/ManageBookPage',
                    authority: ['admin'],
                  },
                  {
                    path: '/book/borrow-book',
                    name: 'Manage Borrow',
                    component: './ManageBorrow/ManageBorrowPage',
                    authority: ['admin'],
                  },
                ],
              },
              {
                path: '/organizebooks',
                name: 'Organize Books',
                icon: 'table',
                component: './BookOrganize/BookOrganizePage',
                authority: ['admin'],
              },
              {
                path: '/libaryevent',
                name: 'Manage Events',
                icon: 'table',
                component: './ManageEvent/ManageEventPage',
                authority: ['admin'],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
