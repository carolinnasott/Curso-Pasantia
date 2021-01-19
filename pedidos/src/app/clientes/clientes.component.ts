import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConfirmarComponent } from '../confirmar/confirmar.component';
import { Cliente } from '../shared/cliente';
import { ClienteService } from '../shared/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  constructor( private clienteService: ClienteService, private formBuilder: FormBuilder, public dialog: MatDialog ) { }

  columnaClie: string[] = ['id', 'nombre', 'direccion', 'acciones'];
  seleccionado = new Cliente();

@ViewChild(MatTable) tabla: MatTable<Cliente> | undefined;
@ViewChild(MatSort) sort!: MatSort;

dataSource = new MatTableDataSource<Cliente>();

form = new FormGroup({});
mostrarFormulario = false;


// tslint:disable-next-line:typedef
ngAfterViewInit() {
  this.dataSource.sort = this.sort;
}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      clienId: [''],
      clienNombre: ['', Validators.required],
      clienDireccion: ['', Validators.required],
      clienFechaAlta: [''],
      clienBorrado: ['']
    });

    this.clienteService.get().subscribe(
      (clientes) => {
        this.clientes = clientes;
        console.log(clientes);
      }
    );
  }

  // tslint:disable-next-line:typedef
  actualizarTabla() {
    this.dataSource.data = this.clientes;
    this.dataSource.sort = this.sort;
  }


  // tslint:disable-next-line:typedef
  agregar() {
    this.form.reset();
    this.seleccionado = new Cliente();
    this.mostrarFormulario = true;
  }

  // tslint:disable-next-line:typedef
  delete(row: Cliente) {

    const dialogRef = this.dialog.open(ConfirmarComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.clienteService.delete(row.clienId)
          .subscribe(() => {

            this.clientes = this.clientes.filter((clientes) => {
              if (clientes.clienId !== row.clienId) {
                return true
              } else {
                return false
              }
            });

            this.actualizarTabla();
          });
      }
    });
  }

  // tslint:disable-next-line:typedef
  edit(seleccionado: Cliente) {
    this.mostrarFormulario = true;
    this.seleccionado = seleccionado;
    this.form.setValue(seleccionado);
  }

  // tslint:disable-next-line:typedef
  /*guardar() {
    if (!this.form.valid) {
      return;
    }

    Object.assign(this.seleccionado, this.form.value);

    if (this.seleccionado.clienId) {
      this.clienteService.put(this.seleccionado)
        .subscribe((cliente) => {
          this.mostrarFormulario = false;
        });

    } else {
      this.clienteService.post(this.seleccionado)
        .subscribe((cliente) => {
          this.clientes.push(cliente);
          this.mostrarFormulario = false;
          this.actualizarTabla();
        });

    }

  }*/
  // tslint:disable-next-line:typedef
  cancelar() {
    this.mostrarFormulario = false;
  }
}
