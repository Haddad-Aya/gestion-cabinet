package com.example.demo.web;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.MedecinDTO;
import com.example.demo.dtos.PatientDTO;
import com.example.demo.entities.*;
import com.example.demo.services.PatientService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins ="*")
@RequestMapping("/api/admin/mesPatients")

public class PatientWebRestController {
	public PatientService patientService;
	
	@GetMapping("/getMedecin/{idMedecin}")
	public MedecinDTO getMedecin(
			@PathVariable long idMedecin
			) {
		return patientService.getMedecinById(idMedecin);
	}
	
	@GetMapping("/listPatients")
    public List<PatientDTO> listPatient(){
        return patientService.getPatients();
    }
	
	@GetMapping("/mesPatientsArchiver")
    public List<PatientDTO> listPatientArchiver(){
        return patientService.getPatientsArchiver();
    }
	
	@GetMapping("/patientById/{idPatient}")
	public List<PatientDTO> getPatientById(
			@PathVariable long idPatient
			) {
		return patientService.getPatientById(idPatient);
	}
	
	@GetMapping("/patientByEmail")
	public PatientDTO getPatientByEmail(
			@RequestParam(name = "email") String email
			) {
		return patientService.getPatientByEmail(email);
	}
	
	@GetMapping("/patientByTelephone")
	public List<PatientDTO> getPatientByTelephone(
			@RequestParam(name = "telephone") int telephone
			) {
		return patientService.getPatientByTel(telephone);
	}
	
	@GetMapping("/patientByNom")
	public List<PatientDTO> getPatientByNom(
			@RequestParam(name = "nom") String nom
			) {
		return patientService.getPatientByName(nom);
	}
	
	@PostMapping("/registerPatient")
	public PatientDTO registerPatient(
			@RequestBody Patient patient
			){
		return patientService.savePatient(patient);	
	}
	
	@PutMapping("/archiverPatient/{idPatient}")
	public PatientDTO archiverPatient(
			@RequestBody PatientDTO patientDTO,
			@PathVariable long idPatient
			) {
		return patientService.archivePatient(idPatient, patientDTO);
	}
	
	@PutMapping("/desArchiverPatient/{idPatient}")
	public PatientDTO deArchiverPatient(
			@RequestBody PatientDTO patientDTO,
			@PathVariable long idPatient
			) {
		return patientService.deArchivePatient(idPatient, patientDTO);
	}
	
	@PutMapping("/updatePatient/{idPatient}")
	public PatientDTO updatePatient(
			@RequestBody PatientDTO patientDTO,
			@PathVariable long idPatient
			){
		return patientService.updatePatient(idPatient, patientDTO);
	}
	
	@PostMapping("/sendEmail")
	public void saveHoraire(
			@RequestBody Mail mail
			) {
		patientService.Listemail(mail);
	}
	
	@PutMapping("/updateMdpPatient/{idPatient}")
	public PatientDTO updateMdpPatient(
			@RequestBody Patient newPatient,
			@PathVariable long idPatient
			) {
		return patientService.updateMdpPatient(idPatient, newPatient);
	}

}
