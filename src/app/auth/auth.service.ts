import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "../shared/user.model";
import {Router} from "@angular/router";

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
  expiresIn = 3600;

  constructor(private http: HttpClient, private router: Router) {
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
        this.expiresIn = +data.expiresIn;
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
    let expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    let user: User = new User(email, id, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(user ,expiresIn*1000);
    this.loggedUser.next(user);
  }

  logout() {
    this.loggedUser.next(new User('','','', new Date()));
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  autoLogin(){
    let localDataItem = localStorage.getItem('userData');
    let data: {
      email: string,
      id: string,
      _token: string,
     _expirationDate: Date
    } = JSON.parse(<string>localDataItem);

    if(data._expirationDate >= new Date()){
      this.logout();
      alert('Token expired, please login again');
    }else {
      const loadedUser = new User(data.email, data.id, data._token, data._expirationDate);
      if(loadedUser.token != ''){
        console.log('autoLogin: ' + loadedUser.expirationDate);
        this.loggedUser.next(loadedUser);
        this.autoLogout(loadedUser , new Date(loadedUser.expirationDate).getTime() - new Date().getTime());
      }
    }
  }

  autoLogout(user: User, time: number) {
    console.log(user.expirationDate);
    setTimeout(() => {

      // firebase.auth().currentUser?.getIdToken(true);
      // const refreshedUser = new User(user.email, user.id, user.token, new Date(new Date().getTime() + 3600000));
      // this.loggedUser.next(refreshedUser);
      // console.log('token has been refreshed, new expiration time and date: ');
      // console.log(refreshedUser.expirationDate)

      this.handleAuth(user.email, user.id, user.token, this.expiresIn)
      console.log('token expired, retrying login');
      //this.logout();
      //alert('Token expired, please login again');
    } ,time-60*1000);
  }
}
