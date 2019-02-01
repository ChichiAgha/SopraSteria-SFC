import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, ValidationErrors } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import * as moment from "moment"

import { DEFAULT_DATE_FORMAT, DEFAULT_DATE_DISPLAY_FORMAT } from "../../../core/constants/constants"
import { MessageService } from "../../../core/services/message.service"
import { WorkerService, WorkerEditResponse } from "../../../core/services/worker.service"
import { Worker } from "../../../core/model/worker.model"


@Component({
  selector: 'app-date-of-birth',
  templateUrl: './date-of-birth.component.html'
})
export class DateOfBirthComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private workerService: WorkerService,
    private messageService: MessageService
  ) {
    this.saveHandler = this.saveHandler.bind(this)
    this.formValidator = this.formValidator.bind(this)
  }

  form: FormGroup

  private subscriptions = []
  private worker: Worker
  private workerId: string

  async submitHandler() {
    try {
      await this.saveHandler()
      this.router.navigate([`/worker/home-postcode/${this.workerId}`])

    } catch (err) {
      // keep typescript transpiler silent
    }
  }

  saveHandler(): Promise<WorkerEditResponse> {
    return new Promise((resolve, reject) => {
      const { day, month, year } = this.form.value
      this.messageService.clearError()

      if (this.form.valid) {
        if (day && month && year) {
          this.worker.dateOfBirth = moment(`${year}-${month}-${day}`, DEFAULT_DATE_FORMAT)
            .format(DEFAULT_DATE_FORMAT)
          this.subscriptions.push(
            this.workerService.updateWorker(this.workerId, this.worker).subscribe(resolve, reject)
          )
        } else {
          resolve()
        }

      } else {
        if (this.form.errors) {
          if (this.form.errors.required) {
            this.messageService.show("error", "All fields are required.")

          } else if (this.form.errors.includes.dateValid) {
            this.messageService.show("error", "Invalid date format.")

          } else if (this.form.errors.dateBetween) {
            const noBefore = this.calculateLowestAcceptableDate()
            const noAfter = this.calculateHighestAcceptableDate()
            this.messageService.show("error", `The date has to be between ${noBefore.format(DEFAULT_DATE_DISPLAY_FORMAT)} and ${noAfter.format(DEFAULT_DATE_DISPLAY_FORMAT)}.`)
          }
        } else {
          this.messageService.show("error", "Please fill the required fields.")
        }

        reject()
      }
    })
  }

  private calculateLowestAcceptableDate() {
    const date = moment()
    return date.year(date.year() - 100)
  }

  private calculateHighestAcceptableDate() {
    const date = moment()
    return date.year(date.year() - 14)
  }

  formValidator(formGroup: FormGroup): ValidationErrors {
    if (!this.form) {
      return null
    }

    const { day, month, year } = this.form.value

    if (day && month && year) {
      const date = moment(`${year}-${month}-${day}`, DEFAULT_DATE_FORMAT)

      if (date.isValid()) {
        const noBefore = this.calculateLowestAcceptableDate()
        const noAfter = this.calculateHighestAcceptableDate()
        return date.isBetween(noBefore, noAfter, "d", "[]") ? null : { dateBetween: true }
      }

    } else {
      return [day, month, year].every(v => !v) ? null : { required: true }
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      day: null,
      month: null,
      year: null,
    })

    const params = this.route.snapshot.paramMap
    this.workerId = params.has("id") ? params.get("id") : null

    if (this.workerId) {
      this.subscriptions.push(
        this.workerService.getWorker(this.workerId).subscribe(worker => {
          this.worker = worker

          if (worker.dateOfBirth) {
            const date = worker.dateOfBirth.split("-")
            this.form.patchValue({
              year: parseInt(date[0]),
              month: parseInt(date[1]),
              day: parseInt(date[2]),
            })
          }

          this.form.setValidators(
            Validators.compose([
              DateValidator.dateValid(this.form),
              this.formValidator
            ])
          )
        })
      )
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
    this.messageService.clearAll()
  }
}
