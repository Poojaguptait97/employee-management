import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { Employee } from 'src/app/account/modal/registerationModel';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit {

  bsModalRef!: BsModalRef;
  employeeList: Employee[] = [];
  userId: number = 0;
  userData: Employee = {
    Id: 0,
    userName: '',
    email: '',
    dob: 0,
    gender: '',
    education: '',
    designation: '',
    experience: 0,
    package: 0
  };

  searchedItem: any[] = [];
  paginatedList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  private emailRegExp = "/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/";
  private name1_exp = "^[a-zA-Z\\s]+$";

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.updatePagination();
  }

  openAddEditModal(id?: any) {
    const initialState: ModalOptions = {
      initialState: {
        buttonName: id == null ? 'Add' : 'Save',
        title: id == null ? 'Add Employee' : 'Edit Employee',
        employeeId: id,
      }
    };
    this.bsModalRef = this.modalService.show(EditEmployeeComponent, initialState);
    if (this.bsModalRef.content && this.bsModalRef.content.event) {
      this.bsModalRef.content.event.subscribe((response: any) => {
        if (response.success) {
          if (!response?.data?.length) {
            const email = response?.data.email.trim();
            const duplicateValue = this.employeeList.filter((x: any) => x.email == email);
            if (duplicateValue.length == 0) {
              if (this.checkArrayExist(JSON.parse(localStorage.getItem('User') as any))) {
                this.userId = JSON.parse(localStorage.getItem('User') as any)[JSON.parse(localStorage.getItem('User') as any).length - 1].Id;
              }

              this.userData = {
                Id: this.userId + 1,
                userName: response?.data?.userName,
                email: response?.data?.email,
                dob: response?.data?.dob,
                gender: response?.data?.gender,
                education: response?.data?.education,
                designation: response?.data?.designation,
                experience: response?.data?.experience,
                package: response?.data?.package
              }
              this.employeeList.push(this.userData);
              localStorage.setItem('User', JSON.stringify(this.employeeList));
            } else {
              alert("User Already exit")
            }
          } else {
            this.employeeList = [];
            localStorage.setItem('User', JSON.stringify(response?.data));
          }
          this.updatePagination();
        }
      });
    } else {
      console.error('Modal content does not have an event emitter.');
    }
  }

  clearField(){}

  searchDetails(data: any) {
    this.searchedItem = [];
    for (let index = 0; index < this.employeeList.length; index++) {
      if (this.employeeList[index].email == data) {
        this.paginatedList = this.employeeList.filter((e) => e.email == data);
        this.searchedItem = this.paginatedList;
        break;
      }
    }

    for (let index = 0; index < this.employeeList.length; index++) {
      if (this.employeeList[index].userName == data) {
        this.paginatedList = this.employeeList.filter((e) => e.userName == data);
        this.searchedItem = this.paginatedList;
        break;
      }
    }

    if (this.searchedItem.length == 0) {
      alert("No DATA FOUND")
    }
  }

  openDeleteConfirmationModal(id: any) {
    const initialState: ModalOptions = {
      initialState: {
        employeeId: id,
      }
    };
    this.bsModalRef = this.modalService.show(ConfirmationModalComponent, initialState);
    this.bsModalRef.content.event.subscribe((response: any) => {
      if (response.success) {
        this.deleteItem(response.data);
      }
    })
  }

  deleteItem(employeeId: any) {
    if (employeeId) {
      this.employeeList = this.employeeList.filter((e) => e.Id !== employeeId);
      localStorage.setItem('User', JSON.stringify(this.employeeList));
      this.updatePagination();
    }
  }

  checkArrayExist(arr: any) {
    if (typeof arr != null && arr != 'undefined' && arr.length > 0 && arr.length != null) {
      return true;
    }
    return false;
  }

  // Update the paginated list
  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.employeeList = JSON.parse(localStorage.getItem('User') as any);
    this.paginatedList = this.employeeList.slice(startIndex, endIndex);
  }

  // Handle next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  // Handle previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Update when items per page changes
  onPageSizeChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  // Calculate total pages
  get totalPages(): number {
    return Math.ceil(this.employeeList.length / this.itemsPerPage);
  }

  // Get start and end item numbers for the current page
  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endItem(): number {
    const end = this.startItem + this.itemsPerPage;
    return end > this.employeeList.length ? this.employeeList.length : end;
  }

}

