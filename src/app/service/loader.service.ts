import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// @dynamic
@Injectable({ providedIn: 'root' })
export class LoaderService {
    static instance: LoaderService;
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // tslint:disable-next-line:variable-name
    private _loading = false;

    constructor() {
      return LoaderService.instance = LoaderService.instance || this;
    }

    display(value: boolean) {
        this.status.next(value);
    }

    /* New loading service with Interceptor of HTTP request by singleton class */
    get loading(): boolean {
        return this._loading;
    }

    set loading(value) {
        this._loading = value;
        this.status.next(value);
    }

    startLoading() {
        this.loading = true;
    }

    stopLoading() {
        this.loading = false;
    }
}
