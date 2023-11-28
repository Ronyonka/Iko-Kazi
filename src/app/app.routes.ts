import { Routes } from '@angular/router';
import { ListingsComponent } from './components/listings/listings.component';
import { DescriprionComponent } from './components/descriprion/descriprion.component';

const routeConfig: Routes = [
    {
        path: '',
        component: ListingsComponent,
        title: 'All Jobs'
    },
    {
        path: 'job-description/:id',
        component: DescriprionComponent,
        title: 'Job Description'
    }
];

export default routeConfig;