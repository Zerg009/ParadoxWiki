import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ParadoxInfo } from '../paradox-info';

@Injectable({
  providedIn: 'root'
})
export class ParadoxService {
  private baseURL = "http://localhost:8080/api/v1/paradox_info";
  currentParadox: ParadoxInfo;
  private paradoxChangedSource:Subject<ParadoxInfo> = new Subject<ParadoxInfo>();
  constructor(private httpClient: HttpClient) { 

  }
  getParadoxList(): Observable<ParadoxInfo[]>{
    return this.httpClient.get<ParadoxInfo[]>(`${this.baseURL}`);
  }
  setCurrentParadox(paradox: ParadoxInfo){
    this.currentParadox = paradox;
    this.paradoxChangedSource.next(paradox);
  }
  paradoxChanged$(): Observable<ParadoxInfo> {
    return this.paradoxChangedSource.asObservable();
  }
}