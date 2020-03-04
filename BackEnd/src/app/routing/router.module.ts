import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterEvent } from '@angular/router';
import { AppleTradingComponent } from '../apple-trading.component';
import { MainComponent } from '../main/main.component';
import { GrowersComponent } from '../main/growers/growers.component';
import { BuyerComponent } from '../main/buyer/buyer.component';
import { BuyComponent } from '../main/growers/buy/buy.component';
import { CommonModule } from '@angular/common';
import { GrowerComponent } from '../main/growers/grower/grower.component';


/*const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: MainComponent,
        children: [
            {
                path: 'grower',
                component: GrowerComponent,
                children: [{
                    path: 'buy',
                    component: BuyComponent
                }]

            }
            ,
            {
                path: 'buyer',
                component: BuyerComponent
            }
        ]

    }
]*/


const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/growers',
        pathMatch: 'full',

    },
    {
        path: 'dashboard',
        children: [{
            path: '',
            pathMatch: 'full',
            redirectTo: 'growers'
        }, {
            path: 'growers',
            component: GrowersComponent,
        },
        {
            path: 'growers/:growerName',
            component: GrowerComponent
        }]
    }
 
    // },
    // {
    //     path: 'dashboard/growers',
    //     component: GrowersComponent,
    // },
    // {
    //     path: 'dashboard/growers/:growerName',
    //     component: GrowerComponent
    // },
    // {
    //     path: 'dashboard/buyer',
    //     component: BuyerComponent
    // }



]
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule]

})
export class AppleTradingRouter { }
