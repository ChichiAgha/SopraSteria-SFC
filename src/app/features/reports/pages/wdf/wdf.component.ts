import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Establishment } from '@core/model/establishment.model';
import { WDFReport } from '@core/model/reports.model';
import { URLStructure } from '@core/model/url.model';
import { Worker } from '@core/model/worker.model';
import { AlertService } from '@core/services/alert.service';
import { BreadcrumbService } from '@core/services/breadcrumb.service';
import { DialogService } from '@core/services/dialog.service';
import { EstablishmentService } from '@core/services/establishment.service';
import { ReportService } from '@core/services/report.service';
import { WorkerService } from '@core/services/worker.service';
import {
  WdfWorkplaceConfirmationDialogComponent,
} from '@features/workplace/wdf-workplace-confirmation-dialog/wdf-workplace-confirmation-dialog.component';
import { sortBy } from 'lodash';
import { combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-wdf',
  templateUrl: './wdf.component.html',
})
export class WdfComponent implements OnInit, OnDestroy {
  public workplace: Establishment;
  public workers: Array<Worker>;
  public workerCount: number;
  public report: WDFReport;
  public returnUrl: URLStructure;
  public exitUrl: URLStructure;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private reportService: ReportService,
    private workerService: WorkerService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private alertService: AlertService,
    private establishmentService: EstablishmentService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.breadcrumbService.show();
    const workplaceUid = this.route.snapshot.params.establishmentuid;

    this.returnUrl = { url: ['/workplace', workplaceUid, 'reports', 'wdf'] };
    this.exitUrl = { url: ['/workplace', workplaceUid, 'reports'] };
    this.workerService.setReturnTo(null);

    this.subscriptions.add(
      combineLatest(
        this.establishmentService.getEstablishment(workplaceUid),
        this.workerService.getAllWorkers(workplaceUid),
        this.reportService.getWDFReport(workplaceUid)
      )
        .pipe(take(1))
        .subscribe(([workplace, workers, report]) => {
          this.workers = sortBy(workers, ['wdfEligible']);
          this.report = report;
          this.workerCount = workers.length;
          this.workplace = workplace;
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /**
   * TODO: if totalVacancies & totalStarters & totalLeavers && numberOfStaff are 'upToDate' skip the modal
   * Only display quesitons that need confirming on the modal itself.
   */
  public onConfirmAndSubmit() {
    const dialog = this.dialogService.open(WdfWorkplaceConfirmationDialogComponent, { workplace: this.workplace });
    dialog.afterClosed.subscribe(confirmed => {
      if (confirmed) {
        this.confirmAndSubmit();
      }
    });
  }

  /**
   * TODO: This does not do anything (awaiting on agreement with a 'save' on BE)
   */
  private confirmAndSubmit() {
    this.router.navigate(this.returnUrl.url);
    this.alertService.addAlert({ type: 'success', message: 'The workplace has been saved and confirmed.' });
  }

  /**
   * TODO: Functionality not implemented
   * It should just be a case of uncommenting the return
   */
  get displayConfirmationPanel() {
    return false;
    // return this.worker.wdf.isEligible && !this.worker.wdf.currentEligibility;
  }
}
