import { Injectable } from '@angular/core';
import { Config } from 'ngx-easy-table/src/app/ngx-easy-table/model/config';

@Injectable()
export class ConfigServiceExtra {
  public static config: Config = {
    searchEnabled: false,
    headerEnabled: true,
    orderEnabled: false,
    globalSearchEnabled: true,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: true,
    selectRow: true,
    selectCol: false,
    selectCell: false,
    rows: 5,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false,
    paginationRangeEnabled: true,
    collapseAllRows: false,
    checkboxes: false
  };
}
