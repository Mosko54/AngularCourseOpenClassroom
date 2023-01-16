import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.services';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;
  // title!: string;
  // description!: string;
  // createdDate!: Date;
  // snaps!: number;
  // imageUrl!: string;
  isSnapped = false;
  snapButtonText = "Oh Snap!";

  constructor(private faceSnapsService: FaceSnapsService,
              private router: Router) {}

  ngOnInit() {
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

  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }
}

