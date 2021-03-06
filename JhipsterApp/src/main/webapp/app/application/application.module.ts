import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'apply',
                loadChildren: './apply/apply.module#TaManagementApplyModule'
            },
            {
                path: 'evaluate',
                loadChildren: './evaluate/evaluate.module#TaManagementEvaluateModule'
            }
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementApplicationModule {}
