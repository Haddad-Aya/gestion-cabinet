package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.Consultation;
import com.example.demo.entities.Fichier;
import com.example.demo.entities.Patient;
import com.example.demo.entities.Traitement;

import java.util.Date;
import java.util.List;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
	
	
    List<Consultation> findAllByEvolution(String evolution);
    
    @Query("select c from Consultation c where c.dateConsultation = :dateConsultation")
    List<Consultation> findByDateConsultation(@Param("dateConsultation") Date dateConsultation);

    List<Consultation> findByDateConsultationBetween(@Param("from") Date from, @Param("to") Date to);
    
    @Query("select c from Consultation c where c.rendezVous.patient.archive = 0 ")
    List<Consultation> findConsultation();
    
    @Query("select c from Consultation c where c.paiment = 'NON_PAYE' and c.rendezVous.patient.archive = 0 ")
    List<Consultation> findConsultationNonPaye();
    
    @Query("select c from Consultation c where c.paiment = 'GRATUIT' and c.rendezVous.patient.archive = 0 ")
    List<Consultation> findConsultationGratuit();
    
    @Query("select c from Consultation c where c.paiment = 'PAYE' and c.rendezVous.patient.archive = 0 ")
    List<Consultation> findConsultationPaye();
    
    @Query("select c from Consultation c where c.rendezVous.patient.nom = :nom and c.rendezVous.patient.archive = 0 ")
    List<Consultation> findConsultationByNomPatient(@Param("nom") String nom);
    
    @Query("select sum(c.prix) from Consultation c where c.dateConsultation >= :from and c.dateConsultation <= :to ")
    Float sommeConsultationByDate(@Param("from") Date from, @Param("to") Date to);
    
    
    @Query(value = "SELECT c FROM Consultation c  ORDER BY dateConsultation desc")
    List<Consultation>DateconsultationOrderBy();
    
    //prix total des consutation par date donne
    @Query("select sum(c.prix) from Consultation c where c.dateConsultation = :date ")
    Float sommeConsultationJour(@Param("date") Date date);
    
    //nbr consultation by date donnee
    @Query("select count(*) from Consultation c where c.dateConsultation = :date ")
    Integer nbrConsultation(@Param("date") Date date);
    
    //les consultations de chaque patient
    @Query("select c from Consultation c where c.rendezVous.patient = :patient ORDER BY dateConsultation asc")
    List<Consultation> consultationIdPatient(@Param("patient") Patient patient);
    
    //les fichiers de chaque consultation
    @Query("select c.fichiers from Consultation c where c.id = :id")
    List<Fichier> listFichierByIdConsultation(@Param("id") Long id);
    
    //les traitements de chaque consultation
    @Query("select c.traitements from Consultation c where c.id = :id")
    List<Traitement> listTraitementByIdConsultation(@Param("id") Long id);
    
   // List<Consultation> getListConsultationByIdPatient(@Param("id") Long id);
    
    @Query("select count(*) from Consultation c where c.paiment = 'PAYE' ")
    Integer nbrConsultationPaye();
    @Query("select count(*) from Consultation c where c.paiment = 'NON_PAYE' ")
    Integer nbrConsultationNonPaye();
    @Query("select count(*) from Consultation c where c.paiment = 'GRATUIT' ")
    Integer nbrConsultationGratuit();
    
    @Query("select sum(c.prix) from Consultation c")
    Float sommeConsultation();
}
