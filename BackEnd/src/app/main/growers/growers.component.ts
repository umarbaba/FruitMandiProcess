import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GrowerService } from 'src/app/services/grower.service';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-growers',
  templateUrl: './growers.component.html',
  styleUrls: ['./growers.component.css']
})
export class GrowersComponent implements OnInit {
  url: any
  showAddGrowerDialog = false;
  selectedItem: any;
  showImage = false;
  buttonDisabled = true;
  growerAddFormData;

  ELEMENT_DATA: any = [
    { name: 'Umar Baba', khata: 'Achabal Traders', address: 'Achabal sopore', phoneNo: '9035615830' },
    { name: "Pranoy Sarkar", khata: 'Xyz traders', address: 'marathalli Bangalore', phoneNo: "7006900000" },
    { name: 'Umar Baba', khata: 'Achabal Traders', address: 'Achabal sopore', phoneNo: '9035615830' },
    { name: "Pranoy Sarkar", khata: 'Xyz traders', address: 'marathalli Bangalore', phoneNo: "7006900000" },
    { name: 'Umar Baba', khata: 'Achabal Traders', address: 'Achabal sopore', phoneNo: '9035615830' },
    { name: "Pranoy Sarkar", khata: 'Xyz traders', address: 'marathalli Bangalore', phoneNo: "7006900000" },
    { name: 'Umar Baba', khata: 'Achabal Traders', address: 'Achabal sopore', phoneNo: '9035615830' },
    { name: "Pranoy Sarkar", khata: 'Xyz traders', address: 'marathalli Bangalore', phoneNo: "7006900000" },
    { name: 'Umar Baba', khata: 'Achabal Traders', address: 'Achabal sopore', phoneNo: '9035615830' },
    { name: "Pranoy Sarkar", khata: 'Xyz traders', address: 'marathalli Bangalore', phoneNo: "7006900000" },
    { name: 'Umar Baba', khata: 'Achabal Traders', address: 'Achabal sopore', phoneNo: '9035615830' },
    { name: "Pranoy Sarkar", khata: 'Xyz traders', address: 'marathalli Bangalore', phoneNo: "7006900000" },
  ];
  constructor(private router: Router, private aRoute: ActivatedRoute, private growerService: GrowerService) { }
  displayedColumns: string[] = ['name', 'khata', 'address', 'phoneNo'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  tabSeleted = true
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() { }

  initializeAddGrowerFormData(){
    this.growerAddFormData = new FormGroup({
      name: new FormControl("",Validators.required),
      khata: new FormControl("",Validators.required),
      address: new FormControl("",Validators.required),
      phone:new FormControl("",Validators.required),
      district :new FormControl("",Validators.required),
      zip :new FormControl("",Validators.required),
      image :new FormControl("")
    })
  }
  openAddGrowerDialog() {
    this.showAddGrowerDialog = true;
  }
  closeAddGrowerDialog() {
    this.showAddGrowerDialog = false;
  }
  onSelectItem(item) {
    console.log(item)
    this.selectedItem = item;
    this.buttonDisabled = false;
    this.growerService.setData(this.selectedItem);
  }
  addNew() {
    this.openAddGrowerDialog()
    this.initializeAddGrowerFormData();
  }
  addGrower(name, credit, phone, email) {
    console.log(name)
    let item: any = {}
    item.name = name;
    item.credit = credit;
    item.phone = phone;
    item.email = email;
    this.selectedItem = item;
  }

  openGrowerDetails(item) {
    this.onSelectItem(item)
    this.router.navigate([`${this.selectedItem.name}`], { relativeTo: this.aRoute })
  }

  proceedBuy() {
    this.router.navigate([`${this.selectedItem.name}`], { queryParams: { "selectedItem": this.selectedItem }, relativeTo: this.aRoute })
  }
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      let file = event.target.files[0];

      var reader = new FileReader();
      let that = this;
      reader.onloadend = function () {
        that.url = reader.result;
        that.growerService.url = that.url;
        that.showImage = true
      }
      if (file) {
        reader.readAsDataURL(file);
      } else {
        this.url = "";
      }
      console.log(this.url)
     
    }
  }
  onSubmit(){
    console.log(this.growerAddFormData.value)
    let details = this.growerAddFormData.value;
    let grower:any={}
    grower.name = details.name;
    grower.khata = details.khata;
    grower.address = details.address;
    grower.phoneNo = details.phone;
    this.ELEMENT_DATA.push(grower)
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.closeAddGrowerDialog()
  }  
}

