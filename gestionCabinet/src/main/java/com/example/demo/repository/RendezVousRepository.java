package com.example.demo.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.Patient;
import com.example.demo.entities.RendezVous;

public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
	@Query("select r from RendezVous r where r.status not like 'ANNULER' and dateRendezVous = :dateRendezVous and heureDebut = :heureDebut")
	RendezVous findByRendezVous(@Param("dateRendezVous") Date dateRendezVous,@Param("heureDebut") String heureDebut);
	 @Query("select r from RendezVous r where r.status = EN_ATTENTE ORDER BY r.dateRendezVous asc")
	 List<RendezVous> findRendezVousEnAttente();
	 
	 @Query("select r from RendezVous r where r.status = ANNULER ORDER BY r.dateRendezVous asc")
	 List<RendezVous> findRendezVousAnnuler();
	 
	 @Query("select r from RendezVous r where r.status = REALISER ORDER BY r.dateRendezVous asc")
	 List<RendezVous> findRendezVousRealiser();
	 
	 @Query("select r.patient from RendezVous r where r.id = :id")
	 Patient findPatientByIdRendezVous(@Param("id") Long id);
	 
	 @Query("select r from RendezVous r ORDER BY r.dateRendezVous asc")
	 List<RendezVous> listRendezVousAsc();
	 
	 @Query("select r from RendezVous r where r.patient.nom = :nom ORDER BY r.dateRendezVous asc")
	 List<RendezVous> listRendezVousByNomPatient(@Param("nom") String nom);
	 
	 @Query("select r from RendezVous r where r.status not like 'ANNULER' ORDER BY r.dateRendezVous asc")
	 List<RendezVous> listRendezVousNonAnnuler();
	 
	 @Query("select r from RendezVous r where r.status = EN_ATTENTE and r.patient.nom = :nomPatient ORDER BY r.dateRendezVous asc")
	 List<RendezVous> listRendezVousEnAttenteByNomPatient(@Param("nom") String nom);
	 
	 @Query("select r from RendezVous r where  r.patient.id = :idPatient ORDER BY r.dateRendezVous asc")
	 List<RendezVous> listRendezVousByIdPatient(@Param("idPatient") Long idPatient);
	 
	 @Query("select r from RendezVous r where r.patient.id = :idPatient and r.dateRendezVous = :dateRendezVous ORDER BY r.dateRendezVous asc")
	 List<RendezVous> rendezVousByDateAndIdPatient(@Param("idPatient") Long idPatient, @Param("dateRendezVous") Date dateRendezVous);
	 
	 @Query("select r from RendezVous r where r.patient.id = :idPatient and r.status = EN_ATTENTE ORDER BY r.dateRendezVous asc")
	 List<RendezVous> findRendezVousEnAttenteByIdPatient(@Param("idPatient") Long idPatient);
	 
	 @Query("select r from RendezVous r where r.patient.id = :idPatient and r.status = ANNULER ORDER BY r.dateRendezVous asc")
	 List<RendezVous> findRendezVousAnnulerByIdPatient(@Param("idPatient") Long idPatient);
	 
	 @Query("select r from RendezVous r where r.patient.id = :idPatient and r.status = REALISER ORDER BY r.dateRendezVous asc")
	 List<RendezVous> findRendezVousRealiserByIdPatient(@Param("idPatient") Long idPatient);
	 
	 @Query("select count(*) from RendezVous r where r.status = ANNULER ")
	 Integer nbrRendezVousAnnuler();
	 @Query("select count(*) from RendezVous r where r.status = REALISER ")
	 Integer nbrRendezVousRealiser();
}
