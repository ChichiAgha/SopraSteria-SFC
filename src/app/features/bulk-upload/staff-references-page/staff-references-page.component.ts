import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BulkUploadFileType } from '@core/model/bulk-upload.model';
import { WorkPlaceReference } from '@core/model/my-workplaces.model';
import { AuthService } from '@core/services/auth.service';
import { BackService } from '@core/services/back.service';
import { ErrorSummaryService } from '@core/services/error-summary.service';
import { WorkerService } from '@core/services/worker.service';
import { BulkUploadReferences } from '@features/bulk-upload/bulk-upload-references/bulk-upload-references';
import { filter as _filter, findIndex } from 'lodash';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-workplace-references-page',
  templateUrl: '../bulk-upload-references/bulk-upload-references.html',
  styleUrls: ['../bulk-upload-references/bulk-upload-references.scss'],
})
export class StaffReferencesPageComponent extends BulkUploadReferences {
  private establishmentUid: string;
  private workPlaceReferences: WorkPlaceReference[];
  public columnOneLabel = 'Name';
  public columnTwoLabel = 'Staff reference';
  public nextRoute: String[] = [];
  public referenceType = BulkUploadFileType.Worker;
  public referenceTypeInfo = 'You must create unique references for each member of staff.';

  constructor(
    private activatedRoute: ActivatedRoute,
    protected authService: AuthService,
    protected backService: BackService,
    protected errorSummaryService: ErrorSummaryService,
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected workerService: WorkerService
  ) {
    super(authService, router, formBuilder, errorSummaryService);

    this.subscriptions.add(
      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          map(() => this.activatedRoute),
          map(route => route.snapshot.data)
        )
        .subscribe(data => {
          this.establishmentUid = this.activatedRoute.snapshot.paramMap.get('uid');
          this.references = data.references;
          this.workPlaceReferences = data.workplaceReferences;
          this.establishmentName = _filter(this.workPlaceReferences, ['uid', this.establishmentUid])[0].name;
          this.remainingEstablishments = this.workPlaceReferences.length - (this.getWorkplacePosition() + 1);

          this.setupForm();
          this.setNextRoute();
          this.setBackLink();
        })
    );
  }

  private setBackLink(): void {
    const url =
      this.getWorkplacePosition() === 0
        ? ['/bulk-upload/workplace-references']
        : ['/bulk-upload/staff-references', this.workPlaceReferences[this.getWorkplacePosition() - 1].uid];
    this.backService.setBackLink({ url });
  }

  /**
   * Calculate position of current workplace
   * from list of workplace references
   * NOTE: add 1 as array's are 0 index based
   */
  private getWorkplacePosition(): number {
    return findIndex(this.workPlaceReferences, ['uid', this.establishmentUid]);
  }

  protected setNextRoute(): void {
    this.nextRoute =
      this.workPlaceReferences.length === this.getWorkplacePosition() + 1
        ? ['/bulk-upload/workplace-and-staff-references/success']
        : ['/bulk-upload/staff-references', this.workPlaceReferences[this.getWorkplacePosition() + 1].uid];
  }

  protected save(saveAndContinue: boolean): void {
    this.subscriptions.add(
      this.workerService
        .updateLocalIdentifiers(this.establishmentUid, this.generateRequest())
        .pipe(take(1))
        .subscribe(
          () => {
            if (saveAndContinue) {
              this.router.navigate(this.nextRoute);
            } else {
              this.router.navigate(['/bulk-upload/workplace-references']);
            }
          },
          (error: HttpErrorResponse) => this.onError(error)
        )
    );
  }
}
