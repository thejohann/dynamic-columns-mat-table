import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/**
 * Component class
 */
@Component({
  selector: 'table-pagination-example',
  styleUrls: ['table-pagination-example.css'],
  templateUrl: 'table-pagination-example.html',
})
export class TablePaginationExample {


  @ViewChild(MatPaginator) paginator: MatPaginator;

  even = true;

  /** Schema of the data being served */
  columns: any[] = [];

  /** List of columns being displayed, as per schema */
  displayedColumns: any[] = [];

  /** Current datasource */
  dataSource: ExampleDataSource;

  constructor() {
    this.changeColumns();
  }

  onToggleClicked(): void {
    this.changeColumns();
  }

  /** switch the data source / adapt the columns / build displayedColumns */
  changeColumns(): void {
    console.log("changing columns");
    this.even = !this.even;
    if (this.even) {
      this.dataSource = new ExampleDataSource(json1);
    } else {
      this.dataSource = new ExampleDataSource(json2);
    }
    this.columns = this.dataSource.getColumnsAsync();
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }
}

/**
 * Connects to the API and loads both header and data information
 */
class ExampleDataSource extends DataSource<any> {
  source: any;

  constructor(json: string) {
    super();
    this.source = JSON.parse(json);
  }
  connect(): Observable<Element[]> {
    return Observable.of(this.getDataAsync());
  }

  protected getColumnDefinitions(source: any[]): any[] {
    const data: any[] = [];
    let index = 0;
    for (let element of source) {
      const _index = index++;
      data.push({ 
        columnDef: element.name, 
        header: element.header, 
        cell: (element: any) => `${element[_index].value}` });
    }
    return data;
  }

  /** Calls the API and gets the column definitions async */
  public getColumnsAsync(): any[] {
    return this.getColumnDefinitions(this.source.header);
  }
  
  /** Calls the API and gets the data async */
  private getDataAsync(): any[] {
    return this.source.data;
  }
  disconnect() { }
}

const json1 = `{ 
  "header": [
    { "id": 1, "name": "position", "header": "No." },
    { "id": 2, "name": "name", "header": "Name" },
    { "id": 3, "name": "weight", "header": "Weight" },
    { "id": 4, "name": "symbol", "header": "Symbol" },
    { "id": 5, "name": "translation", "header": "Translation" }
    ],
  "data": [  
    [{"value": 1 }, {"value": "Hydrogen"}, {"value": 1.0079}, {"value": "H"}, {"value": "Fuel"}],
    [{"value": 2 }, {"value": "Helium"}, {"value": 4.0026}, {"value": "He"}, {"value": "Fly"}],
    [{"value": 3 }, {"value": "Lithium"}, {"value": 6.941}, {"value": "Li"}, {"value": "Battery"}],
    [{"value": 4 }, {"value": "Beryllium"}, {"value": 9.0122}, {"value": "Be"}, {"value": "Drunk"}]
    ]
}`;
const json2 = `{ 
  "header": [
    { "id": 1, "name": "position", "header": "No." },
    { "id": 2, "name": "barcode", "header": "Barcode" },
    { "id": 3, "name": "amount", "header": "Amount" },
    { "id": 4, "name": "date", "header": "Date" }
  ], 
  "data": [
    [{"value": 1 }, {"value": "BCHydrogen"}, {"value": 1.0079}, {"value": "2019-03-14"}],
    [{"value": 2 }, {"value": "BCHelium"}, {"value": 4.0026}, {"value": "2019-03-14"}],
    [{"value": 3 }, {"value": "BCLithium"}, {"value": 6.941}, {"value": "2019-03-14"}],
    [{"value": 4 }, {"value": "BCBeryllium"}, {"value": 9.0122}, {"value": "2019-03-14"}],
    [{"value": 5 }, {"value": "BCBeryllium"}, {"value": 3.1415}, {"value": "2019-03-14"}]
  ]
  }`;