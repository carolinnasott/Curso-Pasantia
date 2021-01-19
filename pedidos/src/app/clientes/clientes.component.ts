import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Cliente } from '../shared/cliente';
import { ClienteService } from '../shared/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  constructor( private clienteService: ClienteService ) { }

  columnaClie: string[] = ['id', 'nombre', 'direccion'];

@ViewChild(MatTable) tabla: MatTable<Cliente> | undefined;


  ngOnInit(): void {

    this.clienteService.get().subscribe(
      (clientes) => {
        this.clientes = clientes;
        console.log(clientes);
      }
    );
  }
}
