import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ConsultationService } from 'src/app/services/consultation.service';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit{
  idPatient!:any
  dossier: any[] = []
  patient!:any
  nomPatient!:string
  constructor(private servicePatient:PatientService,private serviceConsultation:ConsultationService, private build: FormBuilder,private router: Router,private activatedRoute: ActivatedRoute){
    this.idPatient = JSON.parse(localStorage.getItem("id")!) 
    console.log(this.idPatient)
    this.afficheHistorique()
  }
  ngOnInit(): void {
    this.afficheHistorique()
    this.affichInfoPatient()
  }
  afficheHistorique(){
    try {
      this.serviceConsultation.getHistoriquePatient(this.idPatient).subscribe((resultData: any) => {
       this.dossier=resultData
       console.log(this.dossier)
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  affichInfoPatient(){
    try {
      this.servicePatient.getById(this.idPatient).subscribe((resultData: any) => {
       this.patient=resultData
       this.nomPatient=this.patient[0].prenom +' '+this.patient[0].nom
      });
    }
    catch (error) {
      console.log(error)
    }
  }


  //fn to pdf
  public downloadAsPDF() {
    const content = document.getElementById('pdfDossier');

    if (!content) {
      console.error('Element not found!');
      return;
    }

    html2canvas(content, { scale: 3 }).then((canvas) => {
      const paddingTop = 50;
      const paddingRight = 50;
      const paddingBottom = 50;
      const paddingLeft = 50;

      const canvasWidth = canvas.width + paddingLeft + paddingRight;
      const canvasHeight = canvas.height + paddingTop + paddingBottom;

      const newCanvas = document.createElement('canvas');
      newCanvas.width = canvasWidth;
      newCanvas.height = canvasHeight;
      const ctx = newCanvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#ffffff'; // Background color
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(canvas, paddingLeft, paddingTop);
      }

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = newCanvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('dossier medical.pdf');
    });
     
  }
}
