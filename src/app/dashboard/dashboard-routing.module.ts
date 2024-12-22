import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

const routes: Routes = [
  { path: 'employee-management', component: EmployeeManagementComponent },
  { path: 'edit-employee', component: EditEmployeeComponent},
  { path: '', redirectTo: '/emp-list', pathMatch: 'full' }, //Default route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
