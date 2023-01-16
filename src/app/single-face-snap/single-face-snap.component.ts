import { Component, Input , OnInit} from '@angular/core';
import { FaceSnapsService } from '../services/face-snaps.services';
import { FaceSnap } from '../models/face-snap.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnap;

  isSnapped = false;
  snapButtonText = "Oh Snap!";

  constructor(private faceSnapsService: FaceSnapsService, 
              private route: ActivatedRoute) {}

  ngOnInit() {
    const snapId = +this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(snapId);
  }

  onAddSnap() {
    if (!this.isSnapped){
      this.faceSnapsService.snapFaceSnap(this.faceSnap.id, 'snap');
      this.isSnapped = true;
      this.snapButtonText = "Oops, unSnap!";
    } else {
      this.faceSnapsService.snapFaceSnap(this.faceSnap.id, 'unsnap');
      this.isSnapped = false;
      this.snapButtonText = "Oh Snap!";
    }
  }
}
