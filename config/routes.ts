export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
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
                path: '/',
                name: 'Dashboard',
                icon: 'dashboard',
                component: './Welcome/Welcome',
                authority: ['admin', 'user'],
              },
              {
                path: '/manage-user',
                name: 'User',
                icon: 'user',
                authority: ['admin'],
                routes: [
                  {
                    path: '/manage-user/libarian',
                    name: 'Manage Libarian',
                    component: './Libarian/LibarianPage',
                  },
                  {
                    path: '/manage-user/patron',
                    name: 'Manage Patron',
                    component: './Patron/PatronPage',
                  },
                ],
              },
              {
                path: '/book',
                name: 'Book Group',
                icon: 'book',
                authority: ['user', 'admin'],
                routes: [
                  {
                    path: '/book/manage-book',
                    name: 'Manage Book Group',
                    bookGroupId: 0,
                    component: './ManageBook/ManageBookPage',
                    authority: ['user', 'admin'],
                  },
                  {
                    path: '/book/borrow-book',
                    name: 'Manage Borrow',
                    component: './ManageBorrow/ManageBorrowPage',
                    authority: ['user'],
                  },
                ],
              },
              {
                path: '/organizebooks',
                name: 'Organize Books',
                icon: 'table',
                component: './BookOrganize/BookOrganizePage',
                authority: ['admin', 'user'],
              },
              {
                path: '/upload',
                name: 'Detection',
                icon: 'upload',
                component: './UploadVideo/UploadVideo',
                authority: ['admin', 'user'],
              },
              { path: '/no-permission', component: './401.tsx' },
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
