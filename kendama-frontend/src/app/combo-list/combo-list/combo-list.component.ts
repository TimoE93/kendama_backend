import { Component, OnInit } from '@angular/core';
import { ComboService } from './../combo.service';

@Component({
  selector: 'app-combo-list',
  templateUrl: './combo-list.component.html',
  styleUrls: ['./combo-list.component.css']
})
export class ComboListComponent implements OnInit {

  combo = [];
  constructor(private comboService: ComboService) { }

  ngOnInit(): void {}

  getCombo(difficulty, numberOfTricks){
    this.comboService.getCombo(difficulty, numberOfTricks).subscribe(combo => {
      console.log(combo);
      this.combo = combo});
  }

  test(){
    console.log('Testbutton');
  }

}
