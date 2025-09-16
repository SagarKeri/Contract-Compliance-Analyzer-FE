import { Routes } from '@angular/router';
import { IndexCountryComponent } from './Components/Country/index-country/index-country.component';
import { AnalyzeContractComponent } from './Components/analyze-contract/analyze-contract.component';
import { CreateCountryComponent } from './Components/Country/create-country/create-country.component';
import { EditCountryComponent } from './Components/Country/edit-country/edit-country.component';
import { ViewCountryComponent } from './Components/Country/view-country/view-country.component';
import { IndexDomainComponent } from './Components/Domain/index-domain/index-domain.component';
import { CreateDomainComponent } from './Components/Domain/create-domain/create-domain.component';
import { ViewDomainComponent } from './Components/Domain/view-domain/view-domain.component';
import { EditDomainComponent } from './Components/Domain/edit-domain/edit-domain.component';
import { IndexComplianceComponent } from './Components/Compliance/index-compliance/index-compliance.component';
import { CreateComplianceComponent } from './Components/Compliance/create-compliance/create-compliance.component';
import { ViewComplianceComponent } from './Components/Compliance/view-compliance/view-compliance.component';
import { EditComplianceComponent } from './Components/Compliance/edit-compliance/edit-compliance.component';
import { IndexClauseComponent } from './Components/Clause/index-clause/index-clause.component';
import { CreateClauseComponent } from './Components/Clause/create-clause/create-clause.component';
import { ViewClauseComponent } from './Components/Clause/view-clause/view-clause.component';
import { EditClauseComponent } from './Components/Clause/edit-clause/edit-clause.component';
import { AdminPersonaComponent } from './Components/admin-persona/admin-persona.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';
import { AuthGuard } from './Guards/auth-Guard';
import { UserIndexComponent } from './Components/user/user-index/user-index.component';
import { PastAnalysisComponent } from './Components/past-analysis/past-analysis.component';
import { AuthRedirectGuard } from './Guards/auth-redirect.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthLayoutComponent ,canActivate:[AuthRedirectGuard]},

  {
    path: 'analyze',
    component: AnalyzeContractComponent,
    canActivate: [AuthGuard],
  },
  { path: 'my-analysis', component: PastAnalysisComponent,canActivate: [AuthGuard] },
  // {
  //   path: 'admin',
  //   component: AdminPersonaComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: [1] },
  //   children: [
      { path: 'country', component: IndexCountryComponent, canActivate: [AuthGuard],data: { roles: [1] }},
      { path: 'add-country', component: CreateCountryComponent , canActivate: [AuthGuard],data: { roles: [1] }},
      { path: 'view-country/:id', component: ViewCountryComponent , canActivate: [AuthGuard],data: { roles: [1] }},
      { path: 'edit-country/:id', component: EditCountryComponent , canActivate: [AuthGuard],data: { roles: [1] }},
      { path: 'domain', component: IndexDomainComponent , canActivate: [AuthGuard],data: { roles: [1] }},
      { path: 'add-domain', component: CreateDomainComponent , canActivate: [AuthGuard],data: { roles: [1] }},
      { path: 'view-domain/:id', component: ViewDomainComponent , canActivate: [AuthGuard],data: { roles: [1] }},
      { path: 'edit-domain/:id', component: EditDomainComponent , canActivate: [AuthGuard],data: { roles: [1] }},

      { path: 'compliance', component: IndexComplianceComponent , canActivate: [AuthGuard],data: { roles: [1] }},
      { path: 'add-compliance', component: CreateComplianceComponent , canActivate: [AuthGuard],data: { roles: [1] }},
      { path: 'view-compliance/:id', component: ViewComplianceComponent , canActivate: [AuthGuard],data: { roles: [1] }},
      { path: 'edit-compliance/:id', component: EditComplianceComponent , canActivate: [AuthGuard],data: { roles: [1] }},

      { path: 'clause', component: IndexClauseComponent , canActivate: [AuthGuard],data: { roles: [1] }},
      { path: 'add-clause', component: CreateClauseComponent , canActivate: [AuthGuard],data: { roles: [1] }},
      { path: 'view-clause/:id', component: ViewClauseComponent , canActivate: [AuthGuard],data: { roles: [1] }},
      { path: 'edit-clause/:id', component: EditClauseComponent , canActivate: [AuthGuard],data: { roles: [1] }},

      { path: 'user', component: UserIndexComponent , canActivate: [AuthGuard],data: { roles: [1] }},
      { path: '', redirectTo: 'country', pathMatch: 'full' }, // default child
    //],
  //},

  { path: '**', component: ErrorPageComponent }, // catch-all
];
