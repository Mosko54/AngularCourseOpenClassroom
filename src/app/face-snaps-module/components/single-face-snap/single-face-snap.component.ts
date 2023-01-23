import { Component, Input , OnInit} from '@angular/core';
import { FaceSnapsService } from 'src/app/core/services/face-snaps.services';
import { FaceSnap } from 'src/app/core/models/face-snap.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnap;
  faceSnap$!: Observable<FaceSnap>;

  snapButtonText!: "Oh Snap!" | "Oops, unSnap!";

  constructor(private faceSnapsService: FaceSnapsService, 
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.snapButtonText = "Oh Snap!";
    const snapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(snapId);
  }

  onAddSnap(faceSnapId: number) {
    if (this.snapButtonText === "Oh Snap!"){
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(() => {
          this.snapButtonText = 'Oops, unSnap!'
        })
      );
    } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
        tap(() => {
          this.snapButtonText = 'Oh Snap!'
        })
      );
    }
  }
}
