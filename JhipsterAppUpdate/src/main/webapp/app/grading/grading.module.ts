import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'grading-assign',
                loadChildren: './assign/assign.module#TaManagementGradingAssignModule'
            },
            {
                path: 'grading-view',
                loadChildren: './view/view.module#TaManagementGradingViewModule'
            }
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementGradingModule {}
