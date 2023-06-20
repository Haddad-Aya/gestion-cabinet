package com.example.demo.services;

import java.util.Date;
import java.util.List;

import com.example.demo.dtos.*;
import com.example.demo.entities.*;

public interface StatistiqueService {
	Facture saveFacture(String titre,Float prix, Date dateFacture, Long idMedecin);
	List<Facture> getFacturesByIdMedecin();
	List<FactureDTO> getFactureBetween(Date premDate,Date deuxDate);
	List<FactureDTO> getFactureByDate(Date dateFacture);
	List<ConsultationDTO> getConsultationBetween(Date premDate,Date deuxDate);
	List<ConsultationDTO> getConsultationByDate(Date dateConsultation);
	List<ConsultationDTO> getConsultationNonPaye();
	Float sommeConsultationByDate(Date premDate,Date deuxDate);
	Float sommeFactureByDate(Date premDate,Date deuxDate);
	Float beneficeNet(Date premDate,Date deuxDate);
	List<FactureDTO> findFactureByDateOrder();
	List<ConsultationDTO>findConsultationByDateOrder();
	
	Float sommeConsultationJour(Date date);
	Float sommeFactureJour(Date date);
	Float beneficeNetJour(Date date);
	
	Float sommeConsultation();
	Float sommeFacture();
	Float beneficeNet();
	
	
	Integer nbrConsultation(Date date);
	

	Integer nbrConsultationPaye();
	Integer nbrConsultationNonPaye();
	Integer nbrConsultationGratuit();
	Integer nbrTotalPatient();
	Integer nbrFemme();
	Integer nbrHomme();
	Integer nbrRendezVousAnnuler();
	Integer nbrRendezVousRealiser();
}
