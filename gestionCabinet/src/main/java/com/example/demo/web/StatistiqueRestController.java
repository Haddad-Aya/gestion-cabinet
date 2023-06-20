package com.example.demo.web;

import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.dtos.*;
import com.example.demo.entities.*;
import com.example.demo.services.StatistiqueService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins ="http://localhost:4200")
@RequestMapping("api/admin/statistique")
public class StatistiqueRestController {

	public StatistiqueService statistiqueService;
	
	@PostMapping("/newFactures/{idMedecin}")
	 public Facture saveFacture(@RequestBody Facture facture,
			 @PathVariable("idMedecin") Long idMedecin){
		 return statistiqueService.saveFacture(facture.getTitre(), facture.getPrix(), facture.getDateFacture(),idMedecin);
	 }
	
	@GetMapping("/mesFactures")
    public List<Facture> factureByMedecin(){
        return statistiqueService.getFacturesByIdMedecin();
    }
	
	
	@GetMapping("/mesFacturesBetweenDate")
    public List<FactureDTO> factureBetweenDate(@RequestParam("premDate") Date premDate,@RequestParam("deuxDate") Date deuxDate){
        return statistiqueService.getFactureBetween(premDate, deuxDate);
    }
	
	@GetMapping("/mesConsultationsBetweenDate")
    public List<ConsultationDTO> consultationBetweenDate(@RequestParam("premDate") Date premDate,@RequestParam("deuxDate") Date deuxDate){
        return statistiqueService.getConsultationBetween(premDate, deuxDate);
    }

	@GetMapping("/mesFacturesByDate")
    public List<FactureDTO> factureByDate(@RequestParam("dateFacture") Date dateFacture){
        return statistiqueService.getFactureByDate(dateFacture);
    }

	@GetMapping("/mesConsultationsByDate")
    public List<ConsultationDTO> consultationByDate(@RequestParam("dateConsultation") Date dateConsultation){
        return statistiqueService.getConsultationByDate(dateConsultation);
    }
	
	@GetMapping("/mesConsultationsNonPaye")
    public List<ConsultationDTO> consultationNonPaye(){
        return statistiqueService.getConsultationNonPaye();
    }
	
	@GetMapping("/sommeConsultationsByDate")
    public Float sommeConsultationsByDate(@RequestParam("premDate") Date premDate,@RequestParam("deuxDate") Date deuxDate){
        return statistiqueService.sommeConsultationByDate(premDate, deuxDate);
    }

	@GetMapping("/sommeFacturesByDate")
    public Float sommeFacturesByDate(@RequestParam("premDate") Date premDate,@RequestParam("deuxDate") Date deuxDate){
        return statistiqueService.sommeFactureByDate(premDate, deuxDate);
    }

	@GetMapping("/beneficeNet/{idMedecin}")
    public Float beneficeNet(@RequestParam("premDate") Date premDate,@RequestParam("deuxDate") Date deuxDate){
        return statistiqueService.beneficeNet(premDate, deuxDate);
    }

	@GetMapping("/factureByDateInOrder")
    public List<FactureDTO> factureByDateInOrder(){
        return statistiqueService.findFactureByDateOrder();
    }

	@GetMapping("/consultationByDateInOrder")
    public List<ConsultationDTO> consultationByDateInOrder(){
        return statistiqueService.findConsultationByDateOrder();
    }

	@GetMapping("/sommeConsultationsJour")
    public Float sommeConsultationsJour(@RequestParam("date") Date date){
        return statistiqueService.sommeConsultationJour(date);
    }

	@GetMapping("/sommeFacturesJour")
    public Float sommeFacturesByDate(@RequestParam("date") Date date){
        return statistiqueService.sommeFactureJour(date);
    }
	
	@GetMapping("/beneficeNetJour")
    public Float beneficeNetJour(@RequestParam("date") Date date){
        return statistiqueService.beneficeNetJour(date);
    }

	@GetMapping("/nbrConsultation")
    public Integer nbrConsultation(@RequestParam("date") Date date){
        return statistiqueService.nbrConsultation(date);
    }
	
	@GetMapping("/nbrConsultationPaye")
    public Integer nbrConsultationPaye(){
        return statistiqueService.nbrConsultationPaye();
    }
	@GetMapping("/nbrConsultationNonPaye")
    public Integer nbrConsultationNonPaye(){
        return statistiqueService.nbrConsultationNonPaye();
    }
	@GetMapping("/nbrConsultationGratuit")
    public Integer nbrConsultationGratuit(){
        return statistiqueService.nbrConsultationGratuit();
    }
	
	@GetMapping("/nbrTotalPatient")
    public Integer nbrTotalPatient(){
        return statistiqueService.nbrTotalPatient();
    }
	@GetMapping("/nbrFemme")
    public Integer nbrFemme(){
        return statistiqueService.nbrFemme();
    }
	@GetMapping("/nbrHomme")
    public Integer nbrHomme(){
        return statistiqueService.nbrHomme();
    }
	
	@GetMapping("/nbrRendezVousAnnuler")
    public Integer nbrRendezVousAnnuler(){
        return statistiqueService.nbrRendezVousAnnuler();
    }
	@GetMapping("/nbrRendezVousRealiser")
    public Integer nbrRendezVousRealiser(){
        return statistiqueService.nbrRendezVousRealiser();
    }
	
	@GetMapping("/beneficeNet")
    public Float beneficeNet(){
        return statistiqueService.beneficeNet();
    }
	
	@GetMapping("/sommeConsultation")
    public Float sommeConsultation(){
        return statistiqueService.sommeConsultation();
    }
	@GetMapping("/sommeFacture")
    public Float sommeFacture(){
        return statistiqueService.sommeFacture();
    }

}