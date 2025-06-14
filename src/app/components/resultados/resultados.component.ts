import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-resultados',
  standalone: true,
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
  imports: [CommonModule, FooterComponent, NavbarComponent]
})
export class ResultadosComponent implements OnInit {
  tipo = '';
  id = '';
  resultados: any[][] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.tipo = this.route.snapshot.paramMap.get('tipo') || '';
    this.id = this.route.snapshot.paramMap.get('id') || '';

    const url = `http://localhost:3000/api/diagnostics/resultados/${this.tipo}/${this.id}`;
    this.http.get<any[][]>(url).subscribe({
      next: data => this.resultados = data,
      error: err => console.error('Error al obtener resultados:', err)
    });
  }

  descargarPDF() {
  const url = `http://localhost:3000/api/diagnostics/pdf/resultados/${this.tipo}/${this.id}`;
  window.open(url, '_blank');
}



  volver() {
  this.router.navigate(['/resultados']);
}

  getCampos(item: any) {
  const nombresAmigables: { [key: string]: string } = {
    pid: 'PID',
    user_name: 'Usuario',
    cpu_usage: 'Uso CPU (%)',
    mem_usage: 'Uso Memoria (%)',
    time_plus: 'Tiempo de Ejecución',
    command: 'Comando',
    mem_total: 'Memoria Total',
    mem_used: 'Memoria Usada',
    mem_free: 'Memoria Libre',
    mem_shared: 'Memoria Compartida',
    mem_buff_cache: 'Buffer/Cache',
    mem_available: 'Memoria Disponible',
    swap_total: 'Swap Total',
    swap_used: 'Swap Usada',
    filesystem: 'Sistema de Archivos',
    size: 'Tamaño',
    used: 'Usado',
    avail: 'Disponible',
    use_percent: 'Porcentaje de Uso',
    mounted_on: 'Montado en'
  };

  return Object.entries(item).map(([key, valor]) => ({
    nombre: nombresAmigables[key] || key,
    valor
  }));
}
}
