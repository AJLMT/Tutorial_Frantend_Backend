import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PrestamosEditComponent } from '../prestamos-edit/prestamos-edit.component';
import { PrestamosService } from './../prestamos.service';
import { Prestamos } from '../model/Prestamos';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Client } from '../../client/model/Client';
import { ClientService } from '../../client/client.service';
import { Game } from '../../game/model/Game';
import { GameService } from '../../game/game.service';

@Component({
    selector: 'app-prestamos-list',
    standalone: true,
    imports: [MatButtonModule,
            MatIconModule,
            MatTableModule,
            CommonModule,
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatPaginator,
            MatDatepickerModule,
            MatNativeDateModule],
    templateUrl: './prestamos-list.component.html',
    styleUrl: './prestamos-list.component.scss',
})
export class PrestamosListComponent implements OnInit {
    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;
    clients: Client[];
    games: Game[];
    prestamos: Prestamos[];
    filterClients: Client;
    filterGames: Game;
    filterDate: Date;

    dataSource = new MatTableDataSource<Prestamos>();
    displayedColumns: string[] = ['id', 'game_name', 'client_name', 'ini', 'end', 'action'];

    constructor(
      private prestamosService: PrestamosService,
      private clientService: ClientService,
      private gameService: GameService,
      public dialog: MatDialog
    ) {}

    ngOnInit(): void {
      const pageable: Pageable = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [
            {
                property: 'id',
                direction: 'ASC',
            },
        ],
      };
      this.prestamosService.getPrestamos(pageable)
      .subscribe((data) => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
      });

      this.clientService
          .getClient()
          .subscribe((clients) => (this.clients = clients));

      this.gameService
          .getGames()
          .subscribe((games) => (this.games = games));
    }

    onCleanFilter(): void {
        this.filterClients = null;
        this.filterGames = null;
        this.filterDate = null;
        this.onSearch();
    }

    onSearch(): void {
        const pageable: Pageable = {
              pageNumber: this.pageNumber,
              pageSize: this.pageSize,
              sort: [
                  {
                      property: 'id',
                      direction: 'ASC',
                  },
              ],
          };

        const clientsName = this.filterClients != null ? this.filterClients.name : null;
        const gameName = this.filterGames != null ? this.filterGames.title : null;
        const date = this.filterDate;

        this.prestamosService.getPrestamos(pageable, gameName, clientsName, date)
        .subscribe((data) => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    loadPage(event?: PageEvent) {
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [
                {
                    property: 'id',
                    direction: 'ASC',
                },
            ],
        };

        if (event != null) {
            pageable.pageSize = event.pageSize;
            pageable.pageNumber = event.pageIndex;
        }

        const clientsName = this.filterClients != null ? this.filterClients.name : null;
        const gameName = this.filterGames != null ? this.filterGames.title : null;
        const date = this.filterDate;

        this.prestamosService.getPrestamos(pageable, gameName, clientsName, date).subscribe((data) => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    createPrestamos() {
        const dialogRef = this.dialog.open(PrestamosEditComponent, {
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    editPrestamos(prestamos: Prestamos) {
        const dialogRef = this.dialog.open(PrestamosEditComponent, {
            data: { prestamos: prestamos },
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.ngOnInit();
        });
    }

    deletePrestamos(prestamos: Prestamos) {
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: {
                title: 'Eliminar prestamo',
                description:
                    'Atención si borra el prestamo se perderán sus datos.<br> ¿Desea eliminar el prestamo?',
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.prestamosService.deletePrestamos(prestamos.id).subscribe((result) => {
                    this.ngOnInit();
                });
            }
        });
    }
}
