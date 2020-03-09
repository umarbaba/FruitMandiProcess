import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GrowerService {
    private currentSelectedGrower: any;
    url:any
    constructor() { }
    getUniqueId(){
        return Math.random().toString(36).substring(2) + this.getDate()
    }
    getDate() {
        return Date.now();
      }
    setData(item) {
        this.currentSelectedGrower = item;
    }
    getData() {
        return this.currentSelectedGrower;
    }
    addTransaction(transaction) {
        this.transactions.push(transaction)
    }

    getTransactions(){
        return this.transactions
    }

    transactions = [
        {
            gid: '1200001',
            noOfBoxes: 300,
            pricePerBox: 260,
            totalAmount: 78000,
            prevBal: -10000,
            paidOnDelivery: 2000,
            currentBal: 66000,
            date:"Thu Jan 01 2020 21:59:55 GMT+0530 (India Standard Time)"
        },
        {
            gid: '1200002',
            noOfBoxes: 100,
            pricePerBox: 260,
            totalAmount: 26000,
            prevBal: -10000,
            currentBal: 11000,
            paidOnDelivery: 5000,
            date:"Thu Jan 02 2020 21:59:55 GMT+0530 (India Standard Time)"

        },
        {
            gid: '1200001',
            noOfBoxes: 100,
            pricePerBox: 100,
            totalAmount: 10000,
            prevBal: 66000,
            paidOnDelivery: 2000,
            currentBal: 74000,
            date:"Thu Jan 02 2020 21:59:55 GMT+0530 (India Standard Time)"

        },
    ]
}