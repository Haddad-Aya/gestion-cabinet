package com.example.demo.services;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dtos.*;
import com.example.demo.entities.*;
import com.example.demo.mappers.*;
import com.example.demo.repository.*;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class StatistiqueServiceImpl implements StatistiqueService{
	
	private FactureRepository factureRepository;
	private FichierRepository fichierRepository;
	private ConsultationRepository consultationRepository;
	private UtilisateurRepository utilisateurRepository;
	private RendezVousRepository rendezVousRepository;
	//private FournisseurMapperImpl fournisseurMapperImpl;
	//private MedecinMapperImpl medecinMapperImpl;
	private FactureMapperImpl factureMapperImpl;
	private ConsultationMapperImpl consultationMapperImpl;

	@Override
	public Facture saveFacture(String titre,Float prix, Date dateFacture, Long idMedecin){
	//	List<Fichier> mesFichiers = fichierRepository.saveAll(fichiers);
		Medecin medecin=new Medecin();
		Utilisateur user = utilisateurRepository.findById(idMedecin).orElse(null);
		if(user instanceof Medecin)
		{
			medecin= (Medecin) user;
		}
		Facture facture = new Facture();
		facture.setDateFacture(dateFacture);
		facture.setPrix(prix);
		facture.setTitre(titre);
		facture.setMedecin(medecin);
	//	facture.setFichier(mesFichiers);
		Facture savedFacture = factureRepository.save(facture);
		return savedFacture;
	}

	@Override
	public List<Facture> getFacturesByIdMedecin() {
		List<Facture> factures = factureRepository.findAll();
		return factures;
	}

	@Override
	public List<FactureDTO> getFactureBetween(Date premDate, Date deuxDate) {
		List<Facture> factures = factureRepository.findByDateMedecin(premDate, deuxDate);
		List<FactureDTO> collect=factures.stream()
				.map(facture->factureMapperImpl.fromFacture(facture))
				.collect(Collectors.toList());
		return collect;
	}

	@Override
	public List<ConsultationDTO> getConsultationBetween(Date premDate, Date deuxDate) {
		List<Consultation> consultations = consultationRepository.findByDateConsultationBetween(premDate, deuxDate);
		List<ConsultationDTO> collect=consultations.stream()
				.map(consultation->consultationMapperImpl.fromConsultation(consultation))
				.collect(Collectors.toList());
		return collect;
	}

	@Override
	public List<FactureDTO> getFactureByDate(Date dateFacture) {
		List<Facture> factures = factureRepository.findByDateFacture(dateFacture);
		List<FactureDTO> collect=factures.stream()
				.map(facture->factureMapperImpl.fromFacture(facture))
				.collect(Collectors.toList());
		return collect;
	}

	@Override
	public List<ConsultationDTO> getConsultationByDate(Date dateFacture) {

		List<Consultation> consultations = consultationRepository.findByDateConsultation(dateFacture);
		List<ConsultationDTO> collect=consultations.stream()
				.map(consultation->consultationMapperImpl.fromConsultation(consultation))
				.collect(Collectors.toList());
		return collect;
	}

	@Override
	public List<ConsultationDTO> getConsultationNonPaye() {
		List<Consultation> consultations = consultationRepository.findConsultationNonPaye();
		List<ConsultationDTO> collect=consultations.stream()
				.map(consultation->consultationMapperImpl.fromConsultation(consultation))
				.collect(Collectors.toList());
		return collect;
	}

	@Override
	public Float sommeConsultationByDate(Date premDate, Date deuxDate) {
		Float sommeConsultation=consultationRepository.sommeConsultationByDate(premDate, deuxDate);
		return sommeConsultation;
	}

	@Override
	public Float sommeFactureByDate(Date premDate, Date deuxDate) {
		Float sommeFacture;
		sommeFacture=factureRepository.sommeFactureByDate(premDate, deuxDate);
		return sommeFacture;
	}

	@Override
	public Float beneficeNet(Date premDate, Date deuxDate) {
		Float sommeConsultation=sommeConsultationByDate(premDate, deuxDate);
		Float sommeFacture=sommeFactureByDate(premDate, deuxDate);
		Float myBenefice =sommeConsultation - sommeFacture;

	/*	System.out.println("the somme facturation is : " + sommeFacture);
		System.out.println("the somme consultation is : " + sommeConsultation);
		System.out.println("the benefice is : " + (sommeFacture-sommeConsultation));
		*/
		return myBenefice;
	}

	@Override
	public List<FactureDTO> findFactureByDateOrder() {
		List<Facture> factures = factureRepository.findByOrderByDateFactureDesc();
		List<FactureDTO> collect=factures.stream()
				.map(facture->factureMapperImpl.fromFacture(facture))
				.collect(Collectors.toList());
		return collect;
	}

	@Override
	public List<ConsultationDTO> findConsultationByDateOrder() {
		List<Consultation> consultations = consultationRepository.DateconsultationOrderBy();
		List<ConsultationDTO> collect=consultations.stream()
				.map(consultation->consultationMapperImpl.fromConsultation(consultation))
				.collect(Collectors.toList());
		return collect;
	}

	@Override
	public Float sommeConsultationJour(Date date) {
		Float sommeConsultation=consultationRepository.sommeConsultationJour(date);
		return sommeConsultation;
	}

	@Override
	public Float sommeFactureJour(Date date) {
		Float sommeFacture=factureRepository.sommeFactureJour(date);
		return sommeFacture;
	}

	@Override
	public Float beneficeNetJour(Date date) {
		Float sommeConsultation=sommeConsultationJour(date);
		Float sommeFacture=sommeFactureJour(date);
		Float myBenefice =sommeConsultation - sommeFacture;
		return myBenefice;
	}

	@Override
	public Integer nbrConsultation(Date date) {
		Integer somme=consultationRepository.nbrConsultation(date);
		return somme;
	}

	@Override
	public Integer nbrConsultationPaye() {
		Integer nbrPaye=consultationRepository.nbrConsultationPaye();
		return nbrPaye;
	}

	@Override
	public Integer nbrConsultationNonPaye() {
		Integer nbrNonPaye=consultationRepository.nbrConsultationNonPaye();
		return nbrNonPaye;
	}

	@Override
	public Integer nbrConsultationGratuit() {
		Integer nbrGratuit=consultationRepository.nbrConsultationGratuit();
		return nbrGratuit;
	}

	@Override
	public Integer nbrTotalPatient() {
		Integer nbrTotalPatient=utilisateurRepository.nbrTotalPatient();
		return nbrTotalPatient;
	}

	@Override
	public Integer nbrFemme() {
		Integer nbrFemme=utilisateurRepository.nbrFemme();
		return nbrFemme;
	}

	@Override
	public Integer nbrHomme() {
		Integer nbrHomme=utilisateurRepository.nbrHomme();
		return nbrHomme;
	}

	@Override
	public Float sommeFacture() {
		Float sommeFacture=factureRepository.sommeFacture();
		return sommeFacture;
	}

	@Override
	public Integer nbrRendezVousAnnuler() {
		Integer nbrAnnuler=rendezVousRepository.nbrRendezVousAnnuler();
		return nbrAnnuler;
	}

	@Override
	public Integer nbrRendezVousRealiser() {
		Integer nbrRealiser=rendezVousRepository.nbrRendezVousRealiser();
		return nbrRealiser;
	}

	@Override
	public Float sommeConsultation() {
		Float sommeConsultation=consultationRepository.sommeConsultation();
		return sommeConsultation;
	}

	@Override
	public Float beneficeNet() {
		Float sommeConsultation=sommeConsultation();
		Float sommeFacture=sommeFacture();
		Float myBenefice =sommeConsultation - sommeFacture;
		return myBenefice;
	}


}
