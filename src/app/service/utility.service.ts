import { Injectable } from '@angular/core';


@Injectable()
export class UtilityService {
   public getQueryParams(url: string) {
        const regex = /[?&]([^=#]+)=([^&#]*)/g;
        const params = {};
        let match;
        // tslint:disable-next-line:no-conditional-assignment
        while (match = regex.exec(url)) {
            params[match[1]] = match[2];
        }
        return params;
    }

    public isTokenRefreshValid(route: string) {
        const regex = /message\/\d+$/g;
        return !regex.test(route);
    }
}
