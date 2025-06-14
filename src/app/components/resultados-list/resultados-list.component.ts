import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-resultados-list',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './resultados-list.component.html',
  styleUrl: './resultados-list.component.css'
})
export class ResultadosListComponent implements OnInit {
  ejecuciones: any[] = [];
  filtradas: any[] = [];
  filtro: string = 'todos';

  tipos = [
    { nombre: 'todos', label: 'Todos', total: 0 },
    { nombre: 'procesos', label: 'Procesos', total: 0 },
    { nombre: 'memoria', label: 'Memoria', total: 0 },
    { nombre: 'disco', label: 'Disco', total: 0 }
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/diagnostics/historial')
      .subscribe(data => {
        this.ejecuciones = data;
        this.actualizarContadores();
        this.filtrar();
      });
  }

 /* descargarPDF() {
  const url = `http://localhost:3000/api/pdf/resultados/${this.tipo}/${this.id}`;
  window.open(url, '_blank');
}*/


  actualizarContadores(): void {
    this.tipos.forEach(tipo => {
      tipo.total = tipo.nombre === 'todos'
        ? this.ejecuciones.length
        : this.ejecuciones.filter(e => e.tipo === tipo.nombre).length;
    });
  }

  filtrar(): void {
    this.filtradas = this.filtro === 'todos'
      ? this.ejecuciones
      : this.ejecuciones.filter(e => e.tipo === this.filtro);
  }

  verResultado(tipo: string, id: number) {
    this.router.navigate(['/resultados', tipo, id]);
  }
}


