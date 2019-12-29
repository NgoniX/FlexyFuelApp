import { Order } from './../models/order.interface';
import { Card } from './../models/card.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    constructor(public afs: AngularFirestore) { }

    addOrder(
        phone: any,
        fuelType: any,
        litres: any,
        location: any,
        deliveryTime: string,
        paymentMethod: string,
        dateTime: any
    ): Promise<void> {
        const id = this.afs.createId();

        return this.afs.doc(`Orders/${id}`).set({
            id,
            phone,
            fuelType,
            litres,
            location,
            deliveryTime,
            paymentMethod,
            dateTime
        });

    }

    addCard(
        name: any,
        age: any,
        phone: any,
        address: any,
        employmentStatus: string,
        fuelQuantities: string,
        dateTime: any
    ): Promise<void> {
        const id = this.afs.createId();

        return this.afs.doc(`Cards/${id}`).set({
            id,
            name,
            age,
            phone,
            address,
            employmentStatus,
            fuelQuantities,
            dateTime
        });

    }

    getUserID(userid: any) {
        return firebase.firestore().collection('Users').where('uid', '==', userid).get();
    }

    getOrders(): AngularFirestoreCollection<Order> {
        return this.afs.collection(`Orders`);
    }

    getCards(): AngularFirestoreCollection<Card> {
        return this.afs.collection(`Cards`);
    }

}
