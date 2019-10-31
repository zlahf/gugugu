import {Component, OnDestroy} from '@angular/core';
import * as Moment from 'moment';
import {ModalController} from "@ionic/angular";
import {ServiceInfoComponent} from "./service-info/service-info.component";
import {HomeService} from "./home.service";
import {Subscription} from "rxjs";

export interface Service {
    id: string;
    iconName: string;
    name: string;
    startDate: string;
    subscribeModel: string;
    endDate: string;
    leftDate: number;
    leftPercent: number;
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy{

    subscribeServices: Array<Service> = [
        {
            id: 'youtube',
            iconName: 'Y',
            name: '유튜브',
            startDate: '20191011',
            subscribeModel: '유튜브 프리미엄',
            endDate: null,
            leftDate: null,
            leftPercent: 0
        },
        {
            id: 'netflix',
            iconName: 'N',
            name: '넷플릭스',
            startDate: '20191027',
            subscribeModel: 'Netflix Family',
            endDate: null,
            leftDate: null,
            leftPercent: 0
        },
        // {id: 'youtube', iconName: 'Y', name: '유튜브 프리미엄', startDate: '20191011', endDate: null}
    ];

    sub: Subscription;

    constructor(public modalController: ModalController,
                public homeService: HomeService) {
        this.subscribeServices.forEach((service: Service) => {
            let st = Moment(service.startDate);
            let ed = Moment(st).add(1, 'months');

            service.endDate = ed.format('YYYYMMDD');
            service.leftDate = ed.diff(Moment(), 'days') + 1;
            service.leftPercent = service.leftDate / 30;
            console.log(service.leftPercent);
        });

        this.sub = this.homeService.unSubscribeService$.subscribe((service: Service) => {

            this.subscribeServices = this.subscribeServices.filter((f: Service) => {
                return f.id !== service.id;
            });
        });

    }

    async presentModal(service: Service) {
        const modal = await this.modalController.create({
            component: ServiceInfoComponent,
            componentProps: {
                'service': service
            }
        });
        return await modal.present();
    }

    ngOnDestroy(): void {
        if (this.sub) this.sub.unsubscribe();
    }
}
