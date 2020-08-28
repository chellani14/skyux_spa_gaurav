import { Component, OnInit } from '@angular/core';
import { SkyModalInstance } from '@skyux/modals';
import { MovieDetails } from '../Models/movie-details';
import { ColDef, GridOptions, GridApi } from 'ag-grid-community';
import { EditGridModalContext } from '../grid/grid-edit-context';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html'
})
export class AddMovieComponent implements OnInit {
  public columnDefs: ColDef[];
  public gridData: MovieDetails[];
  // private editableColumn: boolean = false;

  // private instance: SkyModalInstance;
  public movieList2: MovieDetails[] = [];
  public gridOptions: GridOptions;
  public gridApi: GridApi;
  public formData: FormGroup;
  public movie: MovieDetails;
  private addOrEdit: string = 'add';
  constructor(
    private dataService: DataService,
    public instance: SkyModalInstance,
    private context: EditGridModalContext,
    private formBuilder: FormBuilder
    ) { }
  public ngOnInit(): void {
    this.gridData = this.context.gridData;
    if (this.gridData[0].movieTitle !== '') {
      console.log('it i working');
      this.formData = this.formBuilder.group({
        id: this.gridData[0].id,
        selected: [this.gridData[0].selected],
        movieTitle: [{value: this.gridData[0].movieTitle, disabled: true}],
        genre: [{value: this.gridData[0].genre, disabled: true}],
        rating: [
          this.gridData[0].rating,
          [
            Validators.required,
            Validators.pattern(/^('|0|1|2|3|4|5|6|7|8|9|')+$/)
          ]
        ]
      });
      this.addOrEdit = 'edit';
    } else {
      this.formData = this.formBuilder.group({
        id: [Date.now()].toString(),
        selected: false,
        movieTitle: ['', [Validators.required]],
        genre: ['', [Validators.required]],
        rating: [
          '',
          [
            Validators.required,
            Validators.pattern(/^('|0|1|2|3|4|5|6|7|8|9|')+$/)
          ]
        ]
      });
    }
  }
  public postData() {
    if (this.addOrEdit === 'add') {
    this.dataService.saveData(this.formData.value);
    alert('Saving Data');
    this.instance.save();
    } else {
      console.log('edit');
      this.dataService.editMovie(this.formData.value);
      alert('Saving Data');
      this.instance.save();
    }
  }
  public closeModal() {
    this.instance.close();
  }
}
