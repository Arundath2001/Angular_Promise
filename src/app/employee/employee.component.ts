import { Component } from '@angular/core';
import Swal from 'sweetalert2';

interface Employee {
  empId: number;
  name: string;
  place: string;
  department: string;
  salary: number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  employees: Employee[] = [
    { empId: 1, name: 'Arundath', place: 'Kozhikode', department: 'Developer', salary: 20000 },
    { empId: 2, name: 'Rohith', place: 'Kannur', department: 'Designer', salary: 40000 },
    { empId: 3, name: 'Aromal', place: 'Kannur', department: 'Developer', salary: 30000 },
    { empId: 4, name: 'Jareesh', place: 'Kozhikode', department: 'HR', salary: 50000 },
    { empId: 5, name: 'Abhinav', place: 'Kannur', department: 'HR', salary: 45000 },
  ];
  confirmPromise(empId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this employee!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: "No, don't delete!"
      }).then((result: { isConfirmed: boolean | PromiseLike<boolean>; }) => {
        resolve(result.isConfirmed);
      }).catch((error: any) => {
        console.error('Error in confirmPromise:', error);
        reject(error);
      });
    });
  }
  async delete(empId: number): Promise<void> {
    try {
      const variable1 = await this.confirmPromise(empId);

      if (variable1) {
        const index = this.employees.findIndex(employee => employee.empId === empId);
        if (index !== -1) {
          this.employees.splice(index, 1);
        }
        Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
      } else {
      }
    } catch (error) {
      console.error('Error in delete:', error);
    }
  }
}
