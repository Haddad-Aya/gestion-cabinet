package com.example.demo.services;

import java.util.List;

import com.example.demo.dtos.*;
import com.example.demo.entities.Mail;
import com.example.demo.entities.Medecin;
import com.example.demo.entities.Patient;
import com.example.demo.exeption.UserNotFoundExeption;

public interface PatientService {

	List<PatientDTO> getPatients(); //with archive=false
	List<PatientDTO> getPatientsArchiver();
	PatientDTO updateMdpPatient(Long idPatient, Patient newPatient);
	PatientDTO savePatient(Patient patient);
	PatientDTO archivePatient(Long idPatient,PatientDTO patientDTO);
	PatientDTO deArchivePatient(Long idPatient,PatientDTO patientDTO);
	PatientDTO updatePatient(Long idPatient,PatientDTO patientDTO);
	List<PatientDTO> getPatientByTel(int telephone);
	List<PatientDTO> getPatientById(Long idPatient);
	PatientDTO getPatientByEmail(String email) throws UserNotFoundExeption;
	List<PatientDTO> getPatientByName(String nom);
	MedecinDTO getMedecinById(Long idMedecin);
	void Listemail(Mail mail);
	
}
