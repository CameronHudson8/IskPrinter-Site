import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';
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

  private filteredRegions: Observable<Region[]>;
  private regionId: number;
  private regions: Region[] = regions.sort((region1, region2) => region1.regionName.localeCompare(region2.regionName));
  private regionControl = new FormControl(undefined, Validators.required);

  public orders: Order[];

  public displayedColumns: string[] = [
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
    public authenticatorService: AuthenticatorService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.filteredRegions = this.regionControl.valueChanges
      .pipe(
        startWith(''),
        map((regionName) => this._filterRegions(regionName))
      );
  }

  // Used in the view
  private onRegionSelected(event) {
    this.regionId = event.option.id;
  }

  private _filterRegions(regionName: string): Region[] {
    const filterValue = regionName.toLowerCase();
    return this.regions.filter((r) => r.regionName.toLowerCase().includes(filterValue));
  }

  public async printIsk() {
    console.log('running...');
    this.orders = await this.getMarketOrdersInRegion(this.regionId);
    console.log('done.');
  }

  public async getMarketOrdersInRegion(regionId: number): Promise<Order[]> {
    
    try {

      return new Promise((resolve, reject) => {
        this.http.get(
          `https://esi.evetech.net/latest/markets/${regionId}/orders`,
          { 
            params: { order_type: 'all' },
            observe: 'response'
          }
        )
          .subscribe(
            (response) => {
              const orders: Order[] = (<Order[]>response.body).map((order) => {
                return {
                  ...order,
                  issued: new Date(order.issued)
                }
              });
              return resolve(orders);
            },
            (error) => reject(error)
          );
      });

    } catch (error) {
      console.error(error);
    }

  }

}
