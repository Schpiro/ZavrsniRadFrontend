import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import jwt_decode from "jwt-decode";
import {Login} from "../model/login.model";
import {Jwt} from "../model/jwt.model";
import {BackendBaseService} from "./backend-base.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BackendBaseService{

  static getAuthenticatedUserID: any;

  constructor(private http: HttpClient) {
    super();
  }

  login(login: Login) {
    return this.http.post<Jwt>(`${this.rootUrl}/login`, login);
  }

  register(login: Login){
    return this.http.post<Jwt>(`${this.rootUrl}/register`, login)
  }

  saveJwtToLocalStorage(jwt: string) {
    localStorage.setItem('accessToken', jwt);
  }

  isUserAuthenticated() {
    const decodedToken = this.decodeJwt();
    let usernameKey = null;
    if (decodedToken != null) {
      usernameKey = (Object.keys(decodedToken) as (keyof typeof decodedToken)[]).find((key) => {
        return key === 'sub' && decodedToken[key] != null;
      });
    }
    return usernameKey != null;
  }

  getAuthenticatedUserUsername(): string {
    const decodedToken = this.decodeJwt();
    let username = null;
    if (decodedToken != null) {
      const usernameKey = (Object.keys(decodedToken) as (keyof typeof decodedToken)[]).find((key) => {
        return key === 'sub' && decodedToken[key] != null;
      });
      if (usernameKey != null) {
        username = decodedToken[usernameKey]
      }
    }
    // @ts-ignore
    return username;
  }

  getAuthenticatedUserID(): number {
    const decodedToken = this.decodeJwt();
    let userId;
    if (decodedToken != null) {
      const usernameKey = (Object.keys(decodedToken) as (keyof typeof decodedToken)[]).find((key) => {
        // @ts-ignore
        return key === 'USER_ID' && decodedToken[key] != null;
      });
      if (usernameKey != null) {
        userId = decodedToken[usernameKey]
      }
    }
    // @ts-ignore
    return userId;
  }

  isUserAdmin(): boolean {
    const adminRoleName = 'ROLE_ADMIN';
    const decodedToken = this.decodeJwt();
    let authorities: any = null;
    if (decodedToken != null) {
      const usernameKey = (Object.keys(decodedToken) as (keyof typeof decodedToken)[]).find((key) => {
        // @ts-ignore
        return key === 'authorities' && decodedToken[key] != null;
      });
      if (usernameKey != null) {
        authorities = decodedToken[usernameKey]
      }
    }
    return authorities != null && authorities.includes(adminRoleName);
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  decodeJwt(): string | null {
    let token = localStorage.getItem('accessToken');
    if (token != null) {
      return jwt_decode(token);
    } else {
      return null;
    }
  }

}
