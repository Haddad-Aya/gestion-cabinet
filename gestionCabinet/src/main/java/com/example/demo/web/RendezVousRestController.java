package com.example.demo.web;

import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.dtos.PatientDTO;
import com.example.demo.dtos.RendezVousDTO;
import com.example.demo.services.RendezVousService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins ="http://localhost:4200")
@RequestMapping("/api/admin/mesRendezVous")

public class RendezVousRestController {
	public RendezVousService rendezVousService;
	
	@PostMapping("/newRendezVous/{idPatient}")
	public RendezVousDTO newRendezVous(
			@RequestBody RendezVousDTO rendezVousDTO,
			@PathVariable long idPatient
			){
		return rendezVousService.saveRendezVous(rendezVousDTO, idPatient);	
	}
	
	@PutMapping("/updateRendezVous/{idRendezVous}")
	public RendezVousDTO updateRendezVous(
			@RequestBody RendezVousDTO rendezVousDTO,
			@PathVariable long idRendezVous
			) {
		return rendezVousService.modifierRendezVous(rendezVousDTO, idRendezVous);
	}
	
	@PutMapping("/annulerRendezVous/{idRendezVous}")
	public RendezVousDTO annulerRendezVous(
			@RequestBody RendezVousDTO rendezVousDTO,
			@PathVariable long idRendezVous
			) {
		return rendezVousService.annulerRendezVous(rendezVousDTO, idRendezVous);
	}
	
	@GetMapping("/listRendezVousEnAttente")
	public List<RendezVousDTO> listRendezVousEnAttente() {
		return rendezVousService.listRendezVousEnAttente();
	}
	
	@GetMapping("/listRendezVousRealiser")
	public List<RendezVousDTO> listRendezVousRealiser() {
		return rendezVousService.listRendezVousRealiser();
	}

	@GetMapping("/listRendezVousAnnuler")
	public List<RendezVousDTO> listRendezVousAnnuler() {
		return rendezVousService.listRendezVousAnnuler();
	}

	@GetMapping("/getPatientByIdRendezVous/{idRendezVous}")
	public PatientDTO getPatientByIdRendezVous(@PathVariable long idRendezVous) {
		return rendezVousService.getPatientByIdRendezVous(idRendezVous);
	}
	
	@GetMapping("/listRendezVous")
	public List<RendezVousDTO> listRendezVous() {
		return rendezVousService.listRendezVous();
	}

	@GetMapping("/listRendezVousByNomPatient")
	public List<RendezVousDTO> listRendezVousByNomPatient(
			@RequestParam(name = "nom") String nom
			) {
		return rendezVousService.listRendezVousByNomPatient(nom);
	}

	@GetMapping("/listRendezVousNonAnnuler")
	public List<RendezVousDTO> listRendezVousNonAnnuler() {
		return rendezVousService.listRendezVousNonAnnuler();
	}
	
	@GetMapping("/listRendezVousEnAttenteByNomPatient")
	public List<RendezVousDTO> listRendezVousEnAttenteByNomPatient(
			@RequestParam(name = "nom") String nom
			) {
		return rendezVousService.listRendezVousEnAttenteByNomPatient(nom);
	}
	@GetMapping("/disponibiliterRendezVous")
	public RendezVousDTO disponibiliterRendezVous(
			@RequestParam(name = "dateRendezVous") Date dateRendezVous,
			@RequestParam(name = "heureDebut") String heureDebut
			) {
		return rendezVousService.disponibilite(dateRendezVous, heureDebut);
	}
	@GetMapping("/listRendezVousByIdPatient/{idPatient}")
	public List<RendezVousDTO> listRendezVousByIdPatient(
			@PathVariable long idPatient
			) {
		return rendezVousService.listRendezVousByIdPatient(idPatient);
	}
	@GetMapping("/listRendezVousByDateAndIdPatient/{idPatient}")
	public List<RendezVousDTO> listRendezVousByDateAndIdPatient(
			@RequestParam(name = "dateRendezVous") String dateRendezVous,
			@PathVariable long idPatient
			) throws Exception {
		return rendezVousService.getRendezVousByDateAndIdPatient(dateRendezVous, idPatient);
	}
	
	@GetMapping("/listRendezVousEnAttenteByIdPatient/{idPatient}")
	public List<RendezVousDTO> listRendezVousEnAttenteByIdPatient(
			@PathVariable long idPatient
			) {
		return rendezVousService.listRendezVousEnAttenteByIdPatient(idPatient);
	}
	
	@GetMapping("/listRendezVousRealiserByIdPatient/{idPatient}")
	public List<RendezVousDTO> listRendezVousRealiserByIdPatient(
			@PathVariable long idPatient
			) {
		return rendezVousService.listRendezVousRealiserByIdPatient(idPatient);
	}
	
	@GetMapping("/listRendezVousAnnulerByIdPatient/{idPatient}")
	public List<RendezVousDTO> listRendezVousAnnulerByIdPatient(
			@PathVariable long idPatient
			) {
		return rendezVousService.listRendezVousAnnulerByIdPatient(idPatient);
	}
	
}
