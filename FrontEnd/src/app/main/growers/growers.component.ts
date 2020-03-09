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
  addGrower = false;
  showGrowerDialog = false;
  selectedGrowerID: any = null
  selectedItem: any;
  showImage = false;
  buttonDisabled = true;
  growerFormData;

  ELEMENT_DATA: any = [
    { name: 'Umar Baba', khata: 'Achabal Traders', address: 'Achabal sopore', phone: '9035615830' },
    { name: "Pranoy Sarkar", khata: 'Xyz traders', address: 'marathalli Bangalore', phone: "7006900000" },
    { name: 'Umar Baba', khata: 'Achabal Traders', address: 'Achabal sopore', phone: '9035615830' },
    { name: "Bapi Das", khata: 'Xyz traders', address: 'marathalli Bangalore', phone: "7006900000" },
    { name: 'Umar Baba', khata: 'Achabal Traders', address: 'Achabal sopore', phone: '9035615830' },
    { name: "Pranoy Sarkar", khata: 'Xyz traders', address: 'marathalli Bangalore', phone: "7006900000" },
    { name: 'Umar Baba', khata: 'Achabal Traders', address: 'Achabal sopore', phone: '9035615830' },
    { name: "Bapi Das", khata: 'Xyz traders', address: 'marathalli Bangalore', phone: "7006900000" },
    { name: 'Umar Baba', khata: 'Achabal Traders', address: 'Achabal sopore', phone: '9035615830' },
    { name: "Pranoy Sarkar", khata: 'Xyz traders', address: 'marathalli Bangalore', phone: "7006900000" },
    { name: 'Umar Baba', khata: 'Achabal Traders', address: 'Achabal sopore', phone: '9035615830' },
    { name: "Bapi Das", khata: 'Xyz traders', address: 'marathalli Bangalore', phone: "7006900000" },
  ];
  constructor(private router: Router, private aRoute: ActivatedRoute, private growerService: GrowerService) { }
  displayedColumns: string[] = ['name', 'khata', 'address', 'phone', 'action'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  tabSeleted = true
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.initializeAddGrowerFormData();
    this.addUniqueIds()
  }
  addUniqueIds() {
    this.ELEMENT_DATA = this.ELEMENT_DATA.map(element => {
      element['id'] = this.growerService.getUniqueId();
      return element;
    });
  }
  initializeAddGrowerFormData() {
    this.growerFormData = new FormGroup({
      name: new FormControl("", Validators.required),
      khata: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      district: new FormControl("", Validators.required),
      zip: new FormControl("", Validators.required),
      image: new FormControl("")
    })
  }

  onSelectItem(item) {
    console.log(item)
    this.selectedItem = item;
    this.buttonDisabled = false;
    this.growerService.setData(this.selectedItem);
  }
  addNew() {
    this.openAddGrowerDialog()
    this.initializeAddGrowerFormData()

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
  onSubmit() {
    console.log(this.growerFormData.value)
    let details = this.growerFormData.value;
    if (this.addGrower) {

      let grower: any = {}
      grower.name = details.name;
      grower.khata = details.khata;
      grower.address = details.address;
      grower.phone = details.phone;
      grower.district = details.district;
      grower.zip = details.zip;
      grower.id = this.growerService.getUniqueId();
      this.ELEMENT_DATA.push(grower);
    }
    else {
      let index = this.ELEMENT_DATA.findIndex((obj: any) =>  obj.id == this.selectedGrowerID )
      if (index > -1) {
        this.ELEMENT_DATA[index] = Object.assign({}, details)
      }
    }


    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.closeGrowerDialog()
  }
  onEdit(element) {
    console.log(element)
    this.selectedGrowerID = element.id
    this.openUpdateGrowerDialog()
    this.growerFormData.get('name').setValue(element.name)
    this.growerFormData.get('khata').setValue(element.khata)
    this.growerFormData.get('address').setValue(element.address)
    this.growerFormData.get('phone').setValue(element.phone)
    this.growerFormData.get('district').setValue(element.district)
    this.growerFormData.get('zip').setValue(element.zip)


  }
  openUpdateGrowerDialog() {
    this.showGrowerDialog = true
  }
  openAddGrowerDialog() {
    this.showGrowerDialog = true
    this.addGrower = true;
  }
  closeGrowerDialog() {
    this.showGrowerDialog = false;
    this.addGrower = false;
  }

}

