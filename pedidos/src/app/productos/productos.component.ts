import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConfirmarComponent } from '../confirmar/confirmar.component';
import { Producto } from '../shared/producto';
import { ProductoService } from '../shared/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = []; /*items esta en el git*/
  seleccionado = new Producto();

  constructor( private productoService: ProductoService, private formBuilder: FormBuilder, public dialog: MatDialog ) { }

  columnaProd: string[] = ['id', 'descrip', 'precio', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource<Producto>();

@ViewChild(MatTable) tabla: MatTable<Producto> | undefined;
@ViewChild(MatSort) sort!: MatSort;

form = new FormGroup({});
mostrarFormulario = false;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      prodId: [''],
      prodDescripcion: ['', Validators.required],
      prodPrecio: ['', Validators.required],
      prodBorrado: [''],
      prodFechaAlta: ['']
    });

    this.productoService.get().subscribe(
      (productos) => {
        this.productos = productos;
        console.log(productos);
      }
    );
  }
  // tslint:disable-next-line:typedef
  actualizarTabla() {
    this.dataSource.data = this.productos;
    this.dataSource.sort = this.sort;
  }


  // tslint:disable-next-line:typedef
  agregar() {
    this.form.reset();
    this.seleccionado = new Producto();
    this.mostrarFormulario = true;
  }

  // tslint:disable-next-line:typedef
  delete(row: Producto) {

    const dialogRef = this.dialog.open(ConfirmarComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.productoService.delete(row.prodId)
          .subscribe(() => {

            this.productos = this.productos.filter((productos) => {
              if (productos.prodId !== row.prodId) {
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
  edit(seleccionado: Producto) {
    this.mostrarFormulario = true;
    this.seleccionado = seleccionado;
    this.form.setValue(seleccionado);
  }

  // tslint:disable-next-line:typedef
  guardar() {
    if (!this.form.valid) {
      return;
    }

    Object.assign(this.seleccionado, this.form.value);

    if (this.seleccionado.prodId) {
      this.productoService.put(this.seleccionado)
        .subscribe((producto) => {
          this.mostrarFormulario = false;
        });

    } else {
      this.productoService.post(this.seleccionado)
        .subscribe((producto) => {
          this.productos.push(producto);
          this.mostrarFormulario = false;
          this.actualizarTabla();
        });

    }

  }
  // tslint:disable-next-line:typedef
  cancelar() {
    this.mostrarFormulario = false;
  }
}
