package com.example.demo.web;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.HoraireDTO;
import com.example.demo.dtos.MedecinDTO;
import com.example.demo.entities.Medecin;
import com.example.demo.services.MedecinService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins ="*")
@RequestMapping("/api/admin/medecin")
public class MedecinRestController {
	public MedecinService medecinService;
	
	@PutMapping("/updateMedecin/{idMedecin}")
	public MedecinDTO updateMedecin(
			@RequestBody Medecin newMedecin,
			@PathVariable long idMedecin
			) {
		return medecinService.updateMedecin(idMedecin, newMedecin);
	}
	 @PostMapping("/newHoraire/{idMedecin}")
		public HoraireDTO saveHoraire(
				@RequestBody HoraireDTO horaireDTO,
				@PathVariable long idMedecin
				) {
			
			return medecinService.saveHoraire(idMedecin, horaireDTO);
	}
	 @DeleteMapping("/deleteHoraire/{idHoraire}")
	 public void deleteHoraire(
			 @PathVariable long idHoraire
			 ) {
		 medecinService.deleteHoraire(idHoraire);
	 }
	 @GetMapping("/getHoraireByJour")
	 public HoraireDTO getHoraireByJour(
			 @RequestParam(name = "jour") String jour
			 ) {
		 return medecinService.findHoraireByJour(jour);
	 }
		@GetMapping("/listHoraires")
		public List<HoraireDTO> listHoraires(){
			return medecinService.listHoraire();
		}
		@PutMapping("/updateHoraire/{idHoraire}")
		public HoraireDTO updateHoraire(
				@RequestBody HoraireDTO newHoraire
				) {
			return null;
		}
		@PutMapping("/updateMdpMedecin/{idMedecin}")
		public MedecinDTO updateMdpMedecin(
				@RequestBody Medecin newMedecin,
				@PathVariable long idMedecin
				) {
			return medecinService.updateMdpMedecin(idMedecin, newMedecin);
		}
}
