package com.example.demo.services;

import java.util.Date;
import java.util.List;

import com.example.demo.dtos.PatientDTO;
import com.example.demo.dtos.RendezVousDTO;

public interface RendezVousService {
	
	RendezVousDTO saveRendezVous(RendezVousDTO rendezVou,Long idPatient);
	RendezVousDTO modifierRendezVous(RendezVousDTO rendezVousDTO,Long idPatient);
	RendezVousDTO annulerRendezVous(RendezVousDTO rendezVousDTO,Long idPatient);
	List<RendezVousDTO> listRendezVousEnAttente();
	List<RendezVousDTO> listRendezVousRealiser();
	List<RendezVousDTO> listRendezVousAnnuler();
	PatientDTO getPatientByIdRendezVous(Long idRendezVous);
	List<RendezVousDTO> listRendezVous();
	List<RendezVousDTO> listRendezVousByNomPatient(String nom);
	List<RendezVousDTO> listRendezVousNonAnnuler();
	List<RendezVousDTO> listRendezVousEnAttenteByNomPatient(String nom);
	RendezVousDTO disponibilite(Date dateRendezVous, String heureDebut);
	List<RendezVousDTO> listRendezVousByIdPatient(Long idPatient);
	List<RendezVousDTO> getRendezVousByDateAndIdPatient(String date,Long idPatient) throws Exception;
	List<RendezVousDTO> listRendezVousEnAttenteByIdPatient(Long idPatient);
	List<RendezVousDTO> listRendezVousRealiserByIdPatient(Long idPatient);
	List<RendezVousDTO> listRendezVousAnnulerByIdPatient(Long idPatient);
	void rappelRendezVous() throws Exception;
	void email(String toEmail, String subject, String body);
}
