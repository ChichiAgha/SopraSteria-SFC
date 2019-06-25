import { Component, Input, OnInit } from '@angular/core';
import { Qualification } from '@core/model/qualification.model';
import { Worker } from '@core/model/worker.model';
import { DialogService } from '@core/services/dialog.service';
import { WorkerService } from '@core/services/worker.service';
import {
  DeleteQualificationDialogComponent,
} from '@features/workers/delete-qualification-dialog/delete-qualification-dialog.component';
import * as moment from 'moment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
})
export class QualificationsComponent implements OnInit {
  @Input() worker: Worker;
  public lastUpdated: moment.Moment;
  public qualifications: Qualification[];

  constructor(private workerService: WorkerService, private dialogService: DialogService) {}

  ngOnInit() {
    this.fetchAllRecords();
  }

  deleteQualification(record, event) {
    event.preventDefault();
    const dialog = this.dialogService.open(DeleteQualificationDialogComponent, {
      nameOrId: this.worker.nameOrId,
      record,
    });
    dialog.afterClosed.pipe(take(1)).subscribe(confirm => {
      if (confirm) {
        this.workerService.deleteQualification(this.worker.uid, record.uid).subscribe(() => {
          this.workerService.alert = { type: 'success', message: 'Qualification has been deleted' };
          this.fetchAllRecords();
        });
      }
    });
  }

  fetchAllRecords() {
    this.workerService.getQualifications(this.worker.uid).subscribe(data => {
      this.lastUpdated = moment(data.lastUpdated);
      this.qualifications = data.qualifications;
    });
  }
}
