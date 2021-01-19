import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Producto } from '../shared/producto';
import { ProductoService } from '../shared/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = []; /*items: productos*/

  constructor( private productoService: ProductoService ) { }

  columnaProd: string[] = ['id', 'descrip', 'precio'];

@ViewChild(MatTable) tabla: MatTable<Producto> | undefined;

  ngOnInit(): void {

    this.productoService.get().subscribe(
      (productos) => {
        this.productos = productos;
        console.log(productos);
      }
    );
  }
}
