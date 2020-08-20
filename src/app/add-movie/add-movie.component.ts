import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkyModalInstance } from '@skyux/modals';
import { MovieDetails } from '../Models/movie-details';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html'
})
export class AddMovieComponent implements OnInit {
  public formData: FormGroup = new FormGroup({});
  // private instance: SkyModalInstance;
  public movieList2: MovieDetails[] = [];
  constructor(
    private dataService: DataService,
    public instance: SkyModalInstance,
    private formBuilder: FormBuilder
  ) {}
  public ngOnInit(): void {
    this.formData = this.formBuilder.group({
      id: [Date.now()].toString(),
      selected: false,
      movieTitle: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      rating: [
        '',
        [Validators.required, Validators.pattern(/^('|0|1|2|3|4|5|6|7|8|9|')+$/)]
      ]
    });
  }
  public postData() {
    this.dataService.saveData(this.formData.value);
    console.log(this.formData.value);

    this.instance.save();

    // this.dataService.changeMovie(this.formData.value);
    // this.movieList2= this.dataService.getData();

    this.Reset();
  }
  private Reset() {
    this.formData.reset();
  }
}
