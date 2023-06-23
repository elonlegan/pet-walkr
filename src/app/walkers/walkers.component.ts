import { Component } from '@angular/core';
import { WalkerService } from '@app/services/walker.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-walkers',
  templateUrl: './walkers.component.html',
  styleUrls: ['./walkers.component.scss'],
})
export class WalkersComponent {
  walkers: any[];

  constructor(private walkerService: WalkerService) {}

  ngOnInit() {
    this.walkerService
      .getAll()
      .pipe(first())
      .subscribe((walkers) => (this.walkers = walkers));
  }
}
