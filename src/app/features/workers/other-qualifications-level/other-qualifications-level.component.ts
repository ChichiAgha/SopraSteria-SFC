import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Qualification } from 'src/app/core/model/qualification.model';
import { Worker } from 'src/app/core/model/worker.model';
import { MessageService } from 'src/app/core/services/message.service';
import { QualificationService } from 'src/app/core/services/qualification.service';
import { WorkerEditResponse, WorkerService } from 'src/app/core/services/worker.service';

@Component({
  selector: 'app-other-qualifications-level',
  templateUrl: './other-qualifications-level.component.html',
})
export class OtherQualificationsLevelComponent implements OnInit, OnDestroy {
  public qualifications: Qualification[];
  public form: FormGroup;
  private worker: Worker;
  private workerId: string;
  private subscriptions = [];

  constructor(
    private workerService: WorkerService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private qualificationService: QualificationService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      qualification: [null, Validators.required],
    });

    this.workerId = this.workerService.workerId;

    this.subscriptions.push(
      this.qualificationService.getQualifications().subscribe(qualifications => {
        this.qualifications = qualifications;
      })
    );

    this.subscriptions.push(
      this.workerService.getWorker(this.workerId).subscribe(worker => {
        this.worker = worker;

        if (worker.highestQualification) {
          this.form.patchValue({
            qualification: worker.highestQualification.qualificationId,
          });
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.messageService.clearAll();
  }

  async submitHandler() {
    try {
      await this.saveHandler();

      this.router.navigate(['/worker/summary']);
    } catch (err) {
      // keep typescript transpiler silent
    }
  }

  saveHandler(): Promise<WorkerEditResponse> {
    return new Promise((resolve, reject) => {
      const { qualification } = this.form.controls;
      this.messageService.clearError();

      console.log(this.form.valid, this.form.errors);

      if (this.form.valid) {
        const worker = this.worker || ({} as Worker);
        worker.highestQualification = {
          qualificationId: parseInt(qualification.value, 10),
        };

        this.subscriptions.push(this.workerService.setWorker(worker).subscribe(resolve, reject));
      } else {
        if (qualification.errors.required) {
          this.messageService.show('error', 'Please fill required fields.');
        }

        reject();
      }
    });
  }
}