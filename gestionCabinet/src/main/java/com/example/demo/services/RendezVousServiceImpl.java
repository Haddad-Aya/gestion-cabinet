package com.example.demo.services;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.enums.StatusRDV;
import com.example.demo.exeption.UserNotFoundExeption;
import com.example.demo.mappers.PatientMapperImpl;
import com.example.demo.mappers.RendezVousMapperImpl;
import com.example.demo.repository.*;

import lombok.AllArgsConstructor;

import com.example.demo.dtos.PatientDTO;
import com.example.demo.dtos.RendezVousDTO;
import com.example.demo.entities.*;

@Service
@Transactional
@AllArgsConstructor
public class RendezVousServiceImpl implements RendezVousService{
	
    @Autowired
    private JavaMailSender mailSender;
    
	private UtilisateurRepository utilisateurRepository;
	private RendezVousRepository rendezVousRepository;
	private RendezVousMapperImpl rendezVousMapperImpl; 
	private PatientMapperImpl patientMapperImpl;

	@Override
	public RendezVousDTO saveRendezVous(RendezVousDTO rendezVou,Long idPatient) {
		RendezVous disponibiliter=rendezVousRepository.findByRendezVous(rendezVou.getDateRendezVous(),rendezVou.getHeureDebut());
		if(disponibiliter == null) {
		Patient monPatient=new Patient();
		Utilisateur patient= utilisateurRepository.findById(idPatient).orElse(null);
		if(patient instanceof Patient)
		{
			monPatient= (Patient) patient;
		}
		RendezVous rendezVous=new RendezVous();
		rendezVous.setDateRendezVous(rendezVou.getDateRendezVous());rendezVous.setHeureDebut(rendezVou.getHeureDebut());
		rendezVous.setPatient(monPatient);rendezVous.setStatus(StatusRDV.EN_ATTENTE);
		RendezVous saved=rendezVousRepository.save(rendezVous);
		 
		return rendezVousMapperImpl.fromRendezVous(saved);
		}
       else return null;
	}

	@Override
	public RendezVousDTO modifierRendezVous(RendezVousDTO rendezVousDTO, Long idRendezVous) {
		RendezVous disponibiliter=rendezVousRepository.findByRendezVous(rendezVousDTO.getDateRendezVous(),rendezVousDTO.getHeureDebut());
		if(disponibiliter == null) {
			RendezVous getIdRendezVousById=rendezVousRepository.findById(idRendezVous).orElse(null);
			Patient monPatient=new Patient();
			Utilisateur patient= utilisateurRepository.findById(getIdRendezVousById.getPatient().getId()).orElse(null);
			System.out.println(patient);
			if(patient instanceof Patient)
			{
				monPatient= (Patient) patient;
			}
			RendezVous rendezVous=new RendezVous();
			rendezVous.setId(idRendezVous);
			rendezVous.setPatient(monPatient);
			rendezVous.setDateRendezVous(rendezVousDTO.getDateRendezVous());
			rendezVous.setHeureDebut(rendezVousDTO.getHeureDebut());
			rendezVous.setStatus(getIdRendezVousById.getStatus());
			RendezVous saved=rendezVousRepository.save(rendezVous);
			String subject="Modification d'un rendez-vous";
			String body="Le patient avec le nom : "+ rendezVous.getPatient().getNom()+" "+rendezVous.getPatient().getPrenom()+" et l'email : "+rendezVous.getPatient().getEmail()+" a changer l'horaire de son rendez-vous";
	    	 this.email("ayyouta.aya.had@gmail.com",subject,body);
			return rendezVousMapperImpl.fromRendezVous(saved);
		}
		return null;
	}

	@Override
	public RendezVousDTO annulerRendezVous(RendezVousDTO rendezVousDTO,Long idRendezVous) {
			Patient monPatient=new Patient();
			Utilisateur patient= utilisateurRepository.findById(rendezVousDTO.getPatient().getId()).orElse(null);
			if(patient instanceof Patient)
			{
				monPatient= (Patient) patient;
			}
			RendezVous rendezVous=new RendezVous();
			rendezVous.setId(idRendezVous);rendezVous.setPatient(monPatient);
			rendezVous.setDateRendezVous(rendezVousDTO.getDateRendezVous());
			rendezVous.setHeureDebut(rendezVousDTO.getHeureDebut());
			rendezVous.setStatus(StatusRDV.ANNULER);
			RendezVous saved=rendezVousRepository.save(rendezVous);
			String subject="Annulation d'un rendez-vous";
			String body="Le patient avec le nom : "+ rendezVous.getPatient().getNom()+" "+rendezVous.getPatient().getPrenom()+" et l'email : "+rendezVous.getPatient().getEmail()+" a annulé son rendez-vous son rendez-vous";
	    	 this.email("ayyouta.aya.had@gmail.com",subject,body);
			return rendezVousMapperImpl.fromRendezVous(saved);
	}

	@Override
	public List<RendezVousDTO> listRendezVousEnAttente() {
		List<RendezVous> rendezVous=rendezVousRepository.findRendezVousEnAttente();
		List<RendezVousDTO> collect=rendezVous.stream()
                .map(r->rendezVousMapperImpl.fromRendezVous(r))
                .collect(Collectors.toList());
        return collect;

	}

	@Override
	public List<RendezVousDTO> listRendezVousRealiser() {
		List<RendezVous> rendezVous=rendezVousRepository.findRendezVousRealiser();
		List<RendezVousDTO> collect=rendezVous.stream()
                .map(r->rendezVousMapperImpl.fromRendezVous(r))
                .collect(Collectors.toList());
        return collect;
	}

	@Override
	public List<RendezVousDTO> listRendezVousAnnuler() {
		List<RendezVous> rendezVous=rendezVousRepository.findRendezVousAnnuler();
		List<RendezVousDTO> collect=rendezVous.stream()
                .map(r->rendezVousMapperImpl.fromRendezVous(r))
                .collect(Collectors.toList());
        return collect;
	}
	
	@Override
	public PatientDTO getPatientByIdRendezVous(Long idRendezVous) {
		Patient monPatient=rendezVousRepository.findPatientByIdRendezVous(idRendezVous);
	    if(monPatient == null)
			throw new UserNotFoundExeption("patient not found");
		return patientMapperImpl.fromPatient(monPatient);
	}

	@Override
	public List<RendezVousDTO> listRendezVous() {
		List<RendezVous> rendezVous=rendezVousRepository.listRendezVousAsc();
		System.out.println(rendezVous);
		List<RendezVousDTO> collect=rendezVous.stream()
                .map(r->rendezVousMapperImpl.fromRendezVous(r))
                .collect(Collectors.toList());
        return collect;
	}

	@Override
	public List<RendezVousDTO> listRendezVousByNomPatient(String nom) {
		List<RendezVous> rendezVousByNomPatient=rendezVousRepository.listRendezVousByNomPatient(nom);
		List<RendezVousDTO> collect=rendezVousByNomPatient.stream()
                .map(r->rendezVousMapperImpl.fromRendezVous(r))
                .collect(Collectors.toList());
        return collect;
	}

	@Override
	public List<RendezVousDTO> listRendezVousNonAnnuler() {
		List<RendezVous> rendezVousNonAnnuler=rendezVousRepository.listRendezVousNonAnnuler();
		List<RendezVousDTO> collect=rendezVousNonAnnuler.stream()
                .map(r->rendezVousMapperImpl.fromRendezVous(r))
                .collect(Collectors.toList());
        return collect;
	}

	@Override
	public List<RendezVousDTO> listRendezVousEnAttenteByNomPatient(String nom) {
		List<RendezVous> rendezVousNonAnnuler=rendezVousRepository.listRendezVousEnAttenteByNomPatient(nom);
		List<RendezVousDTO> collect=rendezVousNonAnnuler.stream()
                .map(r->rendezVousMapperImpl.fromRendezVous(r))
                .collect(Collectors.toList());
        return collect;
	}

	@Override
	public RendezVousDTO disponibilite(Date dateRendezVous, String heureDebut) {
		RendezVous disponibiliter=rendezVousRepository.findByRendezVous(dateRendezVous,heureDebut);
		return rendezVousMapperImpl.fromRendezVous(disponibiliter);
	}

	@Override
	public List<RendezVousDTO> listRendezVousByIdPatient(Long idPatient) {
		List<RendezVous> rendezVousNonAnnuler=rendezVousRepository.listRendezVousByIdPatient(idPatient);
		List<RendezVousDTO> collect=rendezVousNonAnnuler.stream()
                .map(r->rendezVousMapperImpl.fromRendezVous(r))
                .collect(Collectors.toList());
        return collect;
	}

	@Override
	public List<RendezVousDTO> getRendezVousByDateAndIdPatient(String date, Long idPatient) throws Exception {
		SimpleDateFormat maDate=new SimpleDateFormat("yyyy/MM/dd");  
	    System.out.println("Formated Date " + maDate.format(date));
		 //Date date1=maDate.parse(date);  
		 System.out.println(maDate.format(date));
		 System.out.println(date);
		/* List<RendezVous> rendezVous=rendezVousRepository.rendezVousByDateAndIdPatient(idPatient, maDate.format(date));
		 List<RendezVousDTO> collect=rendezVous.stream()
	                .map(r->rendezVousMapperImpl.fromRendezVous(r))
	                .collect(Collectors.toList());*/
	        return null;
	}

	@Override
	public List<RendezVousDTO> listRendezVousEnAttenteByIdPatient(Long idPatient) {
		List<RendezVous> rendezVous=rendezVousRepository.findRendezVousEnAttenteByIdPatient(idPatient);
		List<RendezVousDTO> collect=rendezVous.stream()
                .map(r->rendezVousMapperImpl.fromRendezVous(r))
                .collect(Collectors.toList());
        return collect;
	}

	@Override
	public List<RendezVousDTO> listRendezVousRealiserByIdPatient(Long idPatient) {
		List<RendezVous> rendezVous=rendezVousRepository.findRendezVousRealiserByIdPatient(idPatient);
		List<RendezVousDTO> collect=rendezVous.stream()
                .map(r->rendezVousMapperImpl.fromRendezVous(r))
                .collect(Collectors.toList());
        return collect;
	}

	@Override
	public List<RendezVousDTO> listRendezVousAnnulerByIdPatient(Long idPatient) {
		List<RendezVous> rendezVous=rendezVousRepository.findRendezVousAnnulerByIdPatient(idPatient);
		List<RendezVousDTO> collect=rendezVous.stream()
                .map(r->rendezVousMapperImpl.fromRendezVous(r))
                .collect(Collectors.toList());
        return collect;
	}

	@Override
	public void email(String toEmail, String subject, String body) {
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setFrom("ayyouta.aya.had@gmail.com");
		mail.setTo(toEmail);
		mail.setText(body);
		mail.setSubject(subject);
		mailSender.send(mail);
		
	}

	@Bean
	@Override
	public void rappelRendezVous() throws Exception {
		List<RendezVousDTO> listeRendezVous= this.listRendezVousEnAttente();
		Date dateNow=new Date();
		SimpleDateFormat s = new SimpleDateFormat("dd/MM/yyyy");
		for (int i = 0; i < listeRendezVous.size(); i++) {
			//Date dateAvant = s.parse("25/02/2012");
	      //   Date dateApres = s.parse("31/03/2012");
	         long diff = s.parse(s.format(listeRendezVous.get(i).getDateRendezVous())).getTime() - s.parse(s.format(dateNow)).getTime();
	         float res = (diff / (1000*60*60*24));
	         System.out.println(i+"la date est : "+listeRendezVous.get(i).getDateRendezVous());
	         System.out.println(i+"Nombre de jours entre les deux dates est: "+res);
	         System.out.println(s.parse(s.format(listeRendezVous.get(i).getDateRendezVous())).getTime());
	         System.out.println(s.parse(s.format(dateNow)).getTime());
        	 String subject="Rappel de votre rendez-vous";
	         if(res == 2.0) {
	        	 String body="Bonjour cher patient on vous rappel que vous avez un rendez-vous dans 2 jours. Soyer à l'heure";
	        	 this.email(listeRendezVous.get(i).getPatient().getEmail(),subject,body);
	        	 System.out.println("yesss");
	         }
	         if(res == 7.0) {
	        	 String body="Bonjour cher patient on vous rappel que vous avez un rendez-vous dans 7 jours. Soyer à l'heure";
	        	 this.email(listeRendezVous.get(i).getPatient().getEmail(),subject,body);
	        	 System.out.println();
	         }
			//System.out.println(s.format(listeRendezVous.get(i).getDateRendezVous()));
		   // System.out.println(s.format(dateNow));
		}
			//int days = Days.daysBetween(date1, dateNow).getDays();
	}
		
	

}