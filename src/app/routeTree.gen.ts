/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as ProtectedlayoutInvoiceImport } from './routes/_protected_layout/invoice'
import { Route as ProtectedlayoutDashboardlayoutImport } from './routes/_protected_layout/_dashboard_layout'
import { Route as ProtectedlayoutDashboardlayoutIndexImport } from './routes/_protected_layout/_dashboard_layout/index'
import { Route as ProtectedlayoutDashboardlayoutPosImport } from './routes/_protected_layout/_dashboard_layout/pos'
import { Route as ProtectedlayoutDashboardlayoutVehiclesIndexImport } from './routes/_protected_layout/_dashboard_layout/vehicles/index'
import { Route as ProtectedlayoutDashboardlayoutServicesIndexImport } from './routes/_protected_layout/_dashboard_layout/services/index'
import { Route as ProtectedlayoutDashboardlayoutSalesIndexImport } from './routes/_protected_layout/_dashboard_layout/sales/index'
import { Route as ProtectedlayoutDashboardlayoutMaintenanceIndexImport } from './routes/_protected_layout/_dashboard_layout/maintenance/index'
import { Route as ProtectedlayoutDashboardlayoutInventoryIndexImport } from './routes/_protected_layout/_dashboard_layout/inventory/index'
import { Route as ProtectedlayoutDashboardlayoutCustomersIndexImport } from './routes/_protected_layout/_dashboard_layout/customers/index'
import { Route as ProtectedlayoutDashboardlayoutVehiclesCreateImport } from './routes/_protected_layout/_dashboard_layout/vehicles/create'
import { Route as ProtectedlayoutDashboardlayoutServicesCreateImport } from './routes/_protected_layout/_dashboard_layout/services/create'
import { Route as ProtectedlayoutDashboardlayoutSalesSaleIdImport } from './routes/_protected_layout/_dashboard_layout/sales/$saleId'
import { Route as ProtectedlayoutDashboardlayoutInventoryInventorylayoutImport } from './routes/_protected_layout/_dashboard_layout/inventory/_inventory_layout'
import { Route as ProtectedlayoutDashboardlayoutCustomersCreateImport } from './routes/_protected_layout/_dashboard_layout/customers/create'
import { Route as ProtectedlayoutDashboardlayoutVehiclesEditVehicleIdImport } from './routes/_protected_layout/_dashboard_layout/vehicles/edit/$vehicleId'
import { Route as ProtectedlayoutDashboardlayoutServicesEditServiceIdImport } from './routes/_protected_layout/_dashboard_layout/services/edit/$serviceId'
import { Route as ProtectedlayoutDashboardlayoutSalesEditSaleIdImport } from './routes/_protected_layout/_dashboard_layout/sales/edit/$saleId'
import { Route as ProtectedlayoutDashboardlayoutInventoryUnitsCreateImport } from './routes/_protected_layout/_dashboard_layout/inventory/units/create'
import { Route as ProtectedlayoutDashboardlayoutInventoryProductsCreateImport } from './routes/_protected_layout/_dashboard_layout/inventory/products/create'
import { Route as ProtectedlayoutDashboardlayoutInventoryCategoriesCreateImport } from './routes/_protected_layout/_dashboard_layout/inventory/categories/create'
import { Route as ProtectedlayoutDashboardlayoutCustomersEditCustomerIdImport } from './routes/_protected_layout/_dashboard_layout/customers/edit/$customerId'
import { Route as ProtectedlayoutDashboardlayoutInventoryInventorylayoutUnitsIndexImport } from './routes/_protected_layout/_dashboard_layout/inventory/_inventory_layout/units/index'
import { Route as ProtectedlayoutDashboardlayoutInventoryInventorylayoutProductsIndexImport } from './routes/_protected_layout/_dashboard_layout/inventory/_inventory_layout/products/index'
import { Route as ProtectedlayoutDashboardlayoutInventoryInventorylayoutCategoriesIndexImport } from './routes/_protected_layout/_dashboard_layout/inventory/_inventory_layout/categories/index'
import { Route as ProtectedlayoutDashboardlayoutInventoryUnitsEditUnitIdImport } from './routes/_protected_layout/_dashboard_layout/inventory/units/edit/$unitId'
import { Route as ProtectedlayoutDashboardlayoutInventoryProductsEditProductIdImport } from './routes/_protected_layout/_dashboard_layout/inventory/products/edit/$productId'
import { Route as ProtectedlayoutDashboardlayoutInventoryCategoriesEditCategoryIdImport } from './routes/_protected_layout/_dashboard_layout/inventory/categories/edit/$categoryId'

// Create Virtual Routes

const ProtectedlayoutDashboardlayoutInventoryImport = createFileRoute(
  '/_protected_layout/_dashboard_layout/inventory',
)()

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedlayoutInvoiceRoute = ProtectedlayoutInvoiceImport.update({
  path: '/invoice',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedlayoutDashboardlayoutRoute =
  ProtectedlayoutDashboardlayoutImport.update({
    id: '/_protected_layout/_dashboard_layout',
    getParentRoute: () => rootRoute,
  } as any)

const ProtectedlayoutDashboardlayoutInventoryRoute =
  ProtectedlayoutDashboardlayoutInventoryImport.update({
    path: '/inventory',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutIndexRoute =
  ProtectedlayoutDashboardlayoutIndexImport.update({
    path: '/',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutPosRoute =
  ProtectedlayoutDashboardlayoutPosImport.update({
    path: '/pos',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutVehiclesIndexRoute =
  ProtectedlayoutDashboardlayoutVehiclesIndexImport.update({
    path: '/vehicles/',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutServicesIndexRoute =
  ProtectedlayoutDashboardlayoutServicesIndexImport.update({
    path: '/services/',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutSalesIndexRoute =
  ProtectedlayoutDashboardlayoutSalesIndexImport.update({
    path: '/sales/',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutMaintenanceIndexRoute =
  ProtectedlayoutDashboardlayoutMaintenanceIndexImport.update({
    path: '/maintenance/',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutInventoryIndexRoute =
  ProtectedlayoutDashboardlayoutInventoryIndexImport.update({
    path: '/',
    getParentRoute: () => ProtectedlayoutDashboardlayoutInventoryRoute,
  } as any)

const ProtectedlayoutDashboardlayoutCustomersIndexRoute =
  ProtectedlayoutDashboardlayoutCustomersIndexImport.update({
    path: '/customers/',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutVehiclesCreateRoute =
  ProtectedlayoutDashboardlayoutVehiclesCreateImport.update({
    path: '/vehicles/create',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutServicesCreateRoute =
  ProtectedlayoutDashboardlayoutServicesCreateImport.update({
    path: '/services/create',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutSalesSaleIdRoute =
  ProtectedlayoutDashboardlayoutSalesSaleIdImport.update({
    path: '/sales/$saleId',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutInventoryInventorylayoutRoute =
  ProtectedlayoutDashboardlayoutInventoryInventorylayoutImport.update({
    id: '/_inventory_layout',
    getParentRoute: () => ProtectedlayoutDashboardlayoutInventoryRoute,
  } as any)

const ProtectedlayoutDashboardlayoutCustomersCreateRoute =
  ProtectedlayoutDashboardlayoutCustomersCreateImport.update({
    path: '/customers/create',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutVehiclesEditVehicleIdRoute =
  ProtectedlayoutDashboardlayoutVehiclesEditVehicleIdImport.update({
    path: '/vehicles/edit/$vehicleId',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutServicesEditServiceIdRoute =
  ProtectedlayoutDashboardlayoutServicesEditServiceIdImport.update({
    path: '/services/edit/$serviceId',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutSalesEditSaleIdRoute =
  ProtectedlayoutDashboardlayoutSalesEditSaleIdImport.update({
    path: '/sales/edit/$saleId',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutInventoryUnitsCreateRoute =
  ProtectedlayoutDashboardlayoutInventoryUnitsCreateImport.update({
    path: '/units/create',
    getParentRoute: () => ProtectedlayoutDashboardlayoutInventoryRoute,
  } as any)

const ProtectedlayoutDashboardlayoutInventoryProductsCreateRoute =
  ProtectedlayoutDashboardlayoutInventoryProductsCreateImport.update({
    path: '/products/create',
    getParentRoute: () => ProtectedlayoutDashboardlayoutInventoryRoute,
  } as any)

const ProtectedlayoutDashboardlayoutInventoryCategoriesCreateRoute =
  ProtectedlayoutDashboardlayoutInventoryCategoriesCreateImport.update({
    path: '/categories/create',
    getParentRoute: () => ProtectedlayoutDashboardlayoutInventoryRoute,
  } as any)

const ProtectedlayoutDashboardlayoutCustomersEditCustomerIdRoute =
  ProtectedlayoutDashboardlayoutCustomersEditCustomerIdImport.update({
    path: '/customers/edit/$customerId',
    getParentRoute: () => ProtectedlayoutDashboardlayoutRoute,
  } as any)

const ProtectedlayoutDashboardlayoutInventoryInventorylayoutUnitsIndexRoute =
  ProtectedlayoutDashboardlayoutInventoryInventorylayoutUnitsIndexImport.update(
    {
      path: '/units/',
      getParentRoute: () =>
        ProtectedlayoutDashboardlayoutInventoryInventorylayoutRoute,
    } as any,
  )

const ProtectedlayoutDashboardlayoutInventoryInventorylayoutProductsIndexRoute =
  ProtectedlayoutDashboardlayoutInventoryInventorylayoutProductsIndexImport.update(
    {
      path: '/products/',
      getParentRoute: () =>
        ProtectedlayoutDashboardlayoutInventoryInventorylayoutRoute,
    } as any,
  )

const ProtectedlayoutDashboardlayoutInventoryInventorylayoutCategoriesIndexRoute =
  ProtectedlayoutDashboardlayoutInventoryInventorylayoutCategoriesIndexImport.update(
    {
      path: '/categories/',
      getParentRoute: () =>
        ProtectedlayoutDashboardlayoutInventoryInventorylayoutRoute,
    } as any,
  )

const ProtectedlayoutDashboardlayoutInventoryUnitsEditUnitIdRoute =
  ProtectedlayoutDashboardlayoutInventoryUnitsEditUnitIdImport.update({
    path: '/units/edit/$unitId',
    getParentRoute: () => ProtectedlayoutDashboardlayoutInventoryRoute,
  } as any)

const ProtectedlayoutDashboardlayoutInventoryProductsEditProductIdRoute =
  ProtectedlayoutDashboardlayoutInventoryProductsEditProductIdImport.update({
    path: '/products/edit/$productId',
    getParentRoute: () => ProtectedlayoutDashboardlayoutInventoryRoute,
  } as any)

const ProtectedlayoutDashboardlayoutInventoryCategoriesEditCategoryIdRoute =
  ProtectedlayoutDashboardlayoutInventoryCategoriesEditCategoryIdImport.update({
    path: '/categories/edit/$categoryId',
    getParentRoute: () => ProtectedlayoutDashboardlayoutInventoryRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_protected_layout/_dashboard_layout': {
      id: '/_protected_layout/_dashboard_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutImport
      parentRoute: typeof rootRoute
    }
    '/_protected_layout/invoice': {
      id: '/_protected_layout/invoice'
      path: '/invoice'
      fullPath: '/invoice'
      preLoaderRoute: typeof ProtectedlayoutInvoiceImport
      parentRoute: typeof rootRoute
    }
    '/_protected_layout/_dashboard_layout/pos': {
      id: '/_protected_layout/_dashboard_layout/pos'
      path: '/pos'
      fullPath: '/pos'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutPosImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/': {
      id: '/_protected_layout/_dashboard_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutIndexImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/customers/create': {
      id: '/_protected_layout/_dashboard_layout/customers/create'
      path: '/customers/create'
      fullPath: '/customers/create'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutCustomersCreateImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/inventory': {
      id: '/_protected_layout/_dashboard_layout/inventory'
      path: '/inventory'
      fullPath: '/inventory'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutInventoryImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/inventory/_inventory_layout': {
      id: '/_protected_layout/_dashboard_layout/inventory/_inventory_layout'
      path: '/inventory'
      fullPath: '/inventory'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutInventoryInventorylayoutImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutInventoryRoute
    }
    '/_protected_layout/_dashboard_layout/sales/$saleId': {
      id: '/_protected_layout/_dashboard_layout/sales/$saleId'
      path: '/sales/$saleId'
      fullPath: '/sales/$saleId'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutSalesSaleIdImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/services/create': {
      id: '/_protected_layout/_dashboard_layout/services/create'
      path: '/services/create'
      fullPath: '/services/create'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutServicesCreateImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/vehicles/create': {
      id: '/_protected_layout/_dashboard_layout/vehicles/create'
      path: '/vehicles/create'
      fullPath: '/vehicles/create'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutVehiclesCreateImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/customers/': {
      id: '/_protected_layout/_dashboard_layout/customers/'
      path: '/customers'
      fullPath: '/customers'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutCustomersIndexImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/inventory/': {
      id: '/_protected_layout/_dashboard_layout/inventory/'
      path: '/'
      fullPath: '/inventory/'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutInventoryIndexImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutInventoryImport
    }
    '/_protected_layout/_dashboard_layout/maintenance/': {
      id: '/_protected_layout/_dashboard_layout/maintenance/'
      path: '/maintenance'
      fullPath: '/maintenance'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutMaintenanceIndexImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/sales/': {
      id: '/_protected_layout/_dashboard_layout/sales/'
      path: '/sales'
      fullPath: '/sales'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutSalesIndexImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/services/': {
      id: '/_protected_layout/_dashboard_layout/services/'
      path: '/services'
      fullPath: '/services'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutServicesIndexImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/vehicles/': {
      id: '/_protected_layout/_dashboard_layout/vehicles/'
      path: '/vehicles'
      fullPath: '/vehicles'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutVehiclesIndexImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/customers/edit/$customerId': {
      id: '/_protected_layout/_dashboard_layout/customers/edit/$customerId'
      path: '/customers/edit/$customerId'
      fullPath: '/customers/edit/$customerId'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutCustomersEditCustomerIdImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/inventory/categories/create': {
      id: '/_protected_layout/_dashboard_layout/inventory/categories/create'
      path: '/categories/create'
      fullPath: '/inventory/categories/create'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutInventoryCategoriesCreateImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutInventoryImport
    }
    '/_protected_layout/_dashboard_layout/inventory/products/create': {
      id: '/_protected_layout/_dashboard_layout/inventory/products/create'
      path: '/products/create'
      fullPath: '/inventory/products/create'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutInventoryProductsCreateImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutInventoryImport
    }
    '/_protected_layout/_dashboard_layout/inventory/units/create': {
      id: '/_protected_layout/_dashboard_layout/inventory/units/create'
      path: '/units/create'
      fullPath: '/inventory/units/create'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutInventoryUnitsCreateImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutInventoryImport
    }
    '/_protected_layout/_dashboard_layout/sales/edit/$saleId': {
      id: '/_protected_layout/_dashboard_layout/sales/edit/$saleId'
      path: '/sales/edit/$saleId'
      fullPath: '/sales/edit/$saleId'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutSalesEditSaleIdImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/services/edit/$serviceId': {
      id: '/_protected_layout/_dashboard_layout/services/edit/$serviceId'
      path: '/services/edit/$serviceId'
      fullPath: '/services/edit/$serviceId'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutServicesEditServiceIdImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/vehicles/edit/$vehicleId': {
      id: '/_protected_layout/_dashboard_layout/vehicles/edit/$vehicleId'
      path: '/vehicles/edit/$vehicleId'
      fullPath: '/vehicles/edit/$vehicleId'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutVehiclesEditVehicleIdImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutImport
    }
    '/_protected_layout/_dashboard_layout/inventory/categories/edit/$categoryId': {
      id: '/_protected_layout/_dashboard_layout/inventory/categories/edit/$categoryId'
      path: '/categories/edit/$categoryId'
      fullPath: '/inventory/categories/edit/$categoryId'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutInventoryCategoriesEditCategoryIdImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutInventoryImport
    }
    '/_protected_layout/_dashboard_layout/inventory/products/edit/$productId': {
      id: '/_protected_layout/_dashboard_layout/inventory/products/edit/$productId'
      path: '/products/edit/$productId'
      fullPath: '/inventory/products/edit/$productId'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutInventoryProductsEditProductIdImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutInventoryImport
    }
    '/_protected_layout/_dashboard_layout/inventory/units/edit/$unitId': {
      id: '/_protected_layout/_dashboard_layout/inventory/units/edit/$unitId'
      path: '/units/edit/$unitId'
      fullPath: '/inventory/units/edit/$unitId'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutInventoryUnitsEditUnitIdImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutInventoryImport
    }
    '/_protected_layout/_dashboard_layout/inventory/_inventory_layout/categories/': {
      id: '/_protected_layout/_dashboard_layout/inventory/_inventory_layout/categories/'
      path: '/categories'
      fullPath: '/inventory/categories'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutInventoryInventorylayoutCategoriesIndexImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutInventoryInventorylayoutImport
    }
    '/_protected_layout/_dashboard_layout/inventory/_inventory_layout/products/': {
      id: '/_protected_layout/_dashboard_layout/inventory/_inventory_layout/products/'
      path: '/products'
      fullPath: '/inventory/products'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutInventoryInventorylayoutProductsIndexImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutInventoryInventorylayoutImport
    }
    '/_protected_layout/_dashboard_layout/inventory/_inventory_layout/units/': {
      id: '/_protected_layout/_dashboard_layout/inventory/_inventory_layout/units/'
      path: '/units'
      fullPath: '/inventory/units'
      preLoaderRoute: typeof ProtectedlayoutDashboardlayoutInventoryInventorylayoutUnitsIndexImport
      parentRoute: typeof ProtectedlayoutDashboardlayoutInventoryInventorylayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  LoginRoute,
  ProtectedlayoutDashboardlayoutRoute:
    ProtectedlayoutDashboardlayoutRoute.addChildren({
      ProtectedlayoutDashboardlayoutPosRoute,
      ProtectedlayoutDashboardlayoutIndexRoute,
      ProtectedlayoutDashboardlayoutCustomersCreateRoute,
      ProtectedlayoutDashboardlayoutInventoryRoute:
        ProtectedlayoutDashboardlayoutInventoryRoute.addChildren({
          ProtectedlayoutDashboardlayoutInventoryInventorylayoutRoute:
            ProtectedlayoutDashboardlayoutInventoryInventorylayoutRoute.addChildren(
              {
                ProtectedlayoutDashboardlayoutInventoryInventorylayoutCategoriesIndexRoute,
                ProtectedlayoutDashboardlayoutInventoryInventorylayoutProductsIndexRoute,
                ProtectedlayoutDashboardlayoutInventoryInventorylayoutUnitsIndexRoute,
              },
            ),
          ProtectedlayoutDashboardlayoutInventoryIndexRoute,
          ProtectedlayoutDashboardlayoutInventoryCategoriesCreateRoute,
          ProtectedlayoutDashboardlayoutInventoryProductsCreateRoute,
          ProtectedlayoutDashboardlayoutInventoryUnitsCreateRoute,
          ProtectedlayoutDashboardlayoutInventoryCategoriesEditCategoryIdRoute,
          ProtectedlayoutDashboardlayoutInventoryProductsEditProductIdRoute,
          ProtectedlayoutDashboardlayoutInventoryUnitsEditUnitIdRoute,
        }),
      ProtectedlayoutDashboardlayoutSalesSaleIdRoute,
      ProtectedlayoutDashboardlayoutServicesCreateRoute,
      ProtectedlayoutDashboardlayoutVehiclesCreateRoute,
      ProtectedlayoutDashboardlayoutCustomersIndexRoute,
      ProtectedlayoutDashboardlayoutMaintenanceIndexRoute,
      ProtectedlayoutDashboardlayoutSalesIndexRoute,
      ProtectedlayoutDashboardlayoutServicesIndexRoute,
      ProtectedlayoutDashboardlayoutVehiclesIndexRoute,
      ProtectedlayoutDashboardlayoutCustomersEditCustomerIdRoute,
      ProtectedlayoutDashboardlayoutSalesEditSaleIdRoute,
      ProtectedlayoutDashboardlayoutServicesEditServiceIdRoute,
      ProtectedlayoutDashboardlayoutVehiclesEditVehicleIdRoute,
    }),
  ProtectedlayoutInvoiceRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/login",
        "/_protected_layout/_dashboard_layout",
        "/_protected_layout/invoice"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_protected_layout/_dashboard_layout": {
      "filePath": "_protected_layout/_dashboard_layout.tsx",
      "children": [
        "/_protected_layout/_dashboard_layout/pos",
        "/_protected_layout/_dashboard_layout/",
        "/_protected_layout/_dashboard_layout/customers/create",
        "/_protected_layout/_dashboard_layout/inventory",
        "/_protected_layout/_dashboard_layout/sales/$saleId",
        "/_protected_layout/_dashboard_layout/services/create",
        "/_protected_layout/_dashboard_layout/vehicles/create",
        "/_protected_layout/_dashboard_layout/customers/",
        "/_protected_layout/_dashboard_layout/maintenance/",
        "/_protected_layout/_dashboard_layout/sales/",
        "/_protected_layout/_dashboard_layout/services/",
        "/_protected_layout/_dashboard_layout/vehicles/",
        "/_protected_layout/_dashboard_layout/customers/edit/$customerId",
        "/_protected_layout/_dashboard_layout/sales/edit/$saleId",
        "/_protected_layout/_dashboard_layout/services/edit/$serviceId",
        "/_protected_layout/_dashboard_layout/vehicles/edit/$vehicleId"
      ]
    },
    "/_protected_layout/invoice": {
      "filePath": "_protected_layout/invoice.tsx"
    },
    "/_protected_layout/_dashboard_layout/pos": {
      "filePath": "_protected_layout/_dashboard_layout/pos.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/": {
      "filePath": "_protected_layout/_dashboard_layout/index.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/customers/create": {
      "filePath": "_protected_layout/_dashboard_layout/customers/create.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/inventory": {
      "filePath": "_protected_layout/_dashboard_layout/inventory",
      "parent": "/_protected_layout/_dashboard_layout",
      "children": [
        "/_protected_layout/_dashboard_layout/inventory/_inventory_layout",
        "/_protected_layout/_dashboard_layout/inventory/",
        "/_protected_layout/_dashboard_layout/inventory/categories/create",
        "/_protected_layout/_dashboard_layout/inventory/products/create",
        "/_protected_layout/_dashboard_layout/inventory/units/create",
        "/_protected_layout/_dashboard_layout/inventory/categories/edit/$categoryId",
        "/_protected_layout/_dashboard_layout/inventory/products/edit/$productId",
        "/_protected_layout/_dashboard_layout/inventory/units/edit/$unitId"
      ]
    },
    "/_protected_layout/_dashboard_layout/inventory/_inventory_layout": {
      "filePath": "_protected_layout/_dashboard_layout/inventory/_inventory_layout.tsx",
      "parent": "/_protected_layout/_dashboard_layout/inventory",
      "children": [
        "/_protected_layout/_dashboard_layout/inventory/_inventory_layout/categories/",
        "/_protected_layout/_dashboard_layout/inventory/_inventory_layout/products/",
        "/_protected_layout/_dashboard_layout/inventory/_inventory_layout/units/"
      ]
    },
    "/_protected_layout/_dashboard_layout/sales/$saleId": {
      "filePath": "_protected_layout/_dashboard_layout/sales/$saleId.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/services/create": {
      "filePath": "_protected_layout/_dashboard_layout/services/create.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/vehicles/create": {
      "filePath": "_protected_layout/_dashboard_layout/vehicles/create.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/customers/": {
      "filePath": "_protected_layout/_dashboard_layout/customers/index.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/inventory/": {
      "filePath": "_protected_layout/_dashboard_layout/inventory/index.tsx",
      "parent": "/_protected_layout/_dashboard_layout/inventory"
    },
    "/_protected_layout/_dashboard_layout/maintenance/": {
      "filePath": "_protected_layout/_dashboard_layout/maintenance/index.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/sales/": {
      "filePath": "_protected_layout/_dashboard_layout/sales/index.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/services/": {
      "filePath": "_protected_layout/_dashboard_layout/services/index.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/vehicles/": {
      "filePath": "_protected_layout/_dashboard_layout/vehicles/index.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/customers/edit/$customerId": {
      "filePath": "_protected_layout/_dashboard_layout/customers/edit/$customerId.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/inventory/categories/create": {
      "filePath": "_protected_layout/_dashboard_layout/inventory/categories/create.tsx",
      "parent": "/_protected_layout/_dashboard_layout/inventory"
    },
    "/_protected_layout/_dashboard_layout/inventory/products/create": {
      "filePath": "_protected_layout/_dashboard_layout/inventory/products/create.tsx",
      "parent": "/_protected_layout/_dashboard_layout/inventory"
    },
    "/_protected_layout/_dashboard_layout/inventory/units/create": {
      "filePath": "_protected_layout/_dashboard_layout/inventory/units/create.tsx",
      "parent": "/_protected_layout/_dashboard_layout/inventory"
    },
    "/_protected_layout/_dashboard_layout/sales/edit/$saleId": {
      "filePath": "_protected_layout/_dashboard_layout/sales/edit/$saleId.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/services/edit/$serviceId": {
      "filePath": "_protected_layout/_dashboard_layout/services/edit/$serviceId.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/vehicles/edit/$vehicleId": {
      "filePath": "_protected_layout/_dashboard_layout/vehicles/edit/$vehicleId.tsx",
      "parent": "/_protected_layout/_dashboard_layout"
    },
    "/_protected_layout/_dashboard_layout/inventory/categories/edit/$categoryId": {
      "filePath": "_protected_layout/_dashboard_layout/inventory/categories/edit/$categoryId.tsx",
      "parent": "/_protected_layout/_dashboard_layout/inventory"
    },
    "/_protected_layout/_dashboard_layout/inventory/products/edit/$productId": {
      "filePath": "_protected_layout/_dashboard_layout/inventory/products/edit/$productId.tsx",
      "parent": "/_protected_layout/_dashboard_layout/inventory"
    },
    "/_protected_layout/_dashboard_layout/inventory/units/edit/$unitId": {
      "filePath": "_protected_layout/_dashboard_layout/inventory/units/edit/$unitId.tsx",
      "parent": "/_protected_layout/_dashboard_layout/inventory"
    },
    "/_protected_layout/_dashboard_layout/inventory/_inventory_layout/categories/": {
      "filePath": "_protected_layout/_dashboard_layout/inventory/_inventory_layout/categories/index.tsx",
      "parent": "/_protected_layout/_dashboard_layout/inventory/_inventory_layout"
    },
    "/_protected_layout/_dashboard_layout/inventory/_inventory_layout/products/": {
      "filePath": "_protected_layout/_dashboard_layout/inventory/_inventory_layout/products/index.tsx",
      "parent": "/_protected_layout/_dashboard_layout/inventory/_inventory_layout"
    },
    "/_protected_layout/_dashboard_layout/inventory/_inventory_layout/units/": {
      "filePath": "_protected_layout/_dashboard_layout/inventory/_inventory_layout/units/index.tsx",
      "parent": "/_protected_layout/_dashboard_layout/inventory/_inventory_layout"
    }
  }
}
ROUTE_MANIFEST_END */
