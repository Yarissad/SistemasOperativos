import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiagnosticoService } from '../../diagnostico.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.css'
})
export class WizardComponent implements OnInit {
  currentStep = 1;
  intervalo = '';
  iteraciones = 1;
  modoResultado = 'ver';
  correo = '';
  tipo = '';
  titulo = '';

  constructor(
    private route: ActivatedRoute,
    private diagnosticoService: DiagnosticoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipo = this.route.snapshot.paramMap.get('tipo') || '';
    const titulos: { [key: string]: string } = {
      procesos: 'Configuración de Procesos Activos',
      memoria: 'Configuración de Uso de Memoria',
      disco: 'Configuración de Espacio en Disco'
    };
    this.titulo = titulos[this.tipo] || 'Configuración';
  }

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  finalizar() {
    const frecuenciaNum = Number(this.intervalo);
    if (!this.tipo || !frecuenciaNum || this.iteraciones <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        confirmButtonColor: '#0d6efd'
      });
      return;
    }

    const data = {
      diagnostics: [this.tipo],
      frequency: frecuenciaNum,
      iterations: this.iteraciones,
      email: this.modoResultado === 'correo' ? this.correo : undefined,
    };

    this.diagnosticoService.runDiagnostics(data).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Diagnóstico en ejecución',
          text: 'Tu diagnóstico ha comenzado correctamente.',
          confirmButtonColor: '#198754'
        }).then(() => {
          if (this.modoResultado === 'correo') {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/resultados']);
          }
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al ejecutar el diagnóstico.',
          confirmButtonColor: '#dc3545'
        });
      },
    });
  }

  salir() {
    this.router.navigate(['/']);
  }
}
