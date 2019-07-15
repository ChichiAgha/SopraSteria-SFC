import { I18nPluralPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BulkUploadFileType,
  FileValidateStatus,
  ValidatedFile,
  ValidatedFilesResponse,
} from '@core/model/bulk-upload.model';
import { ErrorDefinition } from '@core/model/errorSummary.model';
import { AlertService } from '@core/services/alert.service';
import { AuthService } from '@core/services/auth.service';
import { BulkUploadService } from '@core/services/bulk-upload.service';
import { DialogService } from '@core/services/dialog.service';
import { EstablishmentService } from '@core/services/establishment.service';
import { filter } from 'lodash';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { UploadWarningDialogComponent } from '../upload-warning-dialog/upload-warning-dialog.component';

@Component({
  selector: 'app-uploaded-files-list',
  templateUrl: './uploaded-files-list.component.html',
  providers: [I18nPluralPipe],
})
export class UploadedFilesListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public bulkUploadFileTypeEnum = BulkUploadFileType;
  public preValidationError: boolean;
  public totalErrors = 0;
  public totalWarnings = 0;
  public uploadedFiles: ValidatedFile[];
  public validationComplete = false;

  constructor(
    private bulkUploadService: BulkUploadService,
    private establishmentService: EstablishmentService,
    private i18nPluralPipe: I18nPluralPipe,
    private router: Router,
    private alertService: AlertService,
    private dialogService: DialogService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getUploadedFiles();
    this.preValidateFilesSubscription();
  }

  private getUploadedFiles(): void {
    this.subscriptions.add(
      this.bulkUploadService.uploadedFiles$.subscribe((uploadedFiles: ValidatedFile[]) => {
        if (uploadedFiles) {
          this.uploadedFiles = uploadedFiles;
        }
      })
    );
  }

  private preValidateFilesSubscription(): void {
    this.subscriptions.add(
      this.bulkUploadService.preValidateFiles$.subscribe((preValidateFiles: boolean) => {
        if (preValidateFiles) {
          this.preValidateFiles();
        }
      })
    );
  }

  private preValidateFiles(): void {
    this.subscriptions.add(
      this.bulkUploadService
        .preValidateFiles(this.establishmentService.establishmentId)
        .pipe(take(1))
        .subscribe(
          (response: ValidatedFile[]) => this.checkForMandatoryFiles(response),
          (response: HttpErrorResponse) => this.bulkUploadService.serverError$.next(response.error.message)
        )
    );
  }

  private checkForMandatoryFiles(response: ValidatedFile[]): void {
    const files: string[] = response.map(data => this.bulkUploadFileTypeEnum[data.fileType]);
    this.uploadedFiles = response;

    if (
      !files.includes(this.bulkUploadFileTypeEnum.Establishment) ||
      !files.includes(this.bulkUploadFileTypeEnum.Worker)
    ) {
      this.preValidationError = true;
    } else {
      this.preValidationError = false;
    }

    this.bulkUploadService.preValidationError$.next(this.preValidationError);
  }

  public getFileType(fileName: string): string {
    return this.bulkUploadService.getFileType(fileName);
  }

  public validateFiles(): void {
    this.uploadedFiles.map((file: ValidatedFile) => (file.status = FileValidateStatus.Validating));

    this.subscriptions.add(
      this.bulkUploadService.validateFiles(this.establishmentService.establishmentId).subscribe(
        (response: ValidatedFilesResponse) => {
          this.onValidateComplete(response);
        },
        (response: HttpErrorResponse) => {
          if (response.status === 400) {
            this.onValidateComplete(response.error);
            return;
          }
          this.onValidateError(response);
        }
      )
    );
  }

  public beginCompleteUpload(): void {
    const establishmentsFile = this.uploadedFiles.find(file => file.fileType === 'Establishment');
    const workersFile = this.uploadedFiles.find(file => file.fileType === 'Worker');

    if ((establishmentsFile && establishmentsFile.deleted > 0) || (workersFile && workersFile.deleted > 0)) {
      const dialog = this.dialogService.open(UploadWarningDialogComponent, {
        establishmentsFile,
        workersFile,
      });

      dialog.afterClosed.subscribe(continueUpload => {
        if (continueUpload) {
          this.completeUpload();
        }
      });
      return;
    }
    this.completeUpload();
  }

  public completeUpload() {
    this.bulkUploadService
      .complete(this.establishmentService.establishmentId)
      .pipe(take(1))
      .subscribe(
        () => {
          this.authService.isFirstBulkUpload = false;
          this.router.navigate(['/dashboard']);
          this.authService.isFirstBulkUpload = false;
          this.alertService.addAlert({ type: 'success', message: 'Bulk upload complete.' });
        },
        response => {
          this.bulkUploadService.serverError$.next(response.error.message);
        }
      );
  }

  public displayDownloadReportLink(file: ValidatedFile) {
    return file.errors > 0 || file.warnings > 0;
  }

  public getValidationError(file: ValidatedFile): ErrorDefinition {
    return {
      name: this.getFileId(file),
      message: this.i18nPluralPipe.transform(file.errors, {
        '=1': 'There was # error in the file',
        other: 'There were # errors in the file',
      }),
    };
  }

  public downloadFile(event: Event, key: string) {
    event.preventDefault();

    this.bulkUploadService
      .getUploadedFileSignedURL(this.establishmentService.establishmentId, key)
      .subscribe(signedURL => {
        window.open(signedURL);
      });
  }

  /**
   * Set validate success update uploaded files
   * And then set total warnings and/or errors and status
   * @param response
   */
  private onValidateComplete(response: ValidatedFilesResponse): void {
    this.uploadedFiles = [response.establishment, response.training, response.workers];
    this.uploadedFiles = filter(this.uploadedFiles, 'filename');
    const validationErrors: Array<ErrorDefinition> = [];

    this.uploadedFiles.forEach((file: ValidatedFile) => {
      file.status = file.errors ? FileValidateStatus.Fail : FileValidateStatus.Pass;
      this.totalWarnings = this.totalWarnings + file.warnings;
      this.totalErrors = this.totalErrors + file.errors;
      if (file.errors) {
        validationErrors.push(this.getValidationError(file));
      }
    });
    this.bulkUploadService.validationErrors$.next(validationErrors);
    this.validationComplete = true;
  }

  private getFileId(file: ValidatedFile): string {
    return `bulk-upload-validation-${file.filename.substr(0, file.filename.lastIndexOf('.'))}`;
  }

  /**
   * TODO in another ticket
   * @param error
   */
  private onValidateError(response: HttpErrorResponse): void {
    const error: ValidatedFilesResponse = response.error;
    console.log(error);
  }

  get hasWarnings() {
    return this.totalWarnings > 0;
  }

  get hasErrors() {
    return this.totalErrors > 0;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
