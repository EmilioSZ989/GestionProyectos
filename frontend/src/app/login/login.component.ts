import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  AbrirFormulario(){
    const modal = document.getElementById("formulario-login")
    if (modal!= null){modal.style.display="block";} 
  }
  cerrarFormulario(){
    const modal = document.getElementById("formulario-login")
    if (modal!= null) 
    modal.style.display="none";
  }
  
}

