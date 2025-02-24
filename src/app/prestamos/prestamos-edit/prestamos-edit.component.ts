import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrestamosService } from '../prestamos.service';
import { Prestamos } from '../model/Prestamos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../../client/model/Client';
import { Game } from '../../game/model/Game';
import { ClientService } from '../../client/client.service';
import { GameService } from '../../game/game.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
    selector: 'app-prestamos-edit',
    standalone: true,
    imports:  [MatButtonModule,
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
    templateUrl: './prestamos-edit.component.html',
    styleUrl: './prestamos-edit.component.scss',
})
export class PrestamosEditComponent implements OnInit {
    prestamo: Prestamos;
    filterClients: Client;
    filterGames: Game;
    clients: Client[];
    games: Game[];

    constructor(
        private clientService: ClientService,
        private gameService: GameService,
        public dialogRef: MatDialogRef<PrestamosEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private prestamosService: PrestamosService
    ) {}

    ngOnInit(): void {
        this.prestamo = this.data.prestamos ? Object.assign({}, this.data.prestamos) : new Prestamos();
        const clientsName = this.filterClients != null ? this.filterClients.name : null;
        const gameName = this.filterGames != null ? this.filterGames.title : null;

        if (this.data.prestamo != null) {
            this.prestamo = Object.assign({}, this.data.prestamo);
        }
        else {
            this.prestamo = new Prestamos();
        }

        this.gameService.getGames().subscribe(
            games => {
                this.games = games;

                if (this.prestamo.game_name != null) {
                    let gameFilter: Game[] = games.filter(game => game.title == this.data.prestamo.game_name);
                    if (gameFilter != null) {
                        this.prestamo.game_name = gameFilter[0].title;
                    }
                }
            }
        );

        this.clientService.getClient().subscribe(
            clients => {
                this.clients = clients

                if (this.prestamo.client_name != null) {
                    let clientFilter: Client[] = clients.filter(client => client.name == this.data.prestamo.client_name);
                    if (clientFilter != null) {
                        this.prestamo.client_name = clientFilter[0].name;
                    }
                }
            }
        );
    }

    onSave() {
        this.prestamo.game_name = this.filterGames.title;
        this.prestamo.client_name = this.filterClients.name;
        console.log(this.prestamo);
        this.prestamosService.savePrestamos(this.prestamo).subscribe(() => {
            this.dialogRef.close();
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
