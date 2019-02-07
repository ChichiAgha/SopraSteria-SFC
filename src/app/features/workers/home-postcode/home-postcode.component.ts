import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"

import { MessageService } from "../../../core/services/message.service"
import { WorkerService, WorkerEditResponse } from "../../../core/services/worker.service"
import { Worker } from "../../../core/model/worker.model"
import { POSTCODE_PATTERN } from "../../../core/constants/constants"


@Component({
  selector: 'app-home-postcode',
  templateUrl: './home-postcode.component.html'
})
export class HomePostcodeComponent implements OnInit, OnDestroy {

  constructor(
    private workerService: WorkerService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.saveHandler = this.saveHandler.bind(this)
  }

  form: FormGroup

  private subscriptions = []
  private worker: Worker
  private workerId: string

  async submitHandler() {
    try {
      await this.saveHandler()
      this.router.navigate([`/worker/gender/${this.workerId}`])

    } catch (err) {
      // keep typescript transpiler silent
    }
  }

  saveHandler() {
    return new Promise((resolve, reject) => {
      const { postcode } = this.form.controls
      this.messageService.clearError()

      if (this.form.valid) {
        this.worker.postcode = postcode.value
        this.subscriptions.push(this.workerService.setWorker(this.worker).subscribe(resolve, reject))

      } else {
        if (postcode.errors.validPostcode) {
          this.messageService.show("error", "Invalid postcode.")

        } else {
          this.messageService.show("error", "Please fill the required fields.")
        }

        reject()
      }
    })
  }

  postcodeValidator(control: AbstractControl) {
    return !control.value || POSTCODE_PATTERN.test(control.value) ? null : { validPostcode: true }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      postcode: [null, this.postcodeValidator]
    })

    const params = this.route.snapshot.paramMap
    this.workerId = params.has("id") ? params.get("id") : null

    if (this.workerId) {
      this.subscriptions.push(
        this.workerService.getWorker(this.workerId).subscribe(worker => {
          this.worker = worker

          if (worker.postcode) {
            this.form.patchValue({
              postcode: worker.postcode
            })
          }
        })
      )
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
    this.messageService.clearAll()
  }
}