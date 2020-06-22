import { Injectable } from '@angular/core';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, tap } from 'rxjs/operators';

export interface UBikeApiResponse {
  retCode: number;
  retVal: RetVal;
}

export interface RetVal {
  [key: string]: UBike;
}

export interface UBike {
  sno: string;
  sna: string;
  tot: string;
  sbi: string;
  sarea: string;
  mday: string;
  lat: string;
  lng: string;
  ar: string;
  sareaen: string;
  snaen: string;
  aren: string;
  bemp: string;
  act: string;
}

@Injectable({ providedIn: 'root' })
export class UBikeService {
  data: UBike[];

  constructor() {}

  init() {
    return ajax('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json')
      .pipe(
        map<AjaxResponse, UBikeApiResponse>((res) => res.response),
        map(({ retVal }) => Object.entries(retVal).map(([, value]) => value)),
        tap((ubikes) => (this.data = ubikes)),
      )
      .toPromise();
  }
}
