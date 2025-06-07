import { AfterViewInit, Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.css'
})
export class WizardComponent{
  currentStep = 1;
  intervalo = '';
  iteraciones = 1;
  modoResultado = 'ver';
  correo = '';
  router: any;
  tipo: string = '';
  titulo: string = '';

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  finalizar() {
    const data = {
      intervalo: this.intervalo,
      iteraciones: this.iteraciones,
      modo: this.modoResultado,
      correo: this.correo
    };
    console.log('Datos enviados:', data);
    alert('Diagnóstico configurado correctamente.');
  }
  salir() {
  this.router.navigate(['/']);
  }

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.tipo = this.route.snapshot.paramMap.get('tipo') || '';

    console.log('Tipo seleccionado:', this.tipo);

    const titulos: { [key: string]: string } = {
      procesos: 'Configuración de Procesos Activos',
      memoria: 'Configuración de Uso de Memoria',
      disco: 'Configuración de Espacio en Disco'
    };
    this.titulo = titulos[this.tipo] || 'Configuración';
  }
}
