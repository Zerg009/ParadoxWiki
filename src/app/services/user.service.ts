import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParadoxInfo } from '../types/paradox-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserHistory } from '../types/user-history';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseURL = "http://localhost:8080/api/v1/";
  private userFirstName: string = '';
  constructor(private httpClient: HttpClient) { }

  addFavorite(paradoxId: number) {
    return this.httpClient.post<any>(this.baseURL +'user/add_favorite/' + paradoxId, {});
  }

  getFavoriteParadoxes() {
    console.log('Requesting favorite paradoxes with headers:');
    return this.httpClient.get<ParadoxInfo[]>(this.baseURL +'user/favorites');
  }
  getUserHistory() {
    return this.httpClient.get<UserHistory[]>(this.baseURL +'user/history');
  }
  removeFavorite(paradoxId: number) {
    return this.httpClient.delete<any>(this.baseURL + 'user/remove_favorite/' + paradoxId);
  }
  getUserFirstName(){
    return this.httpClient.get<any>(this.baseURL + 'user/firstname');
  }
}
