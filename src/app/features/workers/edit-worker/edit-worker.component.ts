import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerService } from '@core/services/worker.service';

@Component({
  templateUrl: './edit-worker.component.html',
})
export class EditWorkerComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private workerService: WorkerService) {}

  ngOnInit() {
    this.workerService.setState(this.route.snapshot.data.worker);
  }

  ngOnDestroy(): void {
    this.workerService.setState(null);
  }
}
