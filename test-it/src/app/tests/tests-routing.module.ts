import { Routes, RouterModule } from '@angular/router';
import {
  TestsListComponent,
  TestDetailComponent,
  TestEditComponent,
} from './components';
import { AuthDeactivate } from '../guards';
import { PlayTestComponent } from './components/play-test/play-test.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: TestsListComponent,
  },
  {
    path: ':id',
    component: TestDetailComponent,
    title: 'App | Test',
  },
  {
    path: ':id/edit',
    component: TestEditComponent,
    title: 'App | TestEdit',
    canDeactivate: [AuthDeactivate],
  },

  {
    path: ':id/play',
    component: PlayTestComponent,
    title: 'App | PlayTest',
    canDeactivate: [AuthDeactivate],
  },
];

export const TestsRoutingModule = RouterModule.forChild(routes);
