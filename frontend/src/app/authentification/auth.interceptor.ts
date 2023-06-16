import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError} from "rxjs/operators";
import { TokenService } from "../services/token.service";
import { Router } from "@angular/router";
import { createInjectableType } from "@angular/compiler";
import { Injectable } from "@angular/core";
//const TOKEN_HEADER_KEY = 'Authorization'
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private tokenService:TokenService, private router:Router) {}
    intercept(
        request: HttpRequest<unknown>, 
        next: HttpHandler
        ): Observable<HttpEvent<unknown>> {

           /* let authReq = request
            const token = this.tokenService.getToken()
            if(token != null){
                authReq = request.clone({headers : request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)})
            }
            return next.handle(authReq)
          if (request.headers.get('No-Auth') === 'True'){
            return next.handle(request.clone())
        }*/
        const token = this.tokenService.getToken()
        this.addToken(request,token)
        return next.handle(request).pipe(
            catchError(
                (err:HttpErrorResponse) => {
                    console.log(err.status)
                    if(err.status === 401){
                        this.router.navigate(['/login'])
                    }
                 /*   else if(err.status === 403){
                        this.router.navigate(['/notFount'])
                    }*/
                   return throwError("some thing is wrong");
                }
                
            )
        );    
    }
    addToken(request:HttpRequest<any>, token:string|null){
        return request.clone(
            {
                setHeaders: {
                    Authorization : 'Bearer '+ token
                }
            }
        )
    }  
}
/*export const authInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
]*/