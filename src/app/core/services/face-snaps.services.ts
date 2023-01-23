import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, concatMap, map, switchMap, tap } from 'rxjs';

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
    
    constructor(private http: HttpClient) {}

    getAllFaceSnaps(): Observable<FaceSnap[]> {
        return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
    }

    getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
        // const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
        // if(faceSnap)
        // {   
        //     return faceSnap;
        // }else throw new Error('FaceSnap not found!');
        return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
    }

    snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
        return this.getFaceSnapById(faceSnapId).pipe(
            map(faceSnap => ({
                ...faceSnap,//on reprend l'objet faceSnap tel quel
                snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)//mais ici on vient modifier la propriété snaps
            })),//l'opérateur map ici modifie seulement le nombre de snaps par 1 suivant le type "unsnap" ou "snap"
            concatMap(updatedFaceSnap => this.http.put<FaceSnap>(
                `http://localhost:3000/facesnaps/${faceSnapId}`,
                updatedFaceSnap)
            ));

        
        // const faceSnap = this.getFaceSnapById(faceSnapId);
        // if (snapType === 'snap' && faceSnap)
        // {
        //     faceSnap.snaps++;
        // } else if (faceSnap){
        //     faceSnap.snaps--;
        // }
    }

    addFaceSnap(formSnap: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
        return this.getAllFaceSnaps().pipe(
            map(facesnaps => [...facesnaps].sort((a,b) => a.id - b.id)),
            map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
            map(previousFacesnap => ({
                ...formSnap,
                snaps: 0,
                createdDate: new Date(),
                id: previousFacesnap.id + 1
            })),
            switchMap(newFacesnap => this.http.post<FaceSnap>(
                'http://localhost:3000/facesnaps',
                newFacesnap)
            )
        )      
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

