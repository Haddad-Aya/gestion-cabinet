package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dtos.*;
import com.example.demo.entities.*;
import com.example.demo.enums.StatusRDV;
import com.example.demo.mappers.ConsultationMapperImpl;
import com.example.demo.mappers.HoraireMapperImpl;
import com.example.demo.repository.*;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
//@Slf4j
public class ConsultationServiceImpl implements ConsultationService{
	private ConsultationRepository consultationRepository;
	private UtilisateurRepository utilisateurRepository;
	private TraitementRepository traitementRepository;
	private HoraireRepository horaireRepository;
	private FichierRepository fichierRepository;
	private ConsultationMapperImpl consultationMapperImpl; 
	private HoraireMapperImpl horaireMapperImpl; 
	private RendezVousRepository rendezVousRepository;
	public RendezVousService rendezVousService;
	
	@Override
	public ConsultationDTO saveConsultation(Consultation consultation, Long idRendezVous) {
		List<Traitement> mesTraitements=traitementRepository.saveAll(consultation.getTraitements());
		List<Fichier> mesFichiers=fichierRepository.saveAll(consultation.getFichiers());
		RendezVous rendezVous=rendezVousRepository.findById(idRendezVous).orElse(null);
		
		  Patient monPatient=new Patient();
			Utilisateur patient= utilisateurRepository.findById(rendezVous.getPatient().getId()).orElse(null);
			if(patient instanceof Patient)
			{
				monPatient= (Patient) patient;
			}
			RendezVous rendezVous1=new RendezVous();
			rendezVous1.setId(idRendezVous);rendezVous1.setPatient(monPatient);
			rendezVous1.setDateRendezVous(rendezVous.getDateRendezVous());
			rendezVous1.setHeureDebut(rendezVous.getHeureDebut());
			rendezVous1.setStatus(StatusRDV.REALISER);
			rendezVousRepository.save(rendezVous1);
		 
		Consultation consultations= new Consultation();
		consultations.setDateConsultation(consultation.getDateConsultation());
		consultations.setHeureConsultation(consultation.getHeureConsultation());
		consultations.setEvolution(consultation.getEvolution());
		consultations.setPrix(consultation.getPrix());
		consultations.setPaiment(consultation.getPaiment());
		consultations.setTypeConsultation(consultation.getTypeConsultation());
		consultations.setTraitements(mesTraitements);
		consultations.setRendezVous(rendezVous);
		consultations.setFichiers(mesFichiers);
		
		Consultation save =consultationRepository.save(consultations);
		return consultationMapperImpl.fromConsultation(save);
	}

	@Override
	public List<ConsultationDTO> listConsultation() {
		List<Consultation> consultations = consultationRepository.findConsultation();
		List<ConsultationDTO> collect=consultations.stream()
				.map(c ->consultationMapperImpl.fromConsultation(c))
				.collect(Collectors.toList());
		return collect;
	}

	@Override
	public List<ConsultationDTO> listConsultationByPatient(Long idPatient) {
		Patient monPatient=new Patient();
		Utilisateur patient= utilisateurRepository.findById(idPatient).orElse(null);
		if(patient instanceof Patient)
		{
			monPatient= (Patient) patient;
		}
		List<Consultation> consultations = consultationRepository.consultationIdPatient(monPatient);
		List<ConsultationDTO> collect=consultations.stream()
				.map(c ->consultationMapperImpl.fromConsultation(c))
				.collect(Collectors.toList());
		return collect;
	}

	//modifier une consultation tel que les traitements et les fichiers
	@Override
	public ConsultationDTO updateConsultation(Consultation newConsultation, Long idConsultation) {
		Consultation find=consultationRepository.findById(idConsultation).orElse(null);
		RendezVous rendezVous=rendezVousRepository.findById(find.getRendezVous().getId()).orElse(null);
		List<Fichier> fichier=consultationRepository.listFichierByIdConsultation(idConsultation);
		List<Traitement> traitement=consultationRepository.listTraitementByIdConsultation(idConsultation);
		
		List<Fichier> getByConsult=(List<Fichier>) newConsultation.getFichiers();
		  for (int i = 0; i < fichier.size(); i++){
			  Fichier findFile=fichierRepository.findById(fichier.get(i).getId()).orElse(null);
			//  System.out.println("findFile :"+findFile);
		   // System.out.println("id :"+fichier.get(i).getId());
			  Fichier saveFile=new Fichier();
			  saveFile.setId(findFile.getId());
			  saveFile.setNom(getByConsult.get(i).getNom());
			  saveFile.setTitre(getByConsult.get(i).getTitre());
			  fichierRepository.save(saveFile);
		 // System.out.println("saveFile :"+saveFile);
		  }
		  
		  List<Traitement> getByTraitement=(List<Traitement>) newConsultation.getTraitements();
		  for (int i = 0; i < traitement.size(); i++){
			  Traitement monTraitement=traitementRepository.findById(traitement.get(i).getId()).orElse(null);
			 // System.out.println("monTraitement :"+monTraitement);
			 // System.out.println("id :"+traitement.get(i).getId());
			  Traitement saveTraitement=new Traitement();
			  saveTraitement.setId(monTraitement.getId());
			  saveTraitement.setNom(getByTraitement.get(i).getNom());
			  saveTraitement.setEffet(getByTraitement.get(i).getEffet());
			  saveTraitement.setNbrFoisParJour(getByTraitement.get(i).getNbrFoisParJour());
			  saveTraitement.setQuantite(getByTraitement.get(i).getQuantite());
			  traitementRepository.save(saveTraitement);
			//  System.out.println("saveTraitement :"+saveTraitement);
		  }
		
		Consultation consultation= new Consultation();
		consultation.setId(idConsultation);
		consultation.setDateConsultation(newConsultation.getDateConsultation());
		consultation.setHeureConsultation(newConsultation.getHeureConsultation());
		consultation.setEvolution(newConsultation.getEvolution());
		consultation.setPrix(newConsultation.getPrix());
		consultation.setPaiment(newConsultation.getPaiment());
		consultation.setTypeConsultation(newConsultation.getTypeConsultation());
		consultation.setTraitements(find.getTraitements());
		consultation.setRendezVous(rendezVous);
		consultation.setFichiers(find.getFichiers());
		Consultation save =consultationRepository.save(consultation);
		return consultationMapperImpl.fromConsultation(save);
	}


	@Override
	public List<ConsultationDTO> listConsultationPaye() {
		List<Consultation> consultations=consultationRepository.findConsultationPaye();
		List<ConsultationDTO> collect=consultations.stream()
				.map(c ->consultationMapperImpl.fromConsultation(c))
				.collect(Collectors.toList());
		return collect;
	}

	@Override
	public List<ConsultationDTO> listConsultationNonPaye() {
		List<Consultation> consultations=consultationRepository.findConsultationNonPaye();
		List<ConsultationDTO> collect=consultations.stream()
				.map(c ->consultationMapperImpl.fromConsultation(c))
				.collect(Collectors.toList());
		return collect;
	}

	@Override
	public List<ConsultationDTO> listConsultationGratuit() {
		List<Consultation> consultations=consultationRepository.findConsultationGratuit();
		List<ConsultationDTO> collect=consultations.stream()
				.map(c ->consultationMapperImpl.fromConsultation(c))
				.collect(Collectors.toList());
		return collect;
	}

	@Override
	public List<ConsultationDTO> listConsultationByNomPatient(String nom) {
		List<Consultation> consultations=consultationRepository.findConsultationByNomPatient(nom);
		List<ConsultationDTO> collect=consultations.stream()
				.map(c ->consultationMapperImpl.fromConsultation(c))
				.collect(Collectors.toList());
		return collect;
	}

	@Override
	public ConsultationDTO getConsultationById(Long idConsultation) {
		Consultation consultation = consultationRepository.findById(idConsultation).orElse(null);
		return consultationMapperImpl.fromConsultation(consultation);
	}

	@Override
	public void deleteConsultation(Long idConsultation) {
		Consultation consultation = consultationRepository.findById(idConsultation).orElse(null);
		RendezVous rendezVous = rendezVousRepository.findById(consultation.getRendezVous().getId()).orElse(null);
		RendezVous rendezVou=new RendezVous();
		rendezVou.setId(rendezVous.getId());rendezVou.setPatient(rendezVous.getPatient());
		rendezVou.setDateRendezVous(rendezVous.getDateRendezVous());
		rendezVou.setHeureDebut(rendezVous.getHeureDebut());
		rendezVou.setStatus(StatusRDV.EN_ATTENTE);
		rendezVousRepository.save(rendezVou);
		consultationRepository.delete(consultation);
	}

}
