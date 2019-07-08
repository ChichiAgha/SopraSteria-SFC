import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-eligibility-icon',
  templateUrl: './eligibility-icon.component.html',
})
export class EligibilityIconComponent implements OnInit {
  @Input() eligible: boolean;

  public icon: string;
  public label: string;

  ngOnInit() {
    this.icon = this.eligible ? 'tick' : 'cross';
    this.label = this.eligible ? 'Meeting requirements' : 'Not meeting requirements';
  }
}