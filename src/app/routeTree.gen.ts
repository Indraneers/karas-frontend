/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as DashboardlayoutImport } from './routes/_dashboard_layout'
import { Route as DashboardlayoutIndexImport } from './routes/_dashboard_layout/index'
import { Route as DashboardlayoutSalesRouteImport } from './routes/_dashboard_layout/sales/route'
import { Route as DashboardlayoutUnitsIndexImport } from './routes/_dashboard_layout/units/index'
import { Route as DashboardlayoutProductsIndexImport } from './routes/_dashboard_layout/products/index'
import { Route as DashboardlayoutMaintenanceIndexImport } from './routes/_dashboard_layout/maintenance/index'
import { Route as DashboardlayoutCategoriesIndexImport } from './routes/_dashboard_layout/categories/index'
import { Route as DashboardlayoutProductsCreateImport } from './routes/_dashboard_layout/products/create'
import { Route as DashboardlayoutCategoriesCreateImport } from './routes/_dashboard_layout/categories/create'
import { Route as DashboardlayoutCategoriesEditCategoryIdImport } from './routes/_dashboard_layout/categories/edit/$categoryId'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const DashboardlayoutRoute = DashboardlayoutImport.update({
  id: '/_dashboard_layout',
  getParentRoute: () => rootRoute,
} as any)

const DashboardlayoutIndexRoute = DashboardlayoutIndexImport.update({
  path: '/',
  getParentRoute: () => DashboardlayoutRoute,
} as any)

const DashboardlayoutSalesRouteRoute = DashboardlayoutSalesRouteImport.update({
  path: '/sales',
  getParentRoute: () => DashboardlayoutRoute,
} as any)

const DashboardlayoutUnitsIndexRoute = DashboardlayoutUnitsIndexImport.update({
  path: '/units/',
  getParentRoute: () => DashboardlayoutRoute,
} as any)

const DashboardlayoutProductsIndexRoute =
  DashboardlayoutProductsIndexImport.update({
    path: '/products/',
    getParentRoute: () => DashboardlayoutRoute,
  } as any)

const DashboardlayoutMaintenanceIndexRoute =
  DashboardlayoutMaintenanceIndexImport.update({
    path: '/maintenance/',
    getParentRoute: () => DashboardlayoutRoute,
  } as any)

const DashboardlayoutCategoriesIndexRoute =
  DashboardlayoutCategoriesIndexImport.update({
    path: '/categories/',
    getParentRoute: () => DashboardlayoutRoute,
  } as any)

const DashboardlayoutProductsCreateRoute =
  DashboardlayoutProductsCreateImport.update({
    path: '/products/create',
    getParentRoute: () => DashboardlayoutRoute,
  } as any)

const DashboardlayoutCategoriesCreateRoute =
  DashboardlayoutCategoriesCreateImport.update({
    path: '/categories/create',
    getParentRoute: () => DashboardlayoutRoute,
  } as any)

const DashboardlayoutCategoriesEditCategoryIdRoute =
  DashboardlayoutCategoriesEditCategoryIdImport.update({
    path: '/categories/edit/$categoryId',
    getParentRoute: () => DashboardlayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_dashboard_layout': {
      id: '/_dashboard_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof DashboardlayoutImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard_layout/sales': {
      id: '/_dashboard_layout/sales'
      path: '/sales'
      fullPath: '/sales'
      preLoaderRoute: typeof DashboardlayoutSalesRouteImport
      parentRoute: typeof DashboardlayoutImport
    }
    '/_dashboard_layout/': {
      id: '/_dashboard_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof DashboardlayoutIndexImport
      parentRoute: typeof DashboardlayoutImport
    }
    '/_dashboard_layout/categories/create': {
      id: '/_dashboard_layout/categories/create'
      path: '/categories/create'
      fullPath: '/categories/create'
      preLoaderRoute: typeof DashboardlayoutCategoriesCreateImport
      parentRoute: typeof DashboardlayoutImport
    }
    '/_dashboard_layout/products/create': {
      id: '/_dashboard_layout/products/create'
      path: '/products/create'
      fullPath: '/products/create'
      preLoaderRoute: typeof DashboardlayoutProductsCreateImport
      parentRoute: typeof DashboardlayoutImport
    }
    '/_dashboard_layout/categories/': {
      id: '/_dashboard_layout/categories/'
      path: '/categories'
      fullPath: '/categories'
      preLoaderRoute: typeof DashboardlayoutCategoriesIndexImport
      parentRoute: typeof DashboardlayoutImport
    }
    '/_dashboard_layout/maintenance/': {
      id: '/_dashboard_layout/maintenance/'
      path: '/maintenance'
      fullPath: '/maintenance'
      preLoaderRoute: typeof DashboardlayoutMaintenanceIndexImport
      parentRoute: typeof DashboardlayoutImport
    }
    '/_dashboard_layout/products/': {
      id: '/_dashboard_layout/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof DashboardlayoutProductsIndexImport
      parentRoute: typeof DashboardlayoutImport
    }
    '/_dashboard_layout/units/': {
      id: '/_dashboard_layout/units/'
      path: '/units'
      fullPath: '/units'
      preLoaderRoute: typeof DashboardlayoutUnitsIndexImport
      parentRoute: typeof DashboardlayoutImport
    }
    '/_dashboard_layout/categories/edit/$categoryId': {
      id: '/_dashboard_layout/categories/edit/$categoryId'
      path: '/categories/edit/$categoryId'
      fullPath: '/categories/edit/$categoryId'
      preLoaderRoute: typeof DashboardlayoutCategoriesEditCategoryIdImport
      parentRoute: typeof DashboardlayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  DashboardlayoutRoute: DashboardlayoutRoute.addChildren({
    DashboardlayoutSalesRouteRoute,
    DashboardlayoutIndexRoute,
    DashboardlayoutCategoriesCreateRoute,
    DashboardlayoutProductsCreateRoute,
    DashboardlayoutCategoriesIndexRoute,
    DashboardlayoutMaintenanceIndexRoute,
    DashboardlayoutProductsIndexRoute,
    DashboardlayoutUnitsIndexRoute,
    DashboardlayoutCategoriesEditCategoryIdRoute,
  }),
  LoginRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_dashboard_layout",
        "/login"
      ]
    },
    "/_dashboard_layout": {
      "filePath": "_dashboard_layout.tsx",
      "children": [
        "/_dashboard_layout/sales",
        "/_dashboard_layout/",
        "/_dashboard_layout/categories/create",
        "/_dashboard_layout/products/create",
        "/_dashboard_layout/categories/",
        "/_dashboard_layout/maintenance/",
        "/_dashboard_layout/products/",
        "/_dashboard_layout/units/",
        "/_dashboard_layout/categories/edit/$categoryId"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_dashboard_layout/sales": {
      "filePath": "_dashboard_layout/sales/route.tsx",
      "parent": "/_dashboard_layout"
    },
    "/_dashboard_layout/": {
      "filePath": "_dashboard_layout/index.tsx",
      "parent": "/_dashboard_layout"
    },
    "/_dashboard_layout/categories/create": {
      "filePath": "_dashboard_layout/categories/create.tsx",
      "parent": "/_dashboard_layout"
    },
    "/_dashboard_layout/products/create": {
      "filePath": "_dashboard_layout/products/create.tsx",
      "parent": "/_dashboard_layout"
    },
    "/_dashboard_layout/categories/": {
      "filePath": "_dashboard_layout/categories/index.tsx",
      "parent": "/_dashboard_layout"
    },
    "/_dashboard_layout/maintenance/": {
      "filePath": "_dashboard_layout/maintenance/index.tsx",
      "parent": "/_dashboard_layout"
    },
    "/_dashboard_layout/products/": {
      "filePath": "_dashboard_layout/products/index.tsx",
      "parent": "/_dashboard_layout"
    },
    "/_dashboard_layout/units/": {
      "filePath": "_dashboard_layout/units/index.tsx",
      "parent": "/_dashboard_layout"
    },
    "/_dashboard_layout/categories/edit/$categoryId": {
      "filePath": "_dashboard_layout/categories/edit/$categoryId.tsx",
      "parent": "/_dashboard_layout"
    }
  }
}
ROUTE_MANIFEST_END */
