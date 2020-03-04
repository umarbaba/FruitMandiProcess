import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrowerService } from 'src/app/services/grower.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  currentGrower: any;
  totalAmount: number = 0;
  prevBal:number;  
  noOfBoxes: number ;
  pricePerBox: number ;
  totalBal:number = 0;
  remBal:number = 0;
  displayPopup:boolean = false;
  paidOnTransaction:number =0;
  growerTransactions :any

  constructor(private aRoute: ActivatedRoute,private growerService:GrowerService) {
    this.aRoute.params.subscribe(params => {
      console.log(params)
    })
    this.aRoute.queryParams.subscribe(queryParams => {
      console.log(queryParams)
    })
  }

  ngOnInit() {
    this.currentGrower = this.growerService.getData();
    this.prevBal = this.currentGrower.balance; 
    this.totalBal = this.prevBal;   
    this.growerTransactions = this.growerService.getTransactions();
    console.log(this.currentGrower)
  }

  calculateAmount(noOfBoxes, pricePerBox) {

    this.noOfBoxes = noOfBoxes.value;
    this.pricePerBox = pricePerBox.value;
    if (this.noOfBoxes != undefined && this.pricePerBox != undefined) {
      this.totalAmount = this.noOfBoxes * this.pricePerBox;
      this.totalBal = this.totalAmount + this.prevBal;
      this.remBal = this.totalBal
    }
  }
  proceedTransaction(){
    this.displayPopup = true;
  }
  hidePopup(){
    this.displayPopup = false;
  }

  calculateRemBal(amountPayingNow:number){

    this.paidOnTransaction = amountPayingNow;
   this.remBal = this.totalBal - amountPayingNow;
  }
  clear(){
    this.noOfBoxes = undefined;
    this.pricePerBox = undefined;
    this.totalAmount = undefined;
    this.remBal = 0
    this.totalBal = this.prevBal;
    this.totalAmount = 0;
  }
  completeTransaction(){
    let currentTransaction:any ={}
      currentTransaction.gid = this.currentGrower.gid;
      currentTransaction.noOfBoxes = this.noOfBoxes;
      currentTransaction.pricePerBox = this.pricePerBox;
      currentTransaction.totalAmount = this.totalAmount;
      currentTransaction.prevBal = this.prevBal;
      currentTransaction.currentBal = this.remBal;
      currentTransaction.paidOnDelivery = this.paidOnTransaction;
      currentTransaction.date = Date();
      this.currentGrower.balance= this.remBal;
      this.prevBal = this.currentGrower.balance

      this.growerService.addTransaction(currentTransaction);
      this.displayPopup = false;
      this.clear()
  }
  

}
