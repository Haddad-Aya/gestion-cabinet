package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dtos.*;
import com.example.demo.entities.*;
import com.example.demo.enums.Role;
import com.example.demo.mappers.*;
import com.example.demo.repository.*;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class MedecinServiceImpl implements MedecinService{
	private UtilisateurRepository utilisateurRepository;
	private MedecinMapperImpl medecinMapperImpl;
	private HoraireRepository horaireRepository;
	private HoraireMapperImpl horaireMapperImpl;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public MedecinDTO updateMedecin(Long idMedecin, Medecin newMedecin) {
		Medecin medecin=new Medecin();
		Utilisateur user = utilisateurRepository.findById(idMedecin).orElse(null);
		if(user instanceof Medecin)
		{
			medecin= (Medecin) user;
		}
		System.out.println("1 "+medecin.getMotDePasse().compareTo(passwordEncoder.encode(newMedecin.getMotDePasse())));
		System.out.println("2 "+medecin.getMotDePasse());
		System.out.println("mot de passe new medecin non crytee "+newMedecin.getMotDePasse());
		System.out.println("mot de passe new medecin crytee "+passwordEncoder.encode(newMedecin.getMotDePasse()));
		System.out.println("4 "+medecin);
		System.out.println("5 "+newMedecin);
			
		medecin.setId(idMedecin);
		medecin.setAdr(newMedecin.getAdr());
		medecin.setCodePostal(newMedecin.getCodePostal());
		medecin.setEmail(newMedecin.getEmail());
		medecin.setNCin(newMedecin.getNCin());
		medecin.setNom(newMedecin.getNom());
		medecin.setRole(Role.ADMIN);
		medecin.setPrenom(newMedecin.getPrenom());
		medecin.setNomCabinet(newMedecin.getNomCabinet());
		medecin.setMotDePasse(user.getPassword());
		Medecin save = utilisateurRepository.save(medecin);
		return medecinMapperImpl.fromMedecin(save);

	}

	@Override
	public HoraireDTO saveHoraire(Long idMedecin, HoraireDTO horaireDTO) {
		Medecin medecin=new Medecin();
		Utilisateur user = utilisateurRepository.findById(idMedecin).orElse(null);
		if(user instanceof Medecin)
		{
			medecin= (Medecin) user;
		}
		Horaire horaire=new Horaire();
		horaire.setJour(horaireDTO.getJour());horaire.setDateDebutPremS(horaireDTO.getDateDebutPremS());
		horaire.setMedecin(medecin);horaire.setDateDebutDeuS(horaireDTO.getDateDebutDeuS());
		horaire.setDateFinPremS(horaireDTO.getDateFinPremS());horaire.setDateFinDeuS(horaireDTO.getDateFinDeuS());
		Horaire save= horaireRepository.save(horaire);
		return horaireMapperImpl.fromHoraire(save);
	}

	@Override
	public HoraireDTO updateHoraire(Long idHoraire, HoraireDTO newHoraire) {
		try {
			Horaire findHoraire=horaireRepository.findById(idHoraire).orElse(null);
			Medecin medecin=new Medecin();
			Utilisateur user =utilisateurRepository.findById(findHoraire.getMedecin().getId()).orElse(null);
			if(user instanceof Medecin)
			{
				medecin= (Medecin) user;
			}
			if(findHoraire != null && user != null) {
				Horaire horaire = new Horaire();
				horaire.setId(idHoraire);horaire.setJour(findHoraire.getJour());
				horaire.setDateDebutPremS(newHoraire.getDateDebutPremS());
				horaire.setDateFinPremS(newHoraire.getDateFinPremS());
				horaire.setDateDebutDeuS(newHoraire.getDateDebutDeuS());
				horaire.setDateFinDeuS(newHoraire.getDateFinDeuS());
				horaire.setMedecin(medecin);
				Horaire saved = horaireRepository.save(horaire);
				return horaireMapperImpl.fromHoraire(saved);
			}
			else return null;
		}
		catch(Exception e) {
			return null;
		}
	}

	@Override
	public void deleteHoraire(Long idHoraire) {
		 horaireRepository.deleteById(idHoraire);
		}

	@Override
	public HoraireDTO findHoraireByJour(String jour) {
		try {
			Horaire horaire=horaireRepository.getHoraireByJour(jour);
			return horaireMapperImpl.fromHoraire(horaire);
		}
		catch(Exception e) {
			return null;
		}
	}

	@Override
	public List<HoraireDTO> listHoraire() {
		List<Horaire> horaire=horaireRepository.findAll();
		List<HoraireDTO> collect=horaire.stream()
				.map(h ->horaireMapperImpl.fromHoraire(h))
				.collect(Collectors.toList());
		return collect;
	}

	@Override
	public MedecinDTO updateMdpMedecin(Long idMedecin, Medecin newMedecin) {
		Medecin medecin=new Medecin();
		Utilisateur user = utilisateurRepository.findById(idMedecin).orElse(null);
		if(user instanceof Medecin)
		{
			medecin= (Medecin) user;
		}
		medecin.setId(idMedecin);
		medecin.setNom(medecin.getNom());medecin.setPrenom(medecin.getPrenom());medecin.setEmail(medecin.getEmail());
		medecin.setTelephone(medecin.getTelephone());medecin.setAdr(medecin.getAdr());medecin.setCodePostal(medecin.getCodePostal());
		medecin.setNCin(medecin.getNCin());medecin.setNomCabinet(medecin.getNomCabinet());medecin.setRole(Role.ADMIN);
		medecin.setMotDePasse(passwordEncoder.encode(newMedecin.getMotDePasse()));
		Medecin save = utilisateurRepository.save(medecin);
		System.out.println(save);
		return medecinMapperImpl.fromMedecin(save);
	}

}
