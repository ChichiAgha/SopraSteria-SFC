import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Establishment } from '@core/model/establishment.model';
import { LoggedInSession } from '@core/model/logged-in.model';
import { Roles } from '@core/model/roles.enum';
import { SummaryList } from '@core/model/summary-list.model';
import { UserDetails } from '@core/model/userDetails.model';
import { AlertService } from '@core/services/alert.service';
import { AuthService } from '@core/services/auth.service';
import { BreadcrumbService } from '@core/services/breadcrumb.service';
import { DialogService } from '@core/services/dialog.service';
import { UserService } from '@core/services/user.service';
import {
  UserAccountDeleteDialogComponent,
} from '@features/workplace/user-account-delete-dialog/user-account-delete-dialog.component';
import { take, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-user-account-view',
  templateUrl: './user-account-view.component.html',
})
export class UserAccountViewComponent implements OnInit {
  public loginInfo: SummaryList[];
  public securityInfo: SummaryList[];
  public establishment: Establishment;
  public user: UserDetails;
  public userInfo: SummaryList[];
  public canDeleteUser: boolean;
  public canResendActivationLink: boolean;
  public canEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private userService: UserService,
    private authService: AuthService,
    private dialogService: DialogService,
    private alertService: AlertService
  ) {
    this.user = this.route.snapshot.data.user;
    this.establishment = this.route.parent.snapshot.data.establishment;
    this.setAccountDetails();
  }

  ngOnInit() {
    this.breadcrumbService.show();

    this.userService
      .getAllUsersForEstablishment(this.establishment.uid)
      .pipe(
        take(1),
        withLatestFrom(this.authService.auth$)
      )
      .subscribe(([users, auth]) => {
        this.setPermissions(users, auth);
      });
  }

  public onDeleteUser() {
    const dialog = this.dialogService.open(UserAccountDeleteDialogComponent, { user: this.user });
    dialog.afterClosed.subscribe(deleteConfirmed => {
      if (deleteConfirmed) {
        this.deleteUser();
      }
    });
  }

  private deleteUser() {
    this.userService
      .deleteUser(this.user.uid)
      .pipe(
        withLatestFrom(this.userService.returnUrl$),
        take(1)
      )
      .subscribe(([response, returnUrl]) => {
        this.router.navigate(returnUrl.url, { fragment: 'user-accounts' });
        this.alertService.addAlert({ type: 'success', message: 'User deleted [BE NOT IMPLEMENTED]' });
      });
  }

  private setAccountDetails(): void {
    this.userInfo = [
      {
        label: 'Full name',
        data: this.user.fullname,
      },
      {
        label: 'Job title',
        data: this.user.jobTitle,
      },
      {
        label: 'Email address',
        data: this.user.email,
      },
      {
        label: 'Contact phone',
        data: this.user.phone,
      },
    ];

    this.loginInfo = [
      {
        label: 'Username',
        data: this.user.username || '-',
      },
    ];
  }

  private setPermissions(users: Array<UserDetails>, auth: LoggedInSession) {
    const canEdit = auth && auth.role === Roles.Edit;
    const isPending = this.user.username === null;
    const isPrimary = this.user.isPrimary;
    const editUsersList = users.filter(user => user.role === Roles.Edit);

    this.canDeleteUser = canEdit && editUsersList.length > 1 && !isPrimary && auth.uid !== this.user.uid;
    this.canResendActivationLink = canEdit && isPending;
    this.canEdit = auth.role === Roles.Edit;
  }
}
