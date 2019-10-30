import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {Service} from "../home.page";
import * as Moment from 'moment';

@Component({
    selector: 'app-service-info',
    templateUrl: './service-info.component.html',
    styleUrls: ['./service-info.component.scss'],
})
export class ServiceInfoComponent implements OnInit {

    @Input() service: Service;
    formattedLeftDay: string;
    startDate: string;
    useAlam = false;

    constructor(public modalController: ModalController,
                public navParams: NavParams) {
    }

    ngOnInit() {
        const service: Service = this.navParams.get('service');
        this.formattedLeftDay = Moment(service.endDate).format('MM월 DD일');
        this.startDate = Moment(service.startDate).format('YYYY-MM-DD');
    }


    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalController.dismiss({
            'dismissed': true
        });
    }
}
