package com.example.demo.services;

import java.util.List;

import com.example.demo.dtos.ConsultationDTO;
import com.example.demo.dtos.HoraireDTO;
import com.example.demo.entities.*;

public interface ConsultationService {

	ConsultationDTO saveConsultation(Consultation consultation,Long idRendezVous);
	List<ConsultationDTO> listConsultation();
	List<ConsultationDTO> listConsultationByPatient(Long idPatient);
	ConsultationDTO updateConsultation(Consultation newConsultation, Long idConsultation);
	
	List<ConsultationDTO> listConsultationPaye();
	List<ConsultationDTO> listConsultationNonPaye();
	List<ConsultationDTO> listConsultationGratuit();
	List<ConsultationDTO> listConsultationByNomPatient(String nom);
	ConsultationDTO getConsultationById(Long idConsultation);
	void deleteConsultation(Long idConsultation);
}
