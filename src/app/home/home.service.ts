import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Service} from "./home.page";

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    unSubscribeService = new Subject<Service>();
    unSubscribeService$ = this.unSubscribeService.asObservable();

    fireUnscribeService(service: Service) {
        this.unSubscribeService.next(service);
    }
}
