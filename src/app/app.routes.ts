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
<<<<<<< Updated upstream

export const routes: Routes = [
  { path: '', component: AnalyzeContractComponent },
  { path: 'country', component: IndexCountryComponent },
  { path: 'add-country', component: CreateCountryComponent },
  { path: 'view-country/:id', component: ViewCountryComponent },
  { path: 'edit-country/:id', component: EditCountryComponent },
  { path: 'domain', component: IndexDomainComponent },
  { path: 'add-domain', component: CreateDomainComponent },
  { path: 'view-domain/:id', component: ViewDomainComponent },
  { path: 'edit-domain/:id', component: EditDomainComponent },
  { path: 'compliance', component: IndexComplianceComponent },
  { path: 'add-compliance', component: CreateComplianceComponent },
  { path: 'view-compliance/:id', component: ViewComplianceComponent },
  { path: 'edit-compliance/:id', component: EditComplianceComponent },
  { path: 'clause', component: IndexClauseComponent },
  { path: 'add-clause', component: CreateClauseComponent },
  { path: 'view-clause/:id', component: ViewClauseComponent },
  { path: 'edit-clause/:id', component: EditClauseComponent },
  { path: 'admin', component: AdminPersonaComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
=======
import { ErrorPageComponent } from './shared/error-page/error-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/analyze', pathMatch: 'full' },
  { path: 'analyze', component: AnalyzeContractComponent },

  {
    path: 'admin',
    component: AdminPersonaComponent,
    children: [
      { path: 'country', component: IndexCountryComponent },
      { path: 'add-country', component: CreateCountryComponent },
      { path: 'view-country/:id', component: ViewCountryComponent },
      { path: 'edit-country/:id', component: EditCountryComponent },

      { path: 'domain', component: IndexDomainComponent },
      { path: 'add-domain', component: CreateDomainComponent },
      { path: 'view-domain/:id', component: ViewDomainComponent },
      { path: 'edit-domain/:id', component: EditDomainComponent },

      { path: 'clause', component: IndexClauseComponent },
      { path: 'add-clause', component: CreateClauseComponent },
      { path: 'view-clause/:id', component: ViewClauseComponent },
      { path: 'edit-clause/:id', component: EditClauseComponent },

      // default inside admin
      { path: '', redirectTo: 'country', pathMatch: 'full' },
    ],
  },
  { path: '**', component: ErrorPageComponent },
>>>>>>> Stashed changes
];
