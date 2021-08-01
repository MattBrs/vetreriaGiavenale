import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, pipe, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "../shared/user.model";


interface ResponsePayload {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser = new BehaviorSubject<User>(new User('', '', '', new Date()));

  constructor(private http: HttpClient) {
  }

  loginUser(email: string, password: string) {
    let payload = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    return this.http.post<ResponsePayload>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseKey,
      payload
    ).pipe(
      catchError(AuthService.handleError),
      tap(data => {
        this.handleAuth(data.email, data.localId, data.idToken, +data.expiresIn);
      })
    );
  }

  registerUser(email:string, password: string, username: string) {
    let payload = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    return this.http.post<ResponsePayload>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseKey,
      payload
    ).pipe(
      catchError(AuthService.handleError), //se ci sono errori esegue il metodo handleError
      tap(data => {
        // se non ci sono errori la registrazione avviene con successo
        this.handleAuth(data.email, data.localId, data.idToken, +data.expiresIn)
      })
    );

  }

  private static handleError (errorResponse: HttpErrorResponse){

    let errorMessage = 'An unknown error occurred';
    let error = errorResponse.error.error.message;
    if(error == 'EMAIL_EXISTS'){
      errorMessage = 'Email already exists';
    }else if(error == 'EMAIL_NOT_FOUND'){
      errorMessage = 'Email not found';
    }else if(error == 'INVALID_PASSWORD'){
      errorMessage = 'Invalid password';
    }else if(error.includes('WEAK_PASSWORD')){
      errorMessage = 'Weak password';
    }

    return throwError(errorMessage);
  }

  private handleAuth(email: string, id: string, token: string, expiresIn: number){
    let expirationDate = new Date(new Date().getTime() + expiresIn*1000)
    let user: User = new User(email,id,token,expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.loggedUser.next(user);
  }


}
