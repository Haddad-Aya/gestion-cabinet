package com.example.demo.web;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.dtos.ConsultationDTO;
import com.example.demo.dtos.HoraireDTO;
import com.example.demo.entities.Consultation;
import com.example.demo.services.ConsultationService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins ="*")
@RequestMapping("/api/admin/mesConsultations")
public class ConsultationRestController {
	public ConsultationService consultationService;

	@PostMapping("/newConsultation/{idRendezVous}")
	public ConsultationDTO newConsultation(
			@RequestBody Consultation consultation,
			@PathVariable long idRendezVous
			){
		return consultationService.saveConsultation(consultation, idRendezVous);	
	}
	

	@GetMapping("/listConsultations")
	public List<ConsultationDTO> listConsultations(){
		return consultationService.listConsultation();
	}
	
	@GetMapping("/listConsultationsNonPaye")
	public List<ConsultationDTO> listConsultationsNonPaye(){
		return consultationService.listConsultationNonPaye();
	}
	@GetMapping("/listConsultationsPaye")
	public List<ConsultationDTO> listConsultationsPaye(){
		return consultationService.listConsultationPaye();
	}
	@GetMapping("/listConsultationsGratuit")
	public List<ConsultationDTO> listConsultationsGratuit(){
		return consultationService.listConsultationGratuit();
	}
	@GetMapping("/listConsultationsByNomPatient")
	public List<ConsultationDTO> listConsultationsByNomPatient(
			@RequestParam(name = "nom") String nom
			){
		return consultationService.listConsultationByNomPatient(nom);
	}
	@GetMapping("/getConsultationById/{idConsultation}")
	public ConsultationDTO getConsultationById(
			@PathVariable Long idConsultation
			){
		return consultationService.getConsultationById(idConsultation);
	}
	
	@GetMapping("/listConsultationsByPatient/{idPatient}")
	public List<ConsultationDTO> listConsultationsByPatient(
			@PathVariable Long idPatient
			){
		return consultationService.listConsultationByPatient(idPatient);
	}
	
	@PutMapping("/updateConsultation/{idConsultation}")
	public ConsultationDTO updateConsultation(
			@RequestBody Consultation consultation,
			@PathVariable Long idConsultation
			) {
		return consultationService.updateConsultation(consultation, idConsultation);
	}
	@DeleteMapping("/deleteConsultation/{idConsultation}")
	public void deleteConsultation(
			@PathVariable Long idConsultation
			) {
		consultationService.deleteConsultation(idConsultation);
	}
}
