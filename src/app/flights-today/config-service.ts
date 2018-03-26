import { Injectable } from '@angular/core';
import { Config } from 'ngx-easy-table/src/app/ngx-easy-table/model/config';

@Injectable()
export class ConfigService {
  public static config: Config = {
    searchEnabled: true,
    headerEnabled: true,
    orderEnabled: false,
    globalSearchEnabled: false,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: false,
    selectRow: true,
    selectCol: false,
    selectCell: false,
    rows: 10,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false,
    paginationRangeEnabled: true,
  };
}
