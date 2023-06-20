package com.example.demo.services;

import java.util.List;

import com.example.demo.dtos.HoraireDTO;
import com.example.demo.dtos.MedecinDTO;
import com.example.demo.entities.Medecin;

public interface MedecinService {

	MedecinDTO updateMedecin(Long idMedecin, Medecin newMedecin);
	HoraireDTO saveHoraire(Long idMedecin, HoraireDTO horaireDTO);
	HoraireDTO updateHoraire(Long idHoraire, HoraireDTO newHoraire);
	void deleteHoraire(Long idHoraire);
	HoraireDTO findHoraireByJour(String jour);
	List<HoraireDTO> listHoraire();
	MedecinDTO updateMdpMedecin(Long idMedecin, Medecin newMedecin);
	
}
