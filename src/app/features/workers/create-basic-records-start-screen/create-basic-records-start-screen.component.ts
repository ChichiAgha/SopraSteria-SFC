import { Component } from '@angular/core';
import { BackService } from '@core/services/back.service';

@Component({
	selector: 'app-create-basic-records-start-screen',
	templateUrl: './create-basic-records-start-screen.component.html',
})
export class CreateBasicRecordsStartScreenComponent {
	constructor(
		private backService: BackService
	) {
	}

	ngOnInit() {
		this.backService.setBackLink({ url: ['/dashboard'], fragment: 'staff-records' });
	}
}
