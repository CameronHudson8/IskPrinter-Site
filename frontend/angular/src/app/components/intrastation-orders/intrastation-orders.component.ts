import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Order } from 'src/app/entities/Order';
import regions from 'src/assets/regions.json';

class Region {
  regionName: string;
  regionId: number;
}

@Component({
  selector: 'app-intrastation-orders',
  templateUrl: './intrastation-orders.component.html',
  styleUrls: ['./intrastation-orders.component.css']
})
export class IntrastationOrdersComponent implements OnInit {

  private readonly regions: Region[] = regions.sort((region1, region2) => region1.regionName.localeCompare(region2.regionName));

  filteredRegions: Observable<Region[]>;
  regionId: number;
  regionControl = new FormControl(undefined, Validators.required);

  orders: Order[];

  displayedColumns: string[] = [
    'duration',
    'is_buy_order',
    'issued',
    'location_id',
    'min_volume',
    'order_id',
    'price',
    'range',
    'system_id',
    'type_id',
    'volume_remain',
    'volume_total',
  ];

  constructor(
    private http: HttpClient,
    authenticatorService: AuthenticatorService,
    public loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.filteredRegions = this.regionControl.valueChanges
      .pipe(
        startWith(''),
        map((regionName) => this._filterRegions(regionName))
      );
  }

  // Used in the view
  onRegionSelected(event) {
    this.regionId = event.option.id;
  }

  private _filterRegions(regionName: string): Region[] {
    const filterValue = regionName.toLowerCase();
    return this.regions.filter((r) => r.regionName.toLowerCase().includes(filterValue));
  }

  async printIsk() {
    console.log('running...');
    this.orders = await this.getMarketOrdersInRegion(this.regionId);
    console.log('done.');
  }

  async getMarketOrdersInRegion(regionId: number): Promise<Order[]> {

    try {
      const response = await this.http.get(
        `https://esi.evetech.net/latest/markets/${regionId}/orders`,
        {
          params: { order_type: 'all' },
          observe: 'response'
        }
      ).toPromise();

      const orders = (<Order[]>response.body).map((order) => ({
        ...order,
        issued: new Date(order.issued)
      }));
      return orders;

    } catch (error) {
      console.error(error);
    }

  }

}
