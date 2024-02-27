import { Routes } from '@angular/router';
import { FinancialProductsComponent } from './Views/financial-products/financial-products.component';
import { FinancialProductsMantainerComponent } from './Views/financial-products-mantainer/financial-products-mantainer.component';

export const routes: Routes = [
    {
        path:"mantainer",component:FinancialProductsMantainerComponent
    },{
        path:"financial-products",component:FinancialProductsComponent
    },{
        path:"financial-products/:item",component:FinancialProductsComponent
    },
    {
        path:"",pathMatch:"full",redirectTo:"mantainer"
    }
];
