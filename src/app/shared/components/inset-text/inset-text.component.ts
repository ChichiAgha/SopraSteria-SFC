import { Component, Input } from '@angular/core';

enum Status {
  TODO = 'todo',
  SUCCESS = 'success',
}

@Component({
  selector: 'app-inset-text',
  templateUrl: './inset-text.component.html',
})
export class InsetTextComponent {
  @Input() color: Status;
  constructor() {}
}
