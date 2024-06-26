import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ParadoxInfo } from '../types/paradox-info';

@Injectable({
  providedIn: 'root'
})
export class ParadoxService {
  currentParadox: ParadoxInfo;
  private baseURL = "http://localhost:8080/api/v1";
  private paradoxChangedSource: Subject<ParadoxInfo> = new Subject<ParadoxInfo>();
  private paradoxListChanged: Subject<void> = new Subject<void>();
  private paradoxList: ParadoxInfo[];
  constructor(private httpClient: HttpClient) {

  }
  retrieveParadoxList() {
    this.httpClient.get<ParadoxInfo[]>(`${this.baseURL}/paradox_info`).subscribe(data => {
      this.paradoxList = data;
      this.paradoxListChanged.next();
    });

  }
  getParadoxList(): ParadoxInfo[] {
    return this.paradoxList;

  }
  setCurrentParadox(paradox: ParadoxInfo) {
    this.currentParadox = paradox;

    this.paradoxChangedSource.next(paradox);
  }
  paradoxChanged$(): Observable<ParadoxInfo> {
    return this.paradoxChangedSource.asObservable();
  }
  paradoxListChanged$(): Observable<void> { // New method to subscribe to paradox list changes
    return this.paradoxListChanged.asObservable();
  }
  getParadoxFromList(tech_name: string): ParadoxInfo | undefined {
    if (this.paradoxList) {
      return this.paradoxList.find(p => p.tech_name.toLowerCase() === tech_name.toLowerCase());
    }
    //const paradox = this.paradoxList.find(p => p.tech_name.toLowerCase() === tech_name.toLowerCase());
    return undefined;
  }
  searchParadoxes(keyword: string): Observable<ParadoxInfo[]> {
    return this.httpClient.get<ParadoxInfo[]>(`${this.baseURL}/search`, {
      params: { keyword }
    });
  }
}