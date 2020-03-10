import { Component, OnInit } from '@angular/core';
import { GrowerService } from 'src/app/services/grower.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';


export interface Transaction {
  item: string;
  price: number;
  qty: number;
  total: number
}

@Component({
  selector: 'app-grower',
  templateUrl: './grower.component.html',
  styleUrls: ['./grower.component.css']
})
export class GrowerComponent implements OnInit {

  openPayAmountDialogue = false;
  openTransactionDialogue = false;
  openTransactionDetailsDialogue = false;

  showItemDetails = false;
  highlightStep1 = true
  highlightStep2 = false
  highlightStep3 = false
  step1 = false;
  step2 = false;
  step3 = false;
  rows = [];
  remBal;
  totalAmount = 0;
  payableAmount = 0;
  activeView = "left";
  standardUpdateForm;
  currentTransaction
  currentGrower = {
    'name': 'umar baba',
    'address': 'Achabal Sopore Kashmir 193201',
    'khata': 'Achabal Traders',
    'phone': '+91 9035 615830',
    'balance': -390000,
    'pan': 'CBFPB3544L',

  }

  transactions = [{
    "id": "kas434j3h4kjh34kj3h",
    "date": "15-03-2019",
    "no_of_boxes": 300,
    "billed_amount": 90000,
    "prev_bal": -390000,
    "current_bal": -300000,
    items: [{
      "item_name": "Delicious no 1",
      "qty": 200,
      "price": 300
    }, {
      "item_name": "Delicious no 2",
      "qty": 200,
      "price": 300
    }]
  },
  {
    "id": "2jg2h3g2jh3ggjhgjhg",
    "date": "17-03-2019",
    "no_of_boxes": 200,
    "billed_amount": 50000,
    "prev_bal": -300000,
    "current_bal": -250000,
    items: [{
      "item_name": "Kesar no 1",
      "qty": 100,
      "price": 300
    }, {
      "item_name": "Kesar no 2",
      "qty": 100,
      "price": 200
    }]
  },
  {
    "id": "1etr3t3rt3rt3rt34g",
    "date": "23-07-2019",
    "no_of_boxes": 300,
    "billed_amount": 150000,
    "prev_bal": -250000,
    "current_bal": -100000,
    items: [{
      "item_name": "Amrican no 1",
      "qty": 200,
      "price": 600
    }, {
      "item_name": "Amrican no 2",
      "qty": 100,
      "price": 300
    }]
  },
  {
    "id": "43hjhg4jh456g5jh6g46vh4",
    "date": "17-08-2019",
    "no_of_boxes": 400,
    "billed_amount": 200000,
    "prev_bal": -100000,
    "current_bal": 100000,
    items: [{
      "item_name": "Delicious no 1",
      "qty": 200,
      "price": 700
    }, {
      "item_name": "Delicious no 2",
      "qty": 100,
      "price": 200
    }, {
      "item_name": "Delicious 4 tah",
      "qty": 100,
      "price": 400
    }]
  },
  ]
  profileImage: any
  displayedColumns = ['item', 'price', 'qty', 'total'];
  dataSource: Transaction[] = []

  constructor(private growerService: GrowerService,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.aRoute.params.subscribe(params => {
      console.log(params)
      //this.currentGrower = params.growerName;

    })
  }
  initItemsTemplate(item?, price?, qty?) {
    return this.fb.group({
      item: [item || '', Validators.required],
      price: [price || '', Validators.required],
      qty: [qty || '', Validators.required]
    })
  }
  ngOnInit() {
    //this.currentGrower = this.growerService.getData();
    this.remBal = this.currentGrower.balance;
    console.log(this.currentGrower);
    this.rows.push({
      "item": null,
      "price": null,
      "qty": null
    })
    this.standardUpdateForm = this.fb.group({
      versionList: this.fb.array([
        this.initItemsTemplate()
      ]),
      commisionField: ['', Validators.required]
    })
    //this.totalBal = this.prevBal;   
    //this.growerTransactions = this.growerService.getTransactions();
    this.profileImage = this.growerService.url;
  }
  calculateRemBal(amountPayingNow: number) {

    this.remBal = this.currentGrower.balance - amountPayingNow;
  }
  openPayDialogue() {
    this.openPayAmountDialogue = true;
  }
  closePayDialogue() {
    this.openPayAmountDialogue = false;
  }
  payAmount() {
    this.currentGrower.balance = this.remBal;
    this.closePayDialogue();
  }
  openAddTransactionDialogue() {
    this.openTransactionDialogue = true;
  }
  closeTransactionPopup() {
    this.openTransactionDialogue = false;
  }

  showItemDetailsView() {
    this.showItemDetails = true;
  }
  onVerifyDetails() {
    this.showItemDetailsView()
    let commision = this.standardUpdateForm.controls.commisionField.value;
    this.payableAmount = this.totalAmount - (this.totalAmount * commision / 100)
  }
  changeView() {
    console.log(this.standardUpdateForm)
    if (this.activeView == 'left') {
      this.activeView = "middle";
      this.step1 = true;
      this.highlightStep1 = false;
      this.highlightStep2 = true;
      this.highlightStep3 = false;

    }
    else if (this.activeView == 'middle') {
      this.activeView = "right";
      this.step2 = true;
      this.highlightStep1 = false;
      this.highlightStep2 = false;
      this.highlightStep3 = true;
      this.calculateTotalAmount()
    }
  }
  addRow() {
    this.rows.push({
      "item": null,
      "price": null,
      "qty": null
    })

  }
  setDataSource() {
    let data = []
    this.standardUpdateForm.controls.versionList.controls.forEach(element => {
      let tempItem = {}
      tempItem["item"] = element.value.item;
      tempItem["price"] = element.value.price;
      tempItem["qty"] = element.value.qty;
      tempItem["total"] = element.value.price * element.value.qty;
      data.push(tempItem)
    })
    this.dataSource = data
  }
  calculateTotalAmount() {
    this.setDataSource()
    this.totalAmount = 0;
    this.standardUpdateForm.controls.versionList.controls.forEach(item => {
      let itemAmount = item.value.price * item.value.qty
      this.totalAmount += itemAmount
    });
    let commision = this.standardUpdateForm.controls.commisionField.value || 12;
    this.payableAmount = this.totalAmount - (this.totalAmount * commision / 100)
  }

  changeViewReverse() {
    if (this.activeView == "right") {
      this.activeView = "middle"
      this.step2 = false;
      this.highlightStep1 = false;
      this.highlightStep2 = true;
      this.highlightStep3 = false;
    }
    else if (this.activeView == "middle") {
      this.activeView = "left";
      this.step1 = false;
      this.highlightStep1 = true;
      this.highlightStep2 = false;
      this.highlightStep3 = false;
    }
  }
  addNewVersion() {
    const control = <FormArray>this.standardUpdateForm.get('versionList');
    control.push(this.initItemsTemplate());
  }
  removeVersion(index) {
    const control = <FormArray>this.standardUpdateForm.get('versionList');
    control.removeAt(index)
  }
  viewTransactionDetails(transactionData) {
    console.log(transactionData)
    this.openTransactionDetailsDialogue = true;
    this.currentTransaction = transactionData
  }
  closeTransactionDetailsPopup(){
    this.openTransactionDetailsDialogue = false;
  }

}
