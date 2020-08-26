import {
  Component, OnInit
} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html'
})
export class LocalizationComponent implements OnInit {
  constructor(private dataService: DataService) {}

  public ngOnInit() {
    this.defaultLanguage();
  }
  public hindiClick(locale: string) {
    this.dataService.localizationString(locale);
  }
  private defaultLanguage() {
    this.dataService.localizationString('en_US');
  }
}
