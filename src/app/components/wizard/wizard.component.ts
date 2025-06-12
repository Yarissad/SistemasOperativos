import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiagnosticoService } from '../../diagnostico.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
      alert('Por favor, completa todos los campos.');
      return;
    }

    const data = {
      diagnostics: [this.tipo],
      frequency: frecuenciaNum,
      iterations: this.iteraciones,
      email: this.modoResultado === 'correo' ? this.correo : undefined,
    };

    this.diagnosticoService.runDiagnostics(data).subscribe({
      next: () => alert('Diagnóstico en ejecución.'),
      error: () => alert('Error al ejecutar el diagnóstico.'),
    });
  }

  salir() {
    this.router.navigate(['/']);
  }
}