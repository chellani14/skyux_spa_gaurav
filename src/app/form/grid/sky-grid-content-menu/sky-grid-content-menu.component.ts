import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-sky-grid-content-menu',
  templateUrl: './sky-grid-content-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkyGridContentMenuComponent implements ICellRendererAngularComp {
  private firstname: string;
  private params: ICellRendererParams;

  public agInit(params: ICellRendererParams): void {
    this.params = params;
    this.firstname = this.params.data && this.params.data.firstname;
  }

  public refresh(): boolean {
    return false;
  }

  public actionClicked(action: string): void {
    alert(`${action} clicked for ${this.firstname}`);
  }
}
