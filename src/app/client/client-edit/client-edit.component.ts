import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-client-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
    templateUrl: './client-edit.component.html',
    styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent implements OnInit {
    client: Client;

    constructor(
        public dialogRef: MatDialogRef<ClientEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {client : Client},
        private clientService: ClientService
    ) {}

    ngOnInit(): void {
        //this.client = this.data.client != null ? this.data.client : new Client();
        //Lo de arriba modifica tanto el objeto de la laista como a la hora de modifocar su nombre
        //Lo de abajo lo que hace es que no se modifique a la vez el objeto de la lista a la hora de modificar el nombre
        this.client = this.data.client ? Object.assign({}, this.data.client) : new Client();

    }

    onSave() {
        this.clientService.saveClient(this.client).subscribe(() => {
            this.dialogRef.close();
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
