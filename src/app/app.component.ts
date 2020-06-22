import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import L from 'leaflet';
import { UBikeService } from './ubike';
import cityName from '../assets/cityName.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  OSMap: L.Map;
  form = this.fb.group({
    city: [null],
    dist: [null],
  });

  readonly cityName = cityName;

  constructor(private fb: FormBuilder, private ubikeService: UBikeService) {}

  ngOnInit() {
    this.form.get('dist').valueChanges.subscribe(({ latitude, longitude, name }) => {
      this.OSMap.panTo([latitude, longitude]);

      this.OSMap.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.OSMap.removeLayer(layer);
        }
      });

      for (const ubike of this.ubikeService.data) {
        if (ubike.sarea !== name) {
          continue;
        }

        L.marker([+ubike.lat, +ubike.lng])
          .bindPopup(
            `<p><strong style="font-size: 20px;">${ubike.sna}</strong></p>
        <strong style="font-size: 16px; color: #d45345;">可租借車輛剩餘：${ubike.sbi} 台</strong><br>
        可停空位剩餘: ${ubike.bemp}<br>
        <small>最後更新時間: ${ubike.mday}</small>`,
          )
          .addTo(this.OSMap);
      }
    });
  }

  ngAfterViewInit() {
    this.OSMap = L.map('mapid', {
      center: [25.041956, 121.508791],
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
    }).addTo(this.OSMap);
  }
}
