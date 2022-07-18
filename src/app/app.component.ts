import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeeService } from "./services/employee.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "AngularAWS";
  public employeeForm: FormGroup;
  public employeeId: string;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.formBuilder.group({
      EmployeeId: "",
      EmployeeName: "",
      EmployeeSecondName: "",
      EmployeeLastName: "",
      EmployeeSecondLastName: "",
      Age: 0,
      Genre: "",
      Email: "",
      MobilePhone: "",
    });
  }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      EmployeeName: [null, Validators.required],
      EmployeeSecondName: [null, Validators.required],
      EmployeeLastName: [null, Validators.required],
      EmployeeSecondLastName: [null, Validators.required],
      Age: [null, Validators.required],
      Genre: [null, Validators.required],
      Email: [null, Validators.required],
      MobilePhone: [null, Validators.required]
    });
  }

  SaveEmployee(): void {
    let employee = this.employeeForm.value;
    this.employeeService.SaveEmployee(employee).subscribe({
      complete: () => {
        this.clearEmployeeFields();
      },
      next: (response: any) => {
        console.log(response);
        alert(response.Message);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  GetEmployee(): void {
    this.employeeService.GetEmployee(this.employeeId).subscribe({
      complete: () => {},
      next: (response: any) => {
        console.log(response);
        this.employeeForm.controls['Age'].setValue(response.Result.Item.Age);
        this.employeeForm.controls['Email'].setValue(response.Result.Item.Email);
        this.employeeForm.controls['EmployeeLastName'].setValue(response.Result.Item.EmployeeLastName);
        this.employeeForm.controls['EmployeeSecondName'].setValue(response.Result.Item.EmployeeSecondName);
        this.employeeForm.controls['MobilePhone'].setValue(response.Result.Item.MobilePhone);
        this.employeeForm.controls['Genre'].setValue(response.Result.Item.Genre);
        this.employeeForm.controls['EmployeeName'].setValue(response.Result.Item.EmployeeName);
        this.employeeForm.controls['EmployeeSecondLastName'].setValue(response.Result.Item.EmployeeSecondLastName);
        alert(response.Message);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  DeleteEmployee(): void {
    this.employeeService.DeleteEmployee(this.employeeId).subscribe({
      complete: () => {},
      next: (response: any) => {
        console.log(response);
        alert("Employee was deleted");
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  UpdateEmployee(): void {
    let employee = this.employeeForm.value;
    employee["EmployeeId"] = this.employeeId;
    this.employeeService.UpdateEmployee(employee).subscribe({
      complete: () => {
        this.clearEmployeeFields();
      },
      next: (response: any) => {
        console.log(response);
        alert("Employee was updated");
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  clearEmployeeFields(): void {
    this.employeeForm.controls['Age'].setValue("");
    this.employeeForm.controls['Email'].setValue("");
    this.employeeForm.controls['EmployeeLastName'].setValue("");
    this.employeeForm.controls['EmployeeSecondName'].setValue("");
    this.employeeForm.controls['MobilePhone'].setValue("");
    this.employeeForm.controls['Genre'].setValue("");
    this.employeeForm.controls['EmployeeName'].setValue("");
    this.employeeForm.controls['EmployeeSecondLastName'].setValue("");
  }
}
