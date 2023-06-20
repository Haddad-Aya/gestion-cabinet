package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dtos.*;
import com.example.demo.entities.*;
import com.example.demo.enums.Role;
import com.example.demo.exeption.UserNotFoundExeption;
import com.example.demo.mappers.*;
import com.example.demo.repository.UtilisateurRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class PatientServiceImpl implements PatientService{
	private UtilisateurRepository utilisateurRepository;
	private PatientMapperImpl patientMapperImpl;
	private MedecinMapperImpl medecinMapperImpl;
	private final PasswordEncoder passwordEncoder;
	
    @Autowired
    private JavaMailSender mailSender;
    
	@Override
	public List<PatientDTO> getPatients() {
		List<Patient> patients=utilisateurRepository.findByArchiveFalse();
		List<PatientDTO> collect=patients.stream()
		                        .map(p->patientMapperImpl.fromPatient(p))
		                        .collect(Collectors.toList());
		return collect;
	}

	@Override
	public PatientDTO savePatient(Patient patient) {
		Patient p=new Patient();
        p.setNom(patient.getNom());
        p.setPrenom(patient.getPrenom());
        p.setEmail(patient.getEmail());
        p.setTelephone(patient.getTelephone());
        p.setAdr(patient.getAdr());
        p.setCivilite(patient.getCivilite());
        p.setIdCnam(patient.getIdCnam());
        p.setCodePostal(patient.getCodePostal());
        p.setSexe(patient.getSexe());
        p.setDateNaissance(patient.getDateNaissance());
		p.setRole(Role.USER);
		p.setMotDePasse(passwordEncoder.encode(patient.getMotDePasse()));
		Patient monPatient= utilisateurRepository.save(p);
    return  patientMapperImpl.fromPatient(monPatient);
	}

	@Override
	public PatientDTO archivePatient(Long idPatient, PatientDTO patientDTO) {
		Utilisateur patient=utilisateurRepository.findById(idPatient).orElse(null);
		var user = Patient.builder()
				.id(idPatient)
				.nom(patientDTO.getNom())
				.prenom(patientDTO.getPrenom())
				.email(patientDTO.getEmail())
				.telephone(patientDTO.getTelephone())
				.adr(patientDTO.getAdr())
				.civilite(patientDTO.getCivilite())
				.idCnam(patientDTO.getIdCnam())
				.codePostal(patientDTO.getCodePostal())
				.sexe(patientDTO.getSexe())
				.dateNaissance(patientDTO.getDateNaissance())
				.motDePasse(patient.getMotDePasse())
				.role(Role.USER)
				.archive(true)
				.build();
		Patient monPatient=utilisateurRepository.save(user);
	return patientMapperImpl.fromPatient(monPatient);
	}

	@Override
	public PatientDTO updatePatient(Long idPatient, PatientDTO patientDTO) {
		Patient monPatient= new Patient();
		Utilisateur newPatient= utilisateurRepository.findById(idPatient).orElse(null);
		if(newPatient instanceof Patient)
		{
			 monPatient= (Patient) newPatient;
		}
		var user = Patient.builder()
				.id(idPatient)
				.nom(patientDTO.getNom())
				.prenom(patientDTO.getPrenom())
				.email(patientDTO.getEmail())
				.telephone(patientDTO.getTelephone())
				.adr(patientDTO.getAdr())
				.civilite(patientDTO.getCivilite())
				.idCnam(patientDTO.getIdCnam())
				.codePostal(patientDTO.getCodePostal())
				.sexe(patientDTO.getSexe())
				.role(Role.USER)
				.dateNaissance(patientDTO.getDateNaissance())
				.archive(patientDTO.isArchive())
				.motDePasse(monPatient.getMotDePasse())
				.build();
		Patient save=utilisateurRepository.save(user);	
		return patientMapperImpl.fromPatient(save);
	}

	@Override
	public List<PatientDTO> getPatientByTel(int telephone) {
		List<Patient> newPatient= utilisateurRepository.findByTelephoneAndArchiveFalse(telephone);
		List<PatientDTO> collect=newPatient.stream()
                .map(p->patientMapperImpl.fromPatient(p))
                .collect(Collectors.toList());
		return collect;
	}

	@Override
	public List<PatientDTO> getPatientById(Long idPatient) {
		List<Patient> newPatient= utilisateurRepository.findByIdAndArchiveFalse(idPatient);
		List<PatientDTO> collect=newPatient.stream()
                .map(p->patientMapperImpl.fromPatient(p))
                .collect(Collectors.toList());
		return collect;
	}

	@Override
	public PatientDTO getPatientByEmail(String email) throws UserNotFoundExeption{
		Patient newPatient= utilisateurRepository.findByEmailAndArchiveFalse(email)
				.orElseThrow(()-> new UserNotFoundExeption("user not found"));
		return patientMapperImpl.fromPatient(newPatient);
	}

	@Override
	public List<PatientDTO> getPatientByName(String nom) {
		List<Patient> newPatient= utilisateurRepository.findByNomAndArchiveFalse(nom);
		List<PatientDTO> collect=newPatient.stream()
                .map(p->patientMapperImpl.fromPatient(p))
                .collect(Collectors.toList());
		return collect;
	}

	@Override
	public List<PatientDTO> getPatientsArchiver() {
		List<Patient> patients=utilisateurRepository.findByArchiveTrue();
		List<PatientDTO> collect=patients.stream()
		                        .map(p->patientMapperImpl.fromPatient(p))
		                        .collect(Collectors.toList());
		return collect;
	}

	@Override
	public PatientDTO deArchivePatient(Long idPatient, PatientDTO patientDTO) {
		Utilisateur patient=utilisateurRepository.findById(idPatient).orElse(null);
		var user = Patient.builder()
				.id(idPatient)
				.nom(patientDTO.getNom())
				.prenom(patientDTO.getPrenom())
				.email(patientDTO.getEmail())
				.telephone(patientDTO.getTelephone())
				.adr(patientDTO.getAdr())
				.civilite(patientDTO.getCivilite())
				.idCnam(patientDTO.getIdCnam())
				.codePostal(patientDTO.getCodePostal())
				.sexe(patientDTO.getSexe())
				.dateNaissance(patientDTO.getDateNaissance())
				.motDePasse(patient.getMotDePasse())
				.archive(false)
				.role(Role.USER)
				.build();
		Patient monPatient=utilisateurRepository.save(user);
	return patientMapperImpl.fromPatient(monPatient);
	}

	@Override
	public MedecinDTO getMedecinById(Long idMedecin) {
		Medecin monMedecin= new Medecin();
		Utilisateur medecin= utilisateurRepository.findById(idMedecin).orElse(null);
		if(medecin instanceof Medecin)
		{
			 monMedecin= (Medecin) medecin;
		}
		MedecinDTO dto=medecinMapperImpl.fromMedecin(monMedecin);
				return dto;
	}
	@Override
	public void Listemail(Mail newMail) {
		for (int i = 0; i < newMail.getListMail().size(); i++) {
			SimpleMailMessage mail = new SimpleMailMessage();
			mail.setFrom("ayyouta.aya.had@gmail.com");
			mail.setTo(newMail.getListMail().get(i));
			mail.setText(newMail.getMessage());
			mail.setSubject(newMail.getObjet());
			mailSender.send(mail);
		}
	}

	@Override
	public PatientDTO updateMdpPatient(Long idPatient, Patient newPatient) {
		Patient patient=new Patient();
		Utilisateur user = utilisateurRepository.findById(idPatient).orElse(null);
		if(user instanceof Patient)
		{
			patient= (Patient) user;
		}
		patient.setId(idPatient);
		patient.setNom(patient.getNom());patient.setPrenom(patient.getPrenom());patient.setEmail(patient.getEmail());
		patient.setTelephone(patient.getTelephone());patient.setAdr(patient.getAdr());patient.setCodePostal(patient.getCodePostal());
		patient.setDateNaissance(patient.getDateNaissance());patient.setCivilite(patient.getCivilite());patient.setSexe(patient.getSexe());patient.setRole(Role.USER);
		patient.setMotDePasse(passwordEncoder.encode(newPatient.getMotDePasse()));patient.setIdCnam(patient.getIdCnam());
		Patient save = utilisateurRepository.save(patient);
		System.out.println(save);
		return patientMapperImpl.fromPatient(save);
	}


}
