import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  SaveEmployee(employee: any): Observable<any> {
    return this.httpClient.post<any>(`https://0w8b5hyk2m.execute-api.us-east-1.amazonaws.com/Prod/save-employees`, employee).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  GetEmployee(employee_id: any): Observable<any> {
    return this.httpClient.get<any>(`https://rdomsy3w8b.execute-api.us-east-1.amazonaws.com/Prod/get-employee/${employee_id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  DeleteEmployee(employee_id: any): Observable<any> {
    return this.httpClient.delete<any>(`https://jqmkhzhs4g.execute-api.us-east-1.amazonaws.com/Prod/employee/${employee_id}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  UpdateEmployee(employee: any): Observable<any> {
    return this.httpClient.put<any>(`https://jqmkhzhs4g.execute-api.us-east-1.amazonaws.com/Prod/employee`, employee).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
