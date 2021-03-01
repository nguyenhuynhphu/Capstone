﻿export default [
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
                path: '/manage-user',
                name: 'User',
                icon: 'user',
                routes: [
                  {
                    path: '/manage-user/libarian',
                    name: 'Manage Libarian',
                    component: './Libarian/LibarianPage',
                    authority: ['admin','user'],
                  },
                  {
                    path: '/manage-user/customer',
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
                authority: ['user', 'admin'],
                routes: [
                  {
                    path: '/book/manage-book',
                    name: 'Manage Book',
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
