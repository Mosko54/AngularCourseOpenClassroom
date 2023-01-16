import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class FaceSnapsService {
    faceSnaps: FaceSnap[] = [
        {
            id: 1,
            title: 'Archibald',
            description: 'Mon meilleur ami depuis tout petit !',
            imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
            createdDate: new Date(),
            snaps: 0,
            location: 'Paris'
        },
        {
            id: 2,
            title: 'Three Rock Mountain',
            description: 'Un endroit magnifique pour les randonnées.',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Three_Rock_Mountain_Southern_Tor.jpg/2880px-Three_Rock_Mountain_Southern_Tor.jpg',
            createdDate: new Date(),
            snaps: 160,
            location: 'la montagne'
        },
        {
            id: 3,
            title: 'Un bon repas',
            description: 'Mmmh que c\'est bon !',
            imageUrl: 'https://wtop.com/wp-content/uploads/2020/06/HEALTHYFRESH.jpg',
            createdDate: new Date(),
            snaps: 0
        }];

    getAllFaceSnaps(): FaceSnap[] {
        return this.faceSnaps;
    }

    getFaceSnapById(faceSnapId: number): FaceSnap {
        const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
        if(faceSnap)
        {   
            return faceSnap;
        }else throw new Error('FaceSnap not found!');
    }

    snapFaceSnap(faceSnapId: number, snapType: 'snap' | 'unsnap'): void {
        const faceSnap = this.getFaceSnapById(faceSnapId);
        if (snapType === 'snap' && faceSnap)
        {
            faceSnap.snaps++;
        } else if (faceSnap){
            faceSnap.snaps--;
        }
    }

    addFaceSnap(formSnap: FormGroup): void {
        const newFaceSnap: FaceSnap = {
            id: this.faceSnaps[this.faceSnaps.length - 1].id + 1,
            title: formSnap.value.title,
            description: formSnap.value.description,
            imageUrl: formSnap.value.imageUrl,
            createdDate: new Date(),
            snaps: 0,
            location: formSnap.value.location
        };
        this.faceSnaps.push(newFaceSnap);
    }

    // snapById(snapId: number): void {
    //     let faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === snapId);
    //     if (faceSnap) {
    //         faceSnap.snaps++;
    //     } else {
    //         throw new Error('Facesnap not found!');
    //     }
    // }
}

